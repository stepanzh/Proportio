<template>
    <article>
        <header class="landing-article__header">
            <h2 class="sh1">
                <slot name="header" />
            </h2>
        </header>
        <div>
            <slot />
        </div>
    </article>
</template>


<script setup>
import Card from '@/components/Card.vue'
</script>

<style scoped>
.landing-article__header { text-align: center; }
</style>