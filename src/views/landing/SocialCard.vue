<template>
    <a class="scard"  :href=url>
        <div class="scard__image">
            <img :src=logoSrc />
        </div>
        <div class="scard__action">
            <a class="action__link">{{ label }}</a>
            <div class="action__caption scaption">{{ caption }}</div>
        </div>
    </a>
</template>

<script setup>
defineProps({
    url: { type: String, required: true },
    label: { type: String, required: true },
    caption: { type: String, required: true },
    logoSrc: { type: String, required: true },
})
</script>

<style scoped>
.scard {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
}

.scard__image {
    display: flex;
    justify-content: center;
}

.scard__image img {
    height: 36px;
    width: 36px;
}

.scard__action {
    display: flex;
    flex-direction: column;
}

.action__link {
    font-weight: var(--weight-semibold);
}
</style>