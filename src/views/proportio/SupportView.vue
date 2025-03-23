
<template>
    <AppScreen>
        <template #nav>
            <AppNavBar title="Поддержать проект">
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
                    Потрачу на развитие Пропорцио и разработку мобильной версии приложения.
                </section>
                <section class="donate-actions">
                    <DonateCard
                        title="Поддержать донатом в CloudTips"
                        body="Любой банк и СБП. Есть сервисный сбор."
                        donateUrl="https://pay.cloudtips.ru/p/01aa1961"
                        action-caption="Поддержать через CloudTips"
                        :logo-src=CloudTipsLogo
                    />
                    <DonateCard
                        title="Поддержать переводом в Т-Банк"
                        body="Любой банк, удобнее для клиентов Т-Банка."
                        donateUrl="https://www.tbank.ru/cf/ASVy6k1gw7z"
                        action-caption="Перевести в Т-Банк"
                        :logo-src=TBankLogo
                    />
                </section>
            </main>
        </template>
    </AppScreen>
</template>

<script setup>
import { useProportioNavStore } from '@/stores/proportioNav'

import AppNavBar from '@/components/AppNavBar.vue'
import AppScreen from '@/components/AppScreen.vue'
import DonateCard from '@/components/DonateCard.vue'

import CloudTipsLogo from '@/assets/logo/cloudtips.svg'
import TBankLogo from '@/assets/logo/tbank.svg'

const proportioNav = useProportioNavStore()
</script>

<style>
.donate-actions {
    display: flex;
    flex-direction: column;
    gap: 64px;
    margin: 24px 0;
}
</style>