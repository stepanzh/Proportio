function formatNumber(x){
    let number = parseFloat(x);
    let rounded;
    if (number < 10){
        rounded = x.toFixed(3);
    } else if (10 <= number && number <= 100){
        rounded = x.toFixed(2);
    } else if (100 <= number && number < 1000){
        rounded = number.toFixed(1);
    } else {
        rounded = number.toFixed(0);
    }
    return parseFloat(rounded);
}

function Quantity(amount = NaN, unit = ""){
    let invalidInputClassName = "invalid";

    this.amount = amount;
    this.unit = unit;

    function _onAmountChanged(quantity){
        return function(e){
            let newValue = quantity.$amount.val();
            if (isNaN(newValue)){
                quantity.$amount.addClass(invalidInputClassName);
                return;
            }

            quantity.$amount.removeClass(invalidInputClassName);
            quantity.amount = parseFloat(newValue);
            quantity.amount = isNaN(quantity.amount) ? 0 : quantity.amount;
        }
    }

    function _onUnitChanged(quantity){
        return function(e){
            quantity.unit = quantity.$unit.val();
        }
    }

    this.$amount = $('<input class="ingredient-amount" aria-label="количество">')
        .on("input", _onAmountChanged(this))
        .val(isNaN(this.amount) ? "" : this.amount);
    this.$unit = $('<input class="ingredient-unit" aria-label="единица измерения">')
        .on("input", _onUnitChanged(this))
        .val(this.unit);
}

function Item(name = "", quantity = new Quantity(), id = 0){
    this.name = name;
    this.quantity = quantity;
    this.id = id;

    function _onNameChanged(item){
        return function(e){
            item.name = item.$name.val();
        }
    }

    this.$remove = $('<button class="ingredient-remove" aria-label="удалить ингредиент"></button>');
    this.$name = $('<input class="ingredient-name" aria-label="название ингредиента">')
        .on("input", _onNameChanged(this))
        .val(this.name);
    this.$item = $(`<div class="ingredient" id="original-item-${id}"></div>`)
        .append(this.$remove)
        .append(this.$name)
        .append(this.quantity.$amount)
        .append(this.quantity.$unit);
}

function ScalableQuantity(amount = 0, original_amount = 0, unit = ""){
    this.amount = amount;
    this.original_amount = original_amount;
    this.unit = unit;

    this.$amount = $('<input class="ingredient-amount" aria-label="количество">')
        .val(this.amount);
    this.$unit = $(`<p class="ingredient-unit">${this.unit}</p>`);

    this.setOriginal = function (original_quantity){
        this.amount = original_quantity.amount;
        this.original_amount = original_quantity.amount;
        this.unit = original_quantity.unit;

        this.$amount.val(this.amount);
        this.$unit.text(this.unit);
    };
}

function ScalableItem(name = "", quantity = new ScalableQuantity(), id = 0){
    this.name = name;
    this.quantity = quantity;
    this.id = id;

    this.$name = $(`<p class="ingredient-name">${this.name}</p>`);
    this.$item = $(`<div class="ingredient" id="scaled-item-${id}"></div>`)
        .append(this.$name)
        .append(this.quantity.$amount)
        .append(this.quantity.$unit);

    this.setOriginal = function (original_item){
        this.name = original_item.name;
        this.quantity.setOriginal(original_item.quantity);
        this.id = original_item.id;

        this.$name.text(this.name);
    }
}

function ProportioApp(){
    function _onItemRemoveClick(app, item){
        return function(e){
            app.removeItem(item.id);
        }
    }

    function _onOriginalAmountChanged(app){
        // Update all slaled items and set their quantity to original.
        return function(e){
            for (let i = 0; i < app._items.length; i++){
                    app._scaled_items[i].quantity.setOriginal(app._items[i].quantity);
                }
        }
    }

    function _onScaleAmountChanged(app, scalableItem){
        return function(e){
            let scalableQuantity = scalableItem.quantity;

            let newAmount = scalableQuantity.$amount.val();

            if (newAmount === ""){
                newAmount = 0;
            }
            if (isNaN(newAmount) || isNaN(parseFloat(newAmount))){
                newAmount = NaN;
            }
            let ratio = parseFloat(newAmount) / scalableQuantity.original_amount;
            app.scale(ratio, scalableItem.id);
        }
    }

    let app = {
        _items: [],

        _scaled_items: [],

        addItem(name = "", quantity = new Quantity()){
            let original_item = new Item(name, quantity, this._items.length);
            let scaled_item = new ScalableItem(
                original_item.name,
                new ScalableQuantity(
                    original_item.quantity.amount,
                    original_item.quantity.amount,
                    original_item.quantity.unit,
                ),
                original_item.id,
            )

            this._items.push(original_item);
            this._scaled_items.push(scaled_item);

            original_item.$remove.click(_onItemRemoveClick(this, original_item));
            $("#recipe-table").append(original_item.$item);
            original_item.$name.on("input", function (){
                scaled_item.setOriginal(original_item);
            });

            original_item.quantity.$amount.on("input", _onOriginalAmountChanged(this));
            original_item.quantity.$unit.on("input", function (){
                scaled_item.quantity.setOriginal(original_item.quantity);
            });

            // This supposed that an item can be added only from originalMode.
            scaled_item.$item.hide();
            scaled_item.quantity.$amount.on("input", _onScaleAmountChanged(this, scaled_item));

            $("#recipe-table").append(scaled_item.$item);

            _updateUiOnItemsCountChanged(this._items.length);
        },

        removeItem(itemIdentifier){
            let itemToDelete = this.getItem(itemIdentifier);
            if (itemToDelete === undefined)
            {
                console.log(itemIdentifier + " Not Found");
                return;
            }

            for (var index in this._items){
                if (itemIdentifier == this._items[index].id){
                    this._items.splice(index, 1);
                    itemToDelete.$item.remove();

                    this._scaled_items[index].$item.remove();
                    this._scaled_items.splice(index, 1);

                    break;
                }
            }
            _updateUiOnItemsCountChanged(this._items.length);
        },

        getItem(itemIdentifier){
            for (var index in this._items){
                item = this._items[index];
                if (item.id == itemIdentifier)
                    return item;
            }
        },

        getLastItemUnsafe(){
            return this._items[this._items.length - 1];
        },

        setOriginalMode(){
            this._items.forEach(item => item.$item.show());
            this._scaled_items.forEach(item => item.$item.hide());
            _originalModeUI();
        },

        setScaleMode(){
            this._scaled_items.forEach(item => item.$item.show());
            this._items.forEach(item => item.$item.hide());
            _scaleModeUI();
        },
        scale(byRatio, exceptItemIdentifier){
            for (var index in this._scaled_items){
                let scaled_item = this._scaled_items[index];
                if (scaled_item.id == exceptItemIdentifier){
                    scaled_item.quantity.amount = scaled_item.quantity.$amount.val();
                    continue;
                }
                scaled_item.quantity.amount = scaled_item.quantity.original_amount * byRatio;
                scaled_item.quantity.$amount.val(formatNumber(scaled_item.quantity.amount));
            }
        },
        clear(){
            this._items.forEach(item => item.$item.remove());
            this._items = [];
            this.setOriginalMode();
            _updateUiOnItemsCountChanged(this._items.length);
        },
    };

    function _originalModeUI(){
        $("#command-original-mode")
            .removeClass("toggle-isoff")
            .addClass("toggle-ison");
        $("#command-scale-mode").addClass("toggle-isoff");
        $(".ingredient-add").show();
    }

    function _scaleModeUI(){
        $("#command-scale-mode")
            .removeClass("toggle-isoff")
            .addClass("toggle-ison");

        $("#command-original-mode").addClass("toggle-isoff");
        $(".ingredient-add").hide();
    }

    function _updateUiOnItemsCountChanged(newCount){
        if (newCount == 0){
            $("#command-clear").addClass("disabled");
            $("#command-scale-mode").addClass("disabled");
        } else if (newCount == 1){
            $("#command-clear").removeClass("disabled");
            $("#command-scale-mode").addClass("disabled");
        }
        else {
            $("#command-clear").removeClass("disabled");
            $("#command-scale-mode").removeClass("disabled");
        }
    }

    // Adds an empty item and focus on its name field.
    $(".ingredient-add").click(function () {
        app.addItem();
        // Unsafe should be OK, because is called after addItem.
        let last_added_item = app.getLastItemUnsafe();
        last_added_item.$name.focus();
    });

    $("#command-original-mode").click(() => app.setOriginalMode());

    $("#command-scale-mode").click(() => app.setScaleMode());

    // Clears item list and leave one empty item.
    $("#command-clear").click(function () {
        app.clear();
        app.addItem();
        // No focusing here.
    });

    // Recipe export
    $("#command-export-recipe").click(function (){
        let exporter = new RecipeExporter();
        // TODO: do not use private members.
        exporter.export(app._items);
    });

    // Recipe import
    $("#command-import-recipe").change(function(){
        let importer = new RecipeImporter();
        let input = document.getElementById("command-import-recipe");

        importer.import(input.files[0], function (json_string){
            let imported_object = JSON.parse(json_string)
            let imported_items_plain = imported_object.original_items;
            app.clear();
            imported_items_plain.forEach(item => app.addItem(item.name, new Quantity(item.amount, item.unit)));

            switch_to_main_page();
        });

        // This resets the value of input for triggering change event for the same file.
        // https://stackoverflow.com/questions/4109276/how-to-detect-input-type-file-change-for-the-same-file
        input.value = null;
    });

    // Switching between app pages
    function switch_to_menu_page(){
        $("#recipe-nav").hide();
        $("#page-main").hide();

        $("#menu-nav").show();
        $("#page-menu").show();
    }

    function switch_to_main_page(){
        $("#menu-nav").hide();
        $("#page-menu").hide();

        $("#recipe-nav").show();
        $("#page-main").show();
    }

    $("#command-menu").click(switch_to_menu_page);
    $("#command-menu-back").click(switch_to_main_page);

    $("#command-copy-to-clipboard").click(function (){
        let animation_step_duration_milliseconds = 400;
        let exporter = new RecipeClipboardExporter();
        let text = exporter.toPlainText(app._items, app._scaled_items); // TODO: avoid private interface.
        let $info = $("#command-copy-to-clipboard .command-complete-info");
        exporter.export(text,
            () => {
                $info
                    .text("Готово")
                    .fadeIn(animation_step_duration_milliseconds)
                    .delay(animation_step_duration_milliseconds)
                    .fadeOut(animation_step_duration_milliseconds);
            },
            (e) => {
                $info
                    .text("Ошибка :(")
                    .fadeIn(animation_step_duration_milliseconds)
                    .delay(animation_step_duration_milliseconds)
                    .fadeOut(animation_step_duration_milliseconds);
            },
        );
    });

    _updateUiOnItemsCountChanged(0);

    return app;
}

//
// Export of a recipe.
//

// Makes browser to download `data` with `filename` of `mimetype`
function download(data, filename, mimetype) {
    let file = new Blob([data], {type: mimetype});
    if (window.navigator.msSaveOrOpenBlob)  // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        let a = document.createElement("a");
        let url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function RecipeExporter(){
    function _item_to_object(item){
        return {
            name: item.name,
            amount: item.quantity.amount,
            unit: item.quantity.unit,
        }
    }

    this.export = function(original_items){
        if (original_items.length <= 0){
            return;
        }
        // TODO: let user change file name
        let object_to_export = {
            title: "",
            original_items: original_items.map(item => _item_to_object(item)),
            credits: {
                author: "",
                recipe_url: "",
            },
        };
        let json_string = JSON.stringify(object_to_export, null, 2);
        download(json_string, "recipe.json", "application/json");
    };
}

//
// Recipe import.
//

function RecipeImporter(){
    this.import = function(file, callback){
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            callback(reader.result);
        }, false);

        reader.readAsText(file);
    };
}

// Export text or recipe to clipboard.
// Usage:
// let exporter = new RecipeClipboardExporter();
// exporter.export("hello!");
// let recipe_text = exporter.toPlainText(app._items, app._scaled_items);
// exporter.export(recipe_text);
function RecipeClipboardExporter(){
    this.toPlainText = function (original_items, scaled_items){
        let rows = [];
        let colsep = "\t";
        let rowsep = "\n"; // TODO: platform independent EOL

        rows.push(["Ингредиент", "Оригинал", "Пропорция", "Единица"].join(colsep));
        for (let i = 0; i < Math.min(original_items.length, scaled_items.length); i++){
            let original_item = original_items[i];
            let scaled_item = scaled_items[i];
            rows.push([
                original_item.name,
                original_item.quantity.amount,
                scaled_item.quantity.amount,
                original_item.quantity.unit,
            ].join(colsep));
        }
        return rows.join(rowsep) + rowsep;
    };

    // Copy text to clipboard. Must be called from user interaction, e.g. button click.
    // onSuccess() => void
    // onFailure(e) => void
    this.export = function(text, onSuccess = undefined, onFailure = undefined){
        navigator.clipboard
            .writeText(text)
            .then(() => {
                if (onSuccess === undefined){
                    console.log("clipboard success");
                    return;
                }
                onSuccess();
            })
            .catch((e) => {
                if (onFailure === undefined){
                    console.log("clipboard failed\n" + e);
                    return;
                }
                onFailure(e);
            });
    }
}

//
// Main
//
var app;

$(document).ready(function(){
    app = new ProportioApp();

    app.addItem("Тесто для пиццы", new Quantity(6, "порция"));
    app.addItem("Мука", new Quantity(400, "гр"));
    app.addItem("Манная крупа", new Quantity(200, "гр"));
    app.addItem("Дрожжи", new Quantity(6, "гр"));
    app.addItem("Сахар", new Quantity(20, "гр"));
    app.addItem("Соль", new Quantity(20, "гр"));
    app.addItem("Масло оливковое", new Quantity(80, "гр"));
    app.addItem("Вода тёплая", new Quantity(300, "мл"));
});
