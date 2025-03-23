<template>
    <label class="btn btn-menu">
        <div class="btn-menu__content">
            <span class="btn-menu__icon">
                <slot name="icon" />
            </span>
            <span class="btn-menu__label">
                <slot />
            </span>
        </div>
    </label>
</template>


<script setup>
const __name = 'PMenuButton'
</script>


<style>
.btn.btn-menu {
    padding: 4px 8px;
    border-radius: 6px;
    background-color: transparent;
    border: none;
    outline: none;
    font-weight: var(--weight-medium);
}

.btn.btn-menu:hover { background-color: var(--blue-ribbon-100); }
.btn.btn-menu:active { background-color: var(--blue-ribbon-200); }

.btn-menu__content {
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-menu__icon { 
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--blue-ribbon-600);
}

.btn-menu__icon svg {
    width: 24px;
    height: 24px;
}
</style>