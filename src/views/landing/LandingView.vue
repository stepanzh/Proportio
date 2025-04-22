<template>
    <header></header>
    <main class="landing-main">
        <LandingArticle>
            <template #header>Для чего Пропорцио?</template>
            <template #default>
                <section class="use-cases">
                    <header class="use-cases__header">
                        <h3 class="sh2">🧑‍🍳 Кулинария</h3>
                    </header>
                    <div class="use-cases__list">
                        <CulinaryUseCase emoji="🍰" title="Кондитерские изделия"
                            description="Торты, конфеты, пирожные, печенье, мороженое" />
                        <CulinaryUseCase emoji="🥖" title="Тесто и выпечка" description="Хлеб, пироги, куличи, пицца" />
                        <CulinaryUseCase emoji="🥗" title="Салаты"
                            description="Для баланса вкусов и правильной текстуры" />
                        <CulinaryUseCase emoji="🍝" title="Соусы, заправки и масла"
                            description="Для баланса вкусов и правильной текстуры" />
                        <CulinaryUseCase emoji="🍖" title="Маринады" description="Шашлыки, стейки и барбекю" />
                        <CulinaryUseCase emoji="🥫️" title="Консервация"
                            description="Варенье, маринованые огурцы и помидоры, заготовки на зиму" />
                        <CulinaryUseCase emoji="🥤" title="Напитки"
                            description="Лимонады, соки, компоты, коктейли, настойки, домашнее вино" />
                        <CulinaryUseCase emoji="🥳" title="Меню на большую компанию"
                            description="Для расчёта покупок и блюд к столу, когда гостей много" />
                        <CulinaryUseCase emoji="❤️" title="Здоровое и спортивное питание"
                            description="Для правильного размера порции и состава" />
                    </div>
                </section>
                <section class="use-cases">
                    <header class="use-cases__header">
                        <h3 class="sh2">🧑‍🎨 Творчество и хобби</h3>
                    </header>
                    <section>
                        <p class="stxt">Изделия из гипса, домашнее мыло и ароматы. Пропорцио подходит для точного
                            расчёта смесей и растворов.</p>
                    </section>
                </section>
            </template>
        </LandingArticle>
        <LandingArticle>
            <template #header>Калькулятор для рецептов</template>
            <template #default>
                <section class="feature">
                    <div class="feature-mode-toggle">
                        <PButton label="Как в рецепте" class="feature-orig-btn mode-toggle__left btn-outlined readonly">
                            <template #icon>
                                <ListBulletIconMini />
                            </template>
                        </PButton>
                        <PButton label="Пересчитать"
                            class="feature-scale-btn mode-toggle__right btn-filled-primary readonly">
                            <template #icon>
                                <CalculatorIconMini />
                            </template>
                        </PButton>
                    </div>
                    <p class="stxt feature__description">В Пропорцио вы можете пересчитать рецепт на ингредиент или
                        число порций</p>
                </section>
                <section class="feature">
                    <div class="feature__icon-list">
                        <FolderOpenIcon />
                        <ArrowDownTrayIcon />
                        <ClipboardDocumentListIcon />
                        <ShareIcon />
                    </div>
                    <p class="stxt feature__description">Рецепты можно сохранять и делиться ими</p>
                </section>
            </template>
        </LandingArticle>
        <LandingArticle>
            <template #header>Поддержите проект</template>
            <template #default>
                <section class="support">
                    <p class="stxt support__description">Пропорцио <span class="stxt-emph">бесплатный</span> и <span
                            class="stxt-emph">без рекламы</span></p>
                    <p class="stxt support__description">Если вам нравится калькулятор, поддержите разработку</p>
                    <div class="support__donation-list">
                        <DonationCard
                            donate-url="https://www.tbank.ru/cf/ASVy6k1gw7z"
                            donate-url-label="Перевести в Т-Банк"
                            caption="Удобнее клиентам Т-Банка"
                            :logo-src=TBankLogo />
                        <DonationCard
                            donate-url="https://pay.cloudtips.ru/p/01aa1961"
                            donate-url-label="Оставить на чай"
                            caption="Любой банк и СБП"
                            :logo-src=CloudTipsLogo />
                    </div>
                </section>
            </template>
        </LandingArticle>
        <LandingArticle>
            <template #header>Пропорцио в соцсетях</template>
            <template #default></template>
        </LandingArticle>
    </main>
    <footer></footer>
</template>

<script setup>
import CulinaryUseCase from '@/components/CulinaryUseCase.vue'
import LandingArticle from './LandingArticle.vue'
import { ArrowDownTrayIcon, ClipboardDocumentListIcon, FolderOpenIcon, ShareIcon } from '@heroicons/vue/24/outline';
import DonationCard from './DonationCard.vue'
import CloudTipsLogo from '@/assets/logo/cloudtips.svg'
import TBankLogo from '@/assets/logo/tbank.svg'
</script>

<style>
.landing-main {
    display: flex;
    flex-direction: column;
    gap: 64px;
}

.use-cases__header { text-align: center; }

.use-cases__header {
    margin-bottom: 24px;
}

.use-cases__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.feature {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.feature__description,
.support__description
{
    font-weight: var(--weight-semibold);
    text-align: center;
}

.feature-mode-toggle {
    display: grid;
    grid-template-columns: 1fr repeat(3, 80px) 1fr;
    grid-template-areas: 
        ". orig orig . ."
        ". . scale scale .";
}

.feature-orig-btn { grid-area: orig; }
.feature-scale-btn { grid-area: scale; }

.feature-mode-toggle .btn {
    display: block;
}

.feature__icon-list {
    display: flex;
    gap: 24px;
    justify-content: center;
}

.feature__icon-list > svg {
    padding: 6px;
    width: 24px;
    height: 24px;
    color: var(--blue-ribbon-600);
}

.support {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.support__donation-list {
    display: grid;
    gap: 48px;
    margin-top: 16px;
}
</style>