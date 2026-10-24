<template>
    <FeatureCard showAndroidIcon title="Пропорцио на Андройд" price="Бесплатно" :features="features">
        <template #action>
            <PLinkButton class="sbtn sbtn-primary" :href="rustoreHref" @click="handleClick">
                <template #default>Скачать в RuStore</template>
            </PLinkButton>
        </template>
    </FeatureCard>
</template>

<script setup>
import { useSocialStore } from '@/stores/socialStore.js';
import FeatureCard from './FeatureCard.vue';
import { createGotoRustoreViaClick } from '@/lib/metrika.js';

const rustoreHref = useSocialStore().rustoreApp

const features = [
    { label: 'Пересчёт на ингредиент', isPremium: false },
    { label: 'Хранение рецепта', isPremium: false },
    { label: 'Поделиться рецептом', isPremium: false },
    { label: 'Светлая и тёмная тема', isPremium: false },
    { label: 'Регулярные обновления', isPremium: false },
    { label: 'Без рекламы', isPremium: false },
]

const handleClick = createGotoRustoreViaClick(rustoreHref, 'landing_price_card_free')

</script>