<template>
    <a :href="rustoreHref" @click="handleClick" class="btn-rustore">
        <img :src="RustoreDownloadLight" class=".img-rustore-download" />
    </a>
</template>

<script setup>
import RustoreDownloadLight from '@/assets/logo/rustore-download-light.svg'
import { YmGoal, ymReachGoal } from '@/lib/metrika'
import { useSocialStore } from '@/stores/socialStore'

const props = defineProps({
    ymGotoRustoreVia: {
        type: String,
        default: ''
    }
})

const rustoreHref = (useSocialStore()).rustoreApp

// DRY with landing
function handleClick(event) {
    if (props.ymGotoRustoreVia) {
        event.preventDefault()

        ymReachGoal(
            YmGoal.goto_rustore,
            { goto_rustore_via: props.ymGotoRustoreVia },
            () => {
                // For debug
                // setTimeout(() => {window.location.href = rustoreHref }, 5000)
                window.location.href = rustoreHref
            }
        )
    }
}
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