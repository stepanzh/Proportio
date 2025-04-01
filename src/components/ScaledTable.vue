<template>
    <div>
        <div class="calc-table">
            <div v-for="(ingr, index) in store.ingredients" :key="ingr.id" class="table-row">
                <span class="cell-name">{{ ingr.displayedName }}</span>
                <OnboardingTooltip v-if="index === 0" text="Попробуйте обновить" :is-shown="showTooltip">
                    <ScaledAmount v-model="ingr.scaledAmount" :placeholder="ingr.originalAmount" class="cell-amount"  style="width: 100%;" />
                </OnboardingTooltip>
                <ScaledAmount v-else v-model="ingr.scaledAmount" :placeholder="ingr.originalAmount" class="cell-amount" />
                <span class="cell-unit">{{ ingr.unit }}</span>
            </div>
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue'
import { useProportioCalculatorStore } from '@/stores/proportioCalculator'
import { useProportioNavStore } from '@/stores/proportioNav'
import ScaledAmount from '@/components/ScaledAmount.vue'
import OnboardingTooltip from '@/ui/OnboardingTooltip.vue'

const proportio = useProportioNavStore()
const store = useProportioCalculatorStore()
const showTooltip = computed(() => { return !store.userChangedScaledAmount })
</script>


<style scoped>
.table-scale-actions {
    display: flex;
    justify-content: center;
    margin-top: 192px;
}
</style>