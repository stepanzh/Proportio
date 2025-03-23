<template>
    <AppScreen>
        <template #nav>
            <AppNavBar title="Помощь">
                <template #left-menu>
                    <PIconButton @click="proportioNav.navBack()">
                        <ArrowLeftIconOutline />
                    </PIconButton>
                </template>
            </AppNavBar>
        </template>
        <template #body>
            <header>
                <h3 class="txt-h-caption">Содержание</h3>
                <nav>
                    <ul class="help-toc-list" >
                        <li class="help-toc-list__item" v-for="section in sections">
                            <a :href="`#${anchorUrlForSection(section)}`">{{ section.tocTitle}}</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <section v-for="section in sections" :key="section.id" class="help-section">
                    <h2 :id="anchorUrlForSection(section)" class="txt-h3">
                        {{ section.title }}
                    </h2>
                    <ol>
                        <li v-for="step in section.steps">{{ step }}</li>
                    </ol>
                </section>
            </main>
        </template>
    </AppScreen>
</template>


<script setup>
import AppNavBar from '@/components/AppNavBar.vue';
import AppScreen from '@/components/AppScreen.vue'
import { useProportioNavStore } from '@/stores/proportioNav';

const proportioNav = useProportioNavStore()

const anchorUrlForSection = (section) => `help-${section.id}`

// WARN: steps does not have ids
const sections = [
    {
        id: 1,
        title: 'Пересчёт на рецепт',
        tocTitle: 'Как пересчитать на новое количество ингредиента?',
        steps: [
            'Нажмите “По рецепту”.',
            'Введите раскладку как в рецепте: название ингредиента, его количество и (по желанию) единицу измерения количества.',
            'Нажмите “Пересчитать”.',
            'Измените количество того ингредиента, на который вы хотите пересчитать весь рецепт.',
        ],
    },
    {
        id: 2,
        title: 'Пересчёт на число порций',
        tocTitle: 'Как пересчитать на новое число порций?',
        steps: [
            'Нажмите “По рецепту”.',
            'Введите раскладку как в рецепте: название ингредиента, его количество и (по желанию) единицу измерения количества.',
            'Добавьте ингредиент “Число порций” и укажите количество порций как в рецепте.',
            'Нажмите “Пересчитать”.',
            'Измените число порций.',
        ]
    }
]
</script>


<style scoped>
.help-toc-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.help-toc-list__item {
    font-size: 14px;
    font-weight: var(--weight-semibold);
}

.help-section {
    margin-top: 24px;
}

.help-section .txt-h3 {
    margin-bottom: 4px;
}

ol {
    color: var(--shuttle-gray-600);
}

ol li::marker {
    font-size: 14px;
    color: var(--shuttle-gray-400);
}
</style>