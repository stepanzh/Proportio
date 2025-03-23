<template>
    <AppScreen>
        <template #nav>
            <PToast message="Hello" :severity="toastSeverity" :isVisible="isToastVisible"
                @hide="isToastVisible = false">
                {{ toastMessage }}
            </PToast>
            <AppNavBar title="Пересчитать рецепт">
                <template #left-menu>
                    <div class="popup">
                        <PIconButton @click="isMenuShown = !isMenuShown" id="popupButton">
                            <Bars3IconOutline />
                        </PIconButton>
                        <div class="popup__content popup-menu" v-if="isMenuShown"
                            v-click-outside:popupButton="onPopupOutside">
                            <PMenuButton>
                                <template #icon>
                                    <FolderOpenIconOutline />
                                </template>
                                    Открыть
                                    <input type="file" @change="importRecipe" ref="importFileInputRef"
                                        style="display: none;" accept=".json">
                            </PMenuButton>
                            <PMenuButton @click="exportRecipe">
                                <template #icon>
                                    <ArrowDownTrayIconOutline />
                                </template>
                                Сохранить
                            </PMenuButton>
                            <PMenuButton @click="copyRecipeToClipboard">
                                <template #icon>
                                    <ClipboardDocumentListIconOutline />
                                </template>
                                Скопировать
                            </PMenuButton>
                            <PMenuButton @click="proportio.navToSupport()">
                                <template #icon>
                                    <HeartIconSolid class="txt-cerise-600" />
                                </template>
                                Поддержать проект
                            </PMenuButton>
                            <PMenuButton @click="proportio.navToHelp()">
                                <template #icon>
                                    <QuestionMarkCircleIcon />
                                </template>
                                Как пользоваться
                            </PMenuButton>
                        </div>
                    </div>
                </template>
                <template #right-menu>
                    <PIconButton @click="proportio.navToHelp()">
                        <QuestionMarkCircleIconOutline />
                    </PIconButton>
                </template>
            </AppNavBar>
        </template>

        <template #body>
            <!-- Mode toggle -->
            <div class="mode-toggle">
                <PButton @click="setOriginal" label="Как в рецепте" class="mode-toggle__left"
                    :class="{ 'btn-filled-primary': mode === Modes.original, 'btn-outlined': mode === Modes.scale }">
                    <template #icon>
                        <ListBulletIconMini />
                    </template>
                </PButton>
                <PButton @click="setScaled" label="Пересчитать" class="mode-toggle__right"
                    :class="{ 'btn-filled-primary': mode === Modes.scale, 'btn-outlined': mode === Modes.original }">
                    <template #icon>
                        <CalculatorIconMini />
                    </template>
                </PButton>
            </div>

            <!-- Table and actions -->
            <div>
                <div class="calc-table-header">
                    <span class="txt-h-caption">Ингредиент</span>
                    <span class="txt-h-caption">Кол-во</span>
                    <span class="txt-h-caption">Ед. изм.</span>
                </div>
                <!-- TODO: state when there is no ingredients -->
                <OriginalTable v-if="mode === Modes.original" />
                <ScaledTable v-if="mode === Modes.scale" />
            </div>
        </template>
    </AppScreen>
</template>


<script setup>
import { ref } from 'vue'
import { useProportioCalculatorStore } from '@/stores/proportioCalculator'
import AppNavBar from '@/components/AppNavBar.vue'
import AppScreen from '@/components/AppScreen.vue'
import OriginalTable from '@/components/OriginalTable.vue'
import ScaledTable from '@/components/ScaledTable.vue'
import { useProportioNavStore } from '@/stores/proportioNav'
import { copyToClipboard } from '@/lib/copyToClipboard'
import { RecipeExporter } from '@/lib/recipeExporter'
import { downloadJson } from '@/lib/download'
import { RecipeImporter } from '@/lib/recipeImporter'
import PMenuButton from '@/ui/PMenuButton.vue'
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'


const proportio = useProportioNavStore()
const store = useProportioCalculatorStore()

const Modes = Object.freeze({
    original: 1,
    scale: 2
})


// TODO: Refactor and put into hook
const toastMessage = ref('')
const toastSeverity = ref('info')
const isToastVisible = ref(false)


const mode = ref(Modes.original)

function setOriginal() { mode.value = Modes.original }

function setScaled() {
    // Validate original amounts
    const isAllOriginalAmountAreCorrect = !store.ingredients.some((ingr) => isNaN(ingr.originalAmount))
    if (!isAllOriginalAmountAreCorrect) {
        showToast({ message: 'Упс. Есть ингредиенты без количества', severity: 'error' })
        return
    }

    // If enterred only one ingredient, show warning
    if (store.numberOfIngredients == 1 && mode.value == Modes.original) {
        showToast({ message: 'Лучше добавить ещё один ингредиент', severity: 'info' })
    }

    mode.value = Modes.scale
}

const isMenuShown = ref(false)

function onPopupOutside() { isMenuShown.value = false }

function showToast({ message, severity = 'info' }) {
    toastMessage.value = message
    toastSeverity.value = severity
    isToastVisible.value = true
}

function copyRecipeToClipboard() {
    // There is some ingredients
    if (store.numberOfIngredients == 0) {
        showToast({ message: 'Рецепт пуст. Добавьте ингредиентов.', severity: 'error' })
        return
    }

    let recipeAsString = store.getRecipeAsPlainTextTabular()

    copyToClipboard({
        string: recipeAsString,
        onFailure: (e) => showToast({ message: 'Не удалось скопировать', severity: 'error' }),
        onSuccess: () => showToast({ message: 'Рецепт скопирован', severity: 'success' }),
    })
}

const importFileInputRef = ref(null)

function importRecipe() {
    console.debug(importFileInputRef.value.files[0])

    let file = importFileInputRef.value.files[0]
    if (file === undefined) {
        return
    }

    let importer = new RecipeImporter()
    importer.import({
        file: file,
        onSuccess: (importedObject) => {
            try {
                store.clear()
                importedObject.original_items.forEach(
                    (x) => store.add(
                        x.name,
                        x.amount,
                        x.unit
                    )
                )
                showToast({ message: 'Рецепт открыт', severity: 'success' })
            } catch (e) {
                showToast({ message: 'Не получилось открыть рецепт', severity: 'error' })
            } finally {
                isMenuShown.value = false
            }

        },
        onError: showToast({ message: 'Упс. Не удалось открыть рецепт.', severity: 'error' })
    })

    importFileInputRef.value.value = null
}

function exportRecipe() {
    if (store.numberOfIngredients == 0) {
        showToast({ message: 'Рецепт пуст. Добавьте ингредиентов.', severity: 'error' })
        return
    }

    let exporter = new RecipeExporter()
    try {
        let recipeAsJson = exporter.serializeToJson(store.ingredients)
        downloadJson({ data: recipeAsJson, filename: 'Рецепт.proportio.json' })
        showToast({ message: 'Рецепт сохранён, проверьте папку с загрузками.'})
    }
    catch (e) {
        console.error(e)
        showToast({ message: `Не удалось сохранить рецепт.`, severity: 'error' })
    }
}
</script>


<style>
.table-row,
.calc-table-header {
    display: grid;
    grid-template-columns: minmax(128px, 320px) minmax(64px, 72px) minmax(56px, 72px);
    gap: 8px;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid var(--shuttle-gray-200);
}

.calc-table-header { margin-top: 4px; }

.cell-name,
.cell-amount,
.cell-unit {
    display: inline-block;
    padding: 4px 0;
}

.cell-unit {
    overflow: hidden;
    white-space: nowrap;
}


.mode-toggle {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.btn.mode-toggle__left,
.btn.mode-toggle__right {
    padding-left: 0;
    padding-right: 0;
}

.btn.mode-toggle__left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.btn.mode-toggle__right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.popup {
    position: relative;
}

.popup__content {
    top: calc(100% + 2px);
    position: absolute;
}

.popup-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: white;
    padding: 12px 8px;
    border: 1px solid var(--shuttle-gray-100);
    border-radius: 8px;
    min-width: 256px;
    box-shadow: var(--elevation-1);
}
</style>