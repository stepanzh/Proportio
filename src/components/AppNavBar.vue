<template>
    <nav class="p-nav">
        <!-- Левое меню -->
        <div>
            <slot name="left-menu"></slot>
        </div>

        <!-- Заголовок -->
        <span class="p-nav__title">{{ title }}</span>

        <!-- Правое меню -->
        <div>
            <slot name="right-menu"></slot>
        </div>
    </nav>
</template>


<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>


<style scoped>
.p-nav {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 8px;
}

.p-nav__title {
    font-size: 18px;
    line-height: 1;
    font-weight: var(--weight-semibold);
}
</style>