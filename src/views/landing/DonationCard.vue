<template>
    <div class="dcard">
        <div class="dcard__image">
            <img :src=logoSrc />
        </div>
        <div class="dcard__action">
            <a class="dcard__link btn btn-filled-primary" :href=donateUrl>{{ donateUrlLabel }}</a>
            <div class="dcard__caption scaption">{{ caption }}</div>
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

<style scoped>
.dcard {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
}

.dcard__image img {
    height: 36px;
}

.dcard__action {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
}

.dcard__link {
    display: block;
    padding: 10px 32px;
}

.dcard__link:hover {
    text-decoration: none;
}
</style>