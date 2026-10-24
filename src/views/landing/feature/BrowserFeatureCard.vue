<template>
    <FeatureCard title="Пропорцио в браузере" price="Бесплатно" :features="features">
        <template #action>
            <RouterLink to="/app" class="sbtn btn-filled-primary">
                Открыть калькулятор
            </RouterLink>
        </template>
    </FeatureCard>
</template>

<script setup>
import FeatureCard from './FeatureCard.vue';

const features = [
    { label: 'Пересчёт на ингредиент', isPremium: false },
    { label: 'Пересчёт на число порций', isPremium: false },
    { label: 'Без рекламы', isPremium: false },
]
</script>