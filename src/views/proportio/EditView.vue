<template>
    <AppScreen>
        <template #nav>
            <AppNavBar title="Изменить раскладку">
                <template #left-menu>
                    <PIconButton @click="proportio.navBack()">
                        <ArrowLeftIconOutline />
                    </PIconButton>
                </template>
            </AppNavBar>
        </template>

        <template #body>
            <header class="txt-h-caption">
                Список ингредиентов
            </header>
            <main class="edit-view-main" v-if="store.ingredients.length">
                <div v-for="ingr in store.ingredients" :key="ingr.id" class="edit-item">
                    <PIconButton @click="store.remove(ingr.id)" class="red">
                        <TrashIconOutline />
                    </PIconButton>
                    <span class="edit-item__name">{{ ingr.displayedName }}</span>
                    <span>
                        <PIconButton @click="store.moveTowardsFirstOnce(ingr.id)">
                            <ArrowUpIconOutline />
                        </PIconButton>
                        <PIconButton @click="store.moveTowardsLastOnce(ingr.id)">
                            <ArrowDownIconOutline />
                        </PIconButton>
                    </span>
                </div>
            </main>
            <p v-else style="padding: 6px 0; font-style: italic;">Ингредиентов нет, добавьте в калькуляторе</p>
        </template>
    </AppScreen>
</template>


<script setup>
import AppNavBar from '@/components/AppNavBar.vue'
import AppScreen from '@/components/AppScreen.vue'
import { useProportioCalculatorStore } from '@/stores/proportioCalculator'
import { useProportioNavStore } from '@/stores/proportioNav'

const proportio = useProportioNavStore()
const store = useProportioCalculatorStore()
</script>


<style scoped>
.edit-view-main {
    margin-top: 16px;
}

.edit-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--shuttle-gray-200);
    padding: 6px 0;
}

.edit-item:first-child {
    border-top: 1px solid var(--shuttle-gray-200);
}

.edit-item__name {
    font-weight: var(--weight-semibold);
}
</style>