<template>
    <div class="card">
        <slot />
    </div>
</template>

<script setup />

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding: 48px 18px;
    background-color: white;
    box-shadow: var(--elevation-1);
}

@media only screen and (min-width: 640px) {
    .card {
        border-radius: 32px;
        padding: 48px 64px;
    }
}
</style>