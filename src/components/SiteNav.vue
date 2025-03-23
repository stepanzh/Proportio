<template>
    <div class="site-nav-wrapper">
        <nav class="site-nav">
            <div
                class="site-nav__left"
                @click="proportioNav.navToHome()"
                :class="{ 'is-not-home':  proportioNav.currentScreen != proportioNav.homeScreen }">

                <img class="site-nav__logo" src="@/assets/logo/proportio.svg">
                <span>Пропорцио</span>
            </div>
            <PButton @click="proportioNav.navToSupport()" label="Поддержать" class="btn-outlined">
                <template #icon>
                    <HeartIconSolid class='txt-cerise-600' />
                </template>
            </PButton>
        </nav>
    </div>
</template>


<script setup>
import { useProportioNavStore } from '@/stores/proportioNav'

const proportioNav = useProportioNavStore()
</script>


<style>
.site-nav-wrapper {
    display: flex;
    justify-content: center;
    padding: 8px;
    background: white;
    box-shadow: var(--elevation-1);
}

.site-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 580px;
    min-height: 36px;
}

.site-nav__left {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: var(--weight-semibold);
    cursor: default;
}

.site-nav__left.is-not-home {
    cursor: pointer;
}

.site-nav__logo {
    width: 36px;
    height: 36px;
}
</style>