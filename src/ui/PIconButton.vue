<template>
    <button class="btn-icon">
        <slot></slot>
    </button>
</template>


<script setup>
const __name = 'PIconButton'
</script>


<style>
.btn-icon {
    padding: 6px;
    border: none;
    background-color: transparent;
    color: var(--blue-ribbon-600);
    cursor: pointer;
    border-radius: 8px;
}

.btn-icon svg {
    display: block;
    width: 24px;
    height: 24px;
}

.btn-icon:hover { background-color: var(--blue-ribbon-100); }
.btn-icon:active { background-color: var(--blue-ribbon-200); }


.btn-icon.red { color: var(--red-orange-600); }
.btn-icon.red:hover { background-color: var(--red-orange-100); }
.btn-icon.red:active { background-color: var(--red-orange-200); }
</style>