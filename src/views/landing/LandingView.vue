<template>
    <LandingArticle>
        <template #header>
            Для чего Пропорцио?
        </template>
        <template #default>
            <section class="culinary-use-cases">
                <header class="culinary-use-cases__header">
                    <h3 class="sh2">🧑‍🍳 Кулинария</h3>
                </header>
                <div class="culinary-use-cases__list">
                    <CulinaryUseCase emoji="🍰" title="Кондитерские изделия"
                        description="Торты, конфеты, пирожные, печенье, мороженое" />
                    <CulinaryUseCase emoji="🥖" title="Тесто и выпечка" description="Хлеб, пироги, куличи, пицца" />
                    <CulinaryUseCase emoji="🥗" title="Салаты" description="Для баланса вкусов и правильной текстуры" />
                    <CulinaryUseCase emoji="🍝" title="Соусы, заправки и масла"
                        description="Для баланса вкусов и правильной текстуры" />
                    <CulinaryUseCase emoji="🍖" title="Маринады" description="Шашлыки, стейки и барбекю" />
                    <CulinaryUseCase emoji="🥫️" title="Консервация"
                        description="Варенье, маринованые огурцы и помидоры, заготовки на зиму" />
                    <CulinaryUseCase emoji="🥤" title="Напитки"
                        description="Лимонады, соки, компоты, коктейли, настойки, домашнее вино" />
                    <CulinaryUseCase emoji="🥳" title="Меню на большую компанию"
                        description="Для расчёта покупок и блюд к столу, когда гостей много" />
                    <CulinaryUseCase emoji="❤️" title="Здоровое и спортивное питание"
                        description="Для правильного размера порции и состава" />
                </div>
            </section>
        </template>
    </LandingArticle>
</template>

<script setup>
import CulinaryUseCase from '@/components/CulinaryUseCase.vue'
import LandingArticle from './LandingArticle.vue';
</script>

<style>
.landing-article__header,
.culinary-use-cases__header
{
    text-align: center;
}

.culinary-use-cases__header {
    margin-bottom: 24px;
}

.culinary-use-cases__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>