<template>
    <FeatureCard showAndroidIcon title="Пропорцио+ на Андройд" price="от 29₽/месяц" :features="features">
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
    { label: 'Всё, что в бесплатной версии', isPremium: false },
    { label: 'Пересчёт на число порций', isPremium: true },
    { label: 'Пересчёт на общий вес или объём', isPremium: true },
    { label: 'Пересчёт на кулинарную форму для тортов и выпечки', isPremium: true },
    { label: 'Рецепт из скриншота', isPremium: true },
    { label: 'Подсветка экрана на время готовки', isPremium: true },
]

const handleClick = createGotoRustoreViaClick(rustoreHref, 'landing_price_card_premium')

</script>