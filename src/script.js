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

function Quantity(amount = 0, unit = ""){
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
        .val(this.amount);
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
}

function ProportioApp(){
    function _onItemRemoveClick(app, item){
        return function(e){
            app.removeItem(item.id);
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
        _itemInnerCount: 0,
        _onItemNameUpdate(itemIdentifier){
            return function(e){  // e for on 'input' event
                let item = this.getItem(itemIdentifier);
            }
        },
        addItem(name = "", quantity = new Quantity()){
            this._itemInnerCount += 1;
            var newItem = new Item(name, quantity, this._itemInnerCount);
            this._items.push(newItem);

            newItem.$remove.click(_onItemRemoveClick(this, newItem));
            $("#recipe-table").append(newItem.$item);
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
        setOriginalMode(){
            while (this._scaled_items.length > 0){
                let scaled_item = this._scaled_items.pop();
                scaled_item.$item.remove();
            }
            this._items.forEach(item => item.$item.show());
            _originalModeUI();
        },
        setScaleMode(){
            this._scaled_items = [];

            // TOOD: ForEach?
            for (var index in this._items){
                let original_item = this._items[index];
                let scaled_item = new ScalableItem(
                    original_item.name,
                    new ScalableQuantity(
                        original_item.quantity.amount,
                        original_item.quantity.amount,
                        original_item.quantity.unit
                    ),
                    original_item.id
                )
                original_item.$item.hide();

                this._scaled_items.push(scaled_item);
                scaled_item.quantity.$amount.on("input", _onScaleAmountChanged(this, scaled_item));
                $("#recipe-table").append(scaled_item.$item);
            }
            _scaleModeUI();
        },
        scale(byRatio, exceptItemIdentifier){
            for (var index in this._scaled_items){
                let scaled_item = this._scaled_items[index];
                if (scaled_item.id == exceptItemIdentifier){
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
        export(){
            let exporter = new RecipeExporter();
            exporter.export(this._items);
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

    $(".ingredient-add").click(function(){
        app.addItem();
    });

    $("#command-original-mode").click(function(){
        app.setOriginalMode();
    });

    $("#command-scale-mode").click(function(){
        app.setScaleMode();
    });

    $("#command-clear").click(function(){
        app.clear();
    });

    // Recipe export
    $("#command-export-recipe").click(function (){
        app.export();
    });

    // Switching between app pages
    $("#command-menu").click(function(){
        $("#recipe-nav").hide();
        $("#page-main").hide();

        $("#menu-nav").show();
        $("#page-menu").show();
    });

    $("#command-menu-back").click(function(){
        $("#menu-nav").hide();
        $("#page-menu").hide();

        $("#recipe-nav").show();
        $("#page-main").show();
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

        let original_items_export = original_items.map(item => _item_to_object(item));
        let json_string = JSON.stringify(original_items_export, null, 2);
        download(json_string, "recipe.proportio", "application/json");
    };
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
