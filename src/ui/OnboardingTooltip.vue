<template>
    <div class="onboarding-tooltip-wrapper">
        <slot />
        <Transition name="fade">
            <span class="onboarding-tooltip__text" v-show="isShown">{{ text }}</span>
        </Transition>
    </div>
</template>

<script setup>
// Shown or not
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    isShown: {
        type: Boolean,
        default: true,
    }
})
</script>

<style>
.onboarding-tooltip-wrapper {
    position: relative;
    display: inline-block;
}

.onboarding-tooltip__text {
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translate(-50%, -100%);

    background: var(--shuttle-gray-900);
    color: white;
    font-size: 12px;
    min-width: 128px;
    padding: 8px;
    border-radius: 6px;
    line-height: 1;   
}

.onboarding-tooltip__text::after {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);

    border-width: 6px;
    border-style: solid;
    
    border-color: var(--shuttle-gray-900) transparent transparent  transparent;
}
</style>