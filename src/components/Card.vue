<template>
    <div class="card">
        <slot />
    </div>
</template>

<script setup />

<style>
.card {
    padding: 48px 18px;
    background-color: white;
    box-shadow: var(--elevation-1);
}
</style>