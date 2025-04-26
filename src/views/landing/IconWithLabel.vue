<template>
    <span class="icon-and-label">
        <span class="icon">
            <slot />
        </span>
        <span>
            {{ label }}
        </span>
    </span>
</template>

<script setup>
defineProps({
    label: { type: String },
})
</script>

<style scoped>
.icon-and-label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 4px;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>