
<template>
    <AppScreen>
        <template #nav>
            <AppNavBar title="Пропорцио в соцсетях">
                <template #left-menu>
                    <PIconButton @click="proportioNav.navBack()">
                        <ArrowLeftIconOutline />
                    </PIconButton>
                </template>
            </AppNavBar>
        </template>
        <template #body>
            <main>
                <section>
                    Новости, советы и рецепты. Присоединяйтесь, не упустите выпуск мобильного приложения.
                </section>
                <section class="social-list">
                    <a class="social-card" href="https://t.me/proportioapp">
                        <img class="social-card__logo" src=@/assets/logo/telegram.svg />
                        <span class="social-card__address">t.me/proportioapp</span>
                        <span class="social-card__caption">Телеграмм</span>
                    </a>
                    <a class="social-card" href="https://vk.com/proportioapp">
                        <img class="social-card__logo" src=@/assets/logo/vk.svg />
                        <span class="social-card__address">vk.com/proportioapp</span>
                        <span class="social-card__caption">вконтакте</span>
                    </a>
                </section>
            </main>
        </template>
    </AppScreen>
</template>

<script setup>
import { useProportioNavStore } from '@/stores/proportioNav'

import AppNavBar from '@/components/AppNavBar.vue'
import AppScreen from '@/components/AppScreen.vue'

const proportioNav = useProportioNavStore()
// TODO: use social store
</script>

<style>
.social-list {
    margin-top: 24px;
    display: grid;
    gap: 24px;
}

.social-card {
    display: grid;
    gap: 0;
    grid-template-rows: auto auto;
    grid-template-columns: auto 1fr;
    grid-template-areas:
    "logo address"
    "logo caption";
}

.social-card__logo { grid-area: logo; }
.social-card__address { grid-area: address; }
.social-card__caption { grid-area: caption; }

.social-card__logo {
    width: 48px;
    height: 48px;
    margin-right: 12px;
}

.social-card__address {
    font-size: 20px;
    font-weight: var(--weight-semibold);
    align-self: end;
}

.social-card__caption {
    font-size: 16px;
    color: var(--blue-ribbon-600);
}
</style>