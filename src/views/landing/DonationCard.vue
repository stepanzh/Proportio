<template>
    <div class="landing-donation-card">
        <div class="landing-donation-card__image">
            <img :src=logoSrc />
        </div>
        <div class="landing-donation-card__action">
            <a class="landing-donation-card__link btn btn-filled-primary" :href=donateUrl>{{ donateUrlLabel }}</a>
            <div class="landing-donation-card__caption scaption">{{ caption }}</div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    donateUrl: { type: String, required: true },
    donateUrlLabel: { type: String, required: true },
    caption: { type: String, required: true },
    logoSrc: { type: String, required: true },
})
</script>

<style>
.landing-donation-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
}

.landing-donation-card__image img {
    height: 36px;
}

.landing-donation-card__action {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
}

.landing-donation-card__link {
    display: block;
    padding: 10px 32px;
}

.landing-donation-card__link:hover {
    text-decoration: none;
}
</style>