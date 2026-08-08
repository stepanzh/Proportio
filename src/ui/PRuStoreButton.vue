<template>
    <a :href="rustoreHref" class="btn-rustore">
        <img :src="RustoreDownloadLight" class=".img-rustore-download" />
    </a>
</template>

<script setup>
import RustoreDownloadLight from '@/assets/logo/rustore-download-light.svg'
import { useSocialStore } from '@/stores/socialStore'

const rustoreHref = (useSocialStore()).rustoreApp
</script>

<style>
.btn-rustore {
    display: inline-block;
    height: 40px;
}

.img-rustore-download {
    width: 111px;
    height: 40px
}
</style>