<template>
    <header class="landing-header">
        <div class="header__content">
            <div class="header-welcome">
                <img class="header-logo" :src=ProportioLogo />
                <h1 class="header-title">Привет 👋<br>это <span class="header-app-name">Пропорцио</span></h1>
                <p class="header-subtitle">Здесь можно пересчитать рецепт</p>
            </div>
            <div class="header-actions">
                <a href="#support-proportio" class="sbtn sbtn-outlined">
                    <IconWithLabel label="Поддержать">
                        <HeartIconSolid class="txt-cerise-600 icon-20" />
                    </IconWithLabel>
                </a>
                <RouterLink to="/app" class="sbtn sbtn-primary">
                    <IconWithLabel label="Пересчитать рецепт">
                        <CalculatorIconSolid class="icon-20" />
                    </IconWithLabel>
                </RouterLink>
            </div>
            <div class="scroll-tip">
                <div class="txt-h-caption">Подробнее</div>
                <div>
                    <ChevronDoubleDownIconOutline class="icon-24" />
                </div>
            </div>
        </div>
    </header>
    <div class="nav-wrapper">
        <nav class="landing-nav">
            <a class="nav-logo" href="#">
                <img :src=ProportioLogo class="nav-logo__img" />
                <span class="nav-logo__txt">Пропорцио</span>
            </a>
            <RouterLink class="nav-link-primary" to="/app"><span>В калькулятор</span></RouterLink>
        </nav>
    </div>
    <main class="landing-main">
        <Card class="author">
            <img class="author-img" :src=AuthorImageUrl />
            <h2 class="sh1 author__h">
                Привет 👋<br>
                Я Степан, создатель Пропорцио
            </h2>
            <section class="author__story">
                <p class="stxt">Несколько лет назад я учился готовить по&nbsp;роликам <a href="https://borsch-company.ru/" ref="nofollow">Borsch</a>-а и&nbsp;<a href="https://vk.com/atpiska" rel="nofollow">Обломова</a>, пробовал рецепты из&nbsp;Интернета. Часто в&nbsp;них были слишком большие порции или у&nbsp;меня было не то количество чего&#8209;нибудь, поэтому рецепты приходилось пересчитывать. Так&nbsp;и&nbsp;появился Пропорцио.</p>
                <p class="stxt">Я поддерживаю калькулятор в&nbsp;одиночку и&nbsp;в&nbsp;свободное время. Веб-версию выпустил в 2022-ом году, она остаётся бесплатной и без рекламы.</p>
                <p class="stxt">В 2026-ом выпустил <a :href="social.rustoreApp">Пропорцио на Андроид</a>. В мобильной версии больше функций, и она просто удобнее.</p>
                <p class="stxt">Вы можете помочь мне сохранить и улучшить Пропорцио. Я буду рад <a href="#support-proportio">финансовой помощи</a> и&nbsp;просто <a href="#proportio-social">обратной связи</a>.</p>
                <p class="stxt">Пользуйтесь Пропорцио с удовольствием!</p>
            </section>
            <PLinkButton class="author__action btn btn-filled-primary"
                :href="social.rustoreApp">
                <template #icon>
                    <DevicePhoneMobileIcon />
                </template>
                <template #default>
                    Скачать в RuStore
                </template>
            </PLinkButton>
            <PLinkButton class="author__action btn btn-filled-primary btn-filled-primary-cerise"
                href="#support-proportio">
                <template #icon>
                    <HeartIconSolid />
                </template>
                <template #default>
                    Поддержать Пропорцио
                </template>
            </PLinkButton>
        </Card>
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
                            description="Варенье, маринованые огурцы и помидоры, заготовки на&nbsp;зиму" />
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
                            расчёта смесей и&nbsp;растворов.</p>
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
                    <p class="stxt feature__description">В Пропорцио вы можете пересчитать рецепт на&nbsp;ингредиент или&nbsp;число порций</p>
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
        <LandingArticle id="support-proportio">
            <template #header>Поддержите проект</template>
            <template #default>
                <section class="support">
                    <p class="stxt support__description">Пропорцио <span class="stxt-emph">бесплатный</span> и&nbsp;<span
                            class="stxt-emph">без рекламы</span></p>
                    <p class="stxt support__description">Если вам нравится калькулятор, поддержите разработку</p>
                    <div class="support__donation-list">
                        <DonationCard donate-url="https://www.tbank.ru/cf/ASVy6k1gw7z"
                            donate-url-label="Перевести по карте" caption="из любого банка РФ"
                            :logo-src=TBankLogo />
                        <DonationCard donate-url="https://pay.cloudtips.ru/p/01aa1961"
                            donate-url-label="Поддержать донатом" caption="из любого банка РФ, можно по СБП" :logo-src=CloudTipsLogo />
                    </div>
                </section>
            </template>
        </LandingArticle>
        <LandingArticle id="proportio-social">
            <template #header>Пропорцио в соцсетях</template>
            <template #default>
                <section class="social">
                    <p class="stxt social__description">Присоединяйтесь, чтобы не упустить обновления и&nbsp;выпуск
                        мобильного приложения</p>
                    <div class="social__list">
                        <SocialCard :url=social.telegramChannel.href
                            :label=social.telegramChannel.hostname.concat(social.telegramChannel.pathname)
                            caption="Телеграмм" :logo-src=TelegramLogo />
                        <SocialCard :url=social.vkChannel.href
                            :label=social.vkChannel.hostname.concat(social.vkChannel.pathname) caption="вконтакте"
                            :logo-src=VKLogo />
                    </div>
                </section>
            </template>
        </LandingArticle>
        <LandingArticle id="proportio-feedback">
            <template #header>Обратная связь</template>
            <template #default>
                <section class="feedback">
                    <p class="stxt feedback__description">Пройдите опрос по улучшению Пропорцио или сообщите о чём-нибудь</p>
                    <div class="feedback__list">
                        <SocialCard
                            :url=social.feedbackSurvey.href
                            label="Опрос по улучшению"
                            caption="Яндекс.Формы"
                            :logo-src=YandexFormsLogo />
                        <SocialCard
                            :url=social.feedbackFreeForm.href
                            label="Форма обратной связи"
                            caption="Яндекс.Формы"
                            :logo-src=YandexFormsLogo />
                    </div>
                </section>
            </template>
        </LandingArticle>
    </main>
    <footer class="landing-footer">
        <div class="footer__content">
            <PRuStoreButton/>
            <small>&copy; Степан Захаров, 2022-2026</small>
            <small><a :href=social.stepanzhBlog.href>{{ social.stepanzhBlog.hostname }}</a></small>
        </div>
    </footer>
</template>

<script setup>
import { ArrowDownTrayIcon, ClipboardDocumentListIcon, FolderOpenIcon, ShareIcon } from '@heroicons/vue/24/outline';
import AuthorImageUrl from '@/assets/img/stepan-zakharov.jpg'
import Card from '@/components/Card.vue'
import CulinaryUseCase from '@/components/CulinaryUseCase.vue'
import CloudTipsLogo from '@/assets/logo/cloudtips.svg'
import DonationCard from './DonationCard.vue'
import IconWithLabel from './IconWithLabel.vue'
import LandingArticle from './LandingArticle.vue'
import PLinkButton from '@/ui/PLinkButton.vue'
import PRuStoreButton from '@/ui/PRuStoreButton.vue'
import ProportioLogo from '@/assets/logo/proportio.svg'
import SocialCard from './SocialCard.vue'
import TBankLogo from '@/assets/logo/tbank.svg'
import TelegramLogo from '@/assets/logo/telegram.svg'
import VKLogo from '@/assets/logo/vk.svg'
import YandexFormsLogo from '@/assets/logo/yandex-forms.svg'
import { useSocialStore } from '@/stores/socialStore'
import { DevicePhoneMobileIcon } from '@heroicons/vue/16/solid';

const social = useSocialStore()
</script>

<style scoped>
/* region common */
.sbtn {
    display: flex;
    justify-content: center;
    padding: 8px 32px;
    font-size: 16px;
    line-height: 20px;
    font-weight: var(--weight-semibold);
    border-radius: 8px;
    border: 1px solid var(--blue-ribbon-600);
}

.sbtn:hover { text-decoration: none; }

.sbtn-primary {
    background: var(--blue-ribbon-600);
    color: white;
}
.sbtn-primary:hover { background: var(--blue-ribbon-700); }
.sbtn-primary:active { background: var(--blue-ribbon-800);}

.sbtn-outlined {
    background: white;
}
.sbtn-outlined:hover { background: var(--blue-ribbon-100); }
.sbtn-outlined:active { background: var(--blue-ribbon-200); }
/* endregion common */

.landing-header {
    height: 100vh;
    width: 100vw;
    padding: 32px 16px 64px 16px;
    box-sizing: border-box;
    background: white;
}

.header__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.header-welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
    font-weight: var(--weight-semibold);
}

.header-logo {
    width: 100px;
    height: 100px;
}

.header-title {
    font-size: 24px;
    /* 40px = 24px + 16px */
    line-height: 40px;
    text-align: center;
    font-weight: var(--weight-semibold);
}

.header-app-name { color: var(--blue-ribbon-600); }

.header-actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.scroll-tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    color: var(--shuttle-gray-400);
}

@media only screen and (min-width: 640px) {
    .header__content {
        gap: 128px;
        justify-content: center;
    }
    .header-title {
        font-size: 30px;
        line-height: 48px;
    }
    .header-subtitle { font-size: 20px; }
}

.landing-main {
    display: grid;
    gap: 64px;
    margin-top: 48px;
}

@media only screen and (min-width: 640px) {
    .landing-main {
        grid-template-columns: 640px;
        justify-content: center;
    }
}

.nav-wrapper {
    position: sticky;
    top: 0;
    width: 100vw;
    display: flex;
    justify-content: center;
    background: white;
    box-shadow: var(--elevation-1);
    padding: 8px 16px;
    box-sizing: border-box;
}

.landing-nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

@media only screen and (min-width: 640px) {
    .landing-nav { max-width: 640px; }
}

.nav-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    font-size: 16px;
    font-weight: var(--weight-semibold);
    color: var(--shuttle-gray-900);
}

.nav-logo__img {
    width: 36px;
    height: 36px;
}

.nav-link-primary {
    background: var(--blue-ribbon-600);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    color: white;
    font-weight: var(--weight-semibold);
    line-height: 1;
    text-decoration: none;
}

.nav-link-primary:hover {
    background-color: var(--blue-ribbon-700);
}

@media only screen and (min-width: 640px) {
    .nav-logo {
        font-size: 18px;
    }

    .nav-link-primary {
        font-size: 16px;
        padding: 10px 16px;
        border-radius: 8px;
    }
}
.author { gap: 16px; }

.author-img {
    display: inline-block;
    align-self: center;
    width: min(320px, 100%);
    max-height: 320px;
    box-shadow: var(--demotion-1);
    border-radius: 16px;
}

.author__h {
    margin: 0;
}

.author__story {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.author__action {
    display: inline-block;
    text-decoration: none;
    align-self: center;
    margin-top: 16px;
}

@media only screen and (min-width: 640px) {
    .author__h {
        font-size: 24px;
        line-height: 33px;
        text-align: center;
    }
    
    .author__story {
        gap: 32px;
    }
}

.use-cases__header {
    text-align: center;
    margin-bottom: 24px;
}

.use-cases__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

@media only screen and (min-width: 640px) {
    .use-cases__list {
        gap: 24px;
    }
    .use-cases__header { margin-bottom: 32px; }
}

.feature {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.feature__description,
.support__description,
.social__description,
.feedback__description
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

.support,
.social,
.feedback
{
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.support__donation-list {
    display: grid;
    gap: 48px;
    margin-top: 16px;
}

.social__list,
.feedback__list
{
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-self: center;
}

.landing-footer {
    display: flex;
    justify-content: center;
    width: 100vw;
    margin-top: 64px;
    padding: 32px 16px;
    box-sizing: border-box;
    background: var(--shuttle-gray-100);
    box-shadow: inset 0 8px 12px rgba(0, 0, 0, 0.1);
}

.footer__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.footer__content a {
    color: inherit;
    text-decoration: underline;
}
</style>