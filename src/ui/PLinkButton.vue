<template>
    <a class="p-link-btn">
        <div class="p-link-btn__content">
            <span class="p-link-btn__icon">
                <slot name="icon" />
            </span>
            <span class="p-link-btn__text">
                <slot />
            </span>
        </div>
    </a>
</template>


<script setup>
const __name = 'PLinkButton'
</script>


<style>
.p-link-btn {
    line-height: 1;
}

/* TODO: Fix gap when no icon provided */
.p-link-btn__content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
}

/* TODO: DRY with PButton */
.p-link-btn__icon {
    display: flex;
    justify-items: center;
    align-content: center;
    max-width: 24px;
    max-height: 24px;
}

.p-link-btn__icon > svg {
    width: 20px;
    height: 20px;
}


.p-link-btn-grab {
    padding: 8px 32px;
    background-color: var(--cerise-50);
    border: 1px solid var(--cerise-400);
    border-radius: 8px;
    color: var(--cerise-600);
}

.p-link-btn-grab:hover { 
    background-color: var(--cerise-100);
    text-decoration: none;
}
.p-link-btn-grab:active { background-color: var(--cerise-200); }
</style>