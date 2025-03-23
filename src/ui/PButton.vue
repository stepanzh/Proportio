<template>
    <button class="btn" :class="{ 'btn-icon-only': iconOnly }">
        <div class="btn__content">
            <span class="btn__icon">
                <slot name="icon" />
            </span>
            <span v-if="label" class="btn__label">{{ label }}</span>
        </div>
    </button>
</template>


<script setup>
// TODO: add flags for classes to not bother parent about classes

const props = defineProps({
    'label': { type: String },
    'iconOnly': { type: Boolean, default: false },
})
</script>


<style>
.btn {
    padding: 8px 32px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    font-family: inherit;
    font-weight: var(--weight-semibold);
    border-radius: 8px;
}

.btn-icon-only {
    padding: 10px;
}

.btn__content {
    /* Overpower (?) */
    display: flex;
    justify-content: center;
    gap: 4px;
}

.btn__icon {
    /* Overpower (?) */
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 20px;
    max-height: 20px;
}

.btn__icon > svg {
    width: 16px;
    height: 16px;
}

.btn__label {
    display: inline-block;
    padding: 2px 0;
}

.btn-filled-primary,
.btn-filled-secondary {
    border: none;
    outline: none;
}

.btn-filled-primary {
    background-color: var(--blue-ribbon-600);
    color: white;
}

.btn-filled-primary:hover { background-color: var(--blue-ribbon-700); }
.btn-filled-primary:active { background-color: var(--blue-ribbon-800); }


.btn-filled-secondary {
    background-color: var(--blue-ribbon-100);
    color: var(--blue-ribbon-900);
}

.btn-filled-secondary:hover { background-color: var(--blue-ribbon-200); }
.btn-filled-secondary:active { background-color: var(--blue-ribbon-300); }


.btn-outlined {
    background-color: transparent;
    box-shadow: inset 0 0 0 1px var(--blue-ribbon-600);
    border: none;
    color: var(--blue-ribbon-600);
}

.btn-outlined:hover { background-color: var(--blue-ribbon-100); }
.btn-outlined:active { background-color: var(--blue-ribbon-200); }

</style>