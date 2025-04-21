<template>
    <div class="card">
        <slot />
    </div>
</template>

<script setup />

<style>
.card {
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding: 48px 18px;
    background-color: white;
    box-shadow: var(--elevation-1);
}
</style>