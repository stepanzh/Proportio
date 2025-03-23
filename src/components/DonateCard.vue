<template>
    <section class="donate-card">
        <div>
            <img class="donate-card__logo" :src=logoSrc />
        </div>
        <h3 class="donate-card__title">{{ title }}</h3>
        <p class="donate-card__body">{{ body }}</p>
        <a :href=donateUrl target="_blank" class="btn-donate btn-filled-primary">
            {{ actionCaption }}
        </a>
    </section>
</template>

<script setup>
defineProps(['title', 'body', 'donateUrl', 'actionCaption', 'logoSrc'])
</script>

<style>
.donate-card__logo {
    height: 48px;
}

.donate-card__title {
    margin-top: 16px;
}

.donate-card__body {
    margin-top: 8px;
    color: var(--shuttle-gray-600);
}

.btn-donate {
    display: inline-block;
    margin-top: 24px;
    padding: 12px 32px;
    border-radius: 8px;
    font-weight: var(--weight-semibold);
}

.btn-donate:hover {
    text-decoration: none;
}
</style>