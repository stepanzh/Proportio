<template>
    <div>
        <!-- Table -->
        <div>
            <div v-if="store.numberOfIngredients > 0" v-for="ingr in store.ingredients" :key="ingr.id" class="table-row">
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
                    <ArrowsUpDownIconMini />
                </template>
            </PButton>
            <PButton @click="store.add()" label="Добавить" class="btn-filled-primary">
                <template #icon>
                    <PlusCircleIconMini />
                </template>
            </PButton>
        </div>
    </div>
</template>


<script setup>
import { useProportioCalculatorStore } from '@/stores/proportioCalculator'
import { useProportioNavStore } from '@/stores/proportioNav'
import OriginalAmount from '@/components/OriginalAmount.vue'

const proportio = useProportioNavStore()
const store = useProportioCalculatorStore()
</script>


<style scoped>
.table-orig-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
}
</style>