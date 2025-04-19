<template>
    <div>
        <!-- Table -->
        <div>
            <div v-if="store.numberOfIngredients > 0" v-for="ingr in store.ingredients" :key="ingr.id"
                ref="ingredientList" class="table-row">
                <TextField v-model="ingr.name" placeholder="Ингредиент" class="cell-name" />
                <OriginalAmount v-model="ingr.originalAmount" placeholder="250" class="cell-amount" />
                <TextField v-model="ingr.unit" placeholder="гр" class="cell-unit" />
            </div>
            <p v-else style="padding: 12px 0; font-style: italic;">Ингредиентов нет, добавьте новых!</p>
        </div>

        <!-- Actions -->
        <div class="table-orig-actions">
            <PButton @click="proportio.navToEdit()" :iconOnly="true" class="btn-filled-secondary">
                <template #icon>
                    <TrashIconMini />
                </template>
            </PButton>
            <div class="table-orig-actions__right">
                <PButton @click="addNumberOfPortions" :iconOnly="true" class="btn-filled-secondary">
                    <template #icon>
                        <CircleStackIconMini />
                    </template>
                </PButton>
                <PButton @click="addIngredient" label="Добавить" class="btn-filled-primary">
                    <template #icon>
                        <PlusCircleIconMini />
                    </template>
                </PButton>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useProportioCalculatorStore } from '@/stores/proportioCalculator'
import { useProportioNavStore } from '@/stores/proportioNav'
import { nextTick, ref } from 'vue'
import OriginalAmount from '@/components/OriginalAmount.vue'
import PButton from '@/ui/PButton.vue'

const proportio = useProportioNavStore()
const store = useProportioCalculatorStore()
const ingredientList = ref(null)

function getLastIngredientElement() {
    if (ingredientList.value.length > 0) {
        let last = ingredientList.value[ingredientList.value.length - 1]
        return last
    }
    return undefined
}

function addIngredient() {
    store.add()
    nextTick(() => {
        let last = getLastIngredientElement()
        if (!last) {
            console.warn("DOM error: last ingredient was not added")
            return undefined
        }
        let nameInputs = last.getElementsByClassName('cell-name')
        if (nameInputs.length < 1) {
            return undefined
        }

        // DRY
        nameInputs[0].focus()
        last.scrollIntoView({ 'behavior': 'smooth' })
    })
}

function addNumberOfPortions() {
    store.add("Число порций")
    nextTick(() => {
        let last = getLastIngredientElement()
        if (!last) {
            console.warn("DOM error: number of portions was not added")
            return undefined
        }

        let amountInputs = last.getElementsByClassName('cell-amount')
        if (amountInputs.length < 1) {
            return undefined
        }

        // DRY
        amountInputs[0].focus()
        last.scrollIntoView({ 'behaviour': 'smooth' })
    })
}
</script>


<style scoped>
.table-orig-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
}

.table-orig-actions__right {
    display: flex;
    gap: 12px;
}
</style>