<template>
    <Transition name="fade">
        <div v-if="store.isAndroidBannerVisible" class="android-banner-wrapper">
            <div class="android-banner">
                <div class="android-banner__header">
                    <img class="android-banner__header__logo" src="@/assets/logo/proportio.svg">
                    <h6 class="android-banner__header__h">Пропорцио на Андройд</h6>
                </div>
                <p class="android-banner__body">Пересчёт на общую массу и форму, рецепт из скриншота и подсветка на
                    время
                    готовки. Всё удобнее и всегда под рукой</p>
                <div class="android-banner__actions">
                    <PButton label="В другой раз" @click="store.hideAndroidBanner" class="btn-label-banner" />
                    <PLinkButton :href="rustoreHref" @click="handleDownloadClick" class="p-link-btn-banner">
                        <span>Скачать</span></PLinkButton>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { YmGoal, ymReachGoal } from '@/lib/metrika';
import { useProportioCalculatorStore } from '@/stores/proportioCalculator';
import { useSocialStore } from '@/stores/socialStore';
import PButton from '@/ui/PButton.vue';
import PLinkButton from '@/ui/PLinkButton.vue';

const store = useProportioCalculatorStore()
const rustoreHref = (useSocialStore()).rustoreApp

// DRY with PRuStoreButton
function handleDownloadClick(event) {
    event.preventDefault()
    ymReachGoal(
        YmGoal.goto_rustore,
        { goto_rustore_via: 'app_banner' },
        () => {
            // For debug
            // setTimeout(() => {window.location.href = rustoreHref }, 5000)
            window.location.href = rustoreHref
        }
    )
}
</script>

<style scoped>
.android-banner-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
    display: flex;
    justify-content: center;
    background: var(--shuttle-gray-950);
    color: white;
    border-radius: 16px 16px 0 0;
    z-index: 1000;
}

/* For tablets */
.android-banner {
    max-width: 450px;
    box-sizing: border-box;
    padding: 32px 16px;
}

.android-banner__body {
    margin-top: 12px;
}

.android-banner__actions {
    margin-top: 32px;
}

.android-banner__header {
    display: flex;
    align-items: center;
    gap: 12px;
}

.android-banner__header__h {
    display: inline;
    font-size: 18px;
    font-weight: var(--weight-semibold);
    margin: 0;
}

.android-banner__header__logo {
    width: 48px;
    height: 48px;
}

.android-banner__actions {
    display: flex;
    justify-content: space-between;
}


.btn-label-banner {
    background-color: transparent;
    color: white;
    border: none;
    padding: 10px 16px;
}

.p-link-btn-banner {
    padding: 11px 36px 9px 36px;
    border-radius: 8px;
    text-decoration: none;
    background-color: var(--shuttle-gray-50);
    font-weight: var(--weight-semibold);
    color: var(--shuttle-gray-950);
    line-height: 1;
}
</style>