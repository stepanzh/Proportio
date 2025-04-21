<template>
    <div class="culinary-use-case">
        <h4 class="sh3">{{ emoji }} {{ title }}</h4>
        <p class="stxt culinary-use-case__description">{{ description }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    emoji: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
})
</script>

<style>
.culinary-use-case {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.culinary-use-case__description { color: var(--shuttle-gray-600); }

</style>