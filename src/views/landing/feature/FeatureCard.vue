<template>
    <Card class="feature-card">
        <header>
            <h3 class="title">{{ title }}</h3>
            <img v-if="showAndroidIcon" :src=AndroidLogo class="android-logo" />
        </header>
        <h4 class="price">{{ price }}</h4>
        <div>
            <slot name="action" />
        </div>
        <div>
            <div class="feature-list">
                <div v-for="(item, idx) in features" :key="idx" class="feature-list__item">
                    <span v-if="item.isPremium"><PlusCircleIconMini class="icon-20 premium-icon" /></span>
                    <span v-else><CheckCircleIconMini class="icon-20 non-premium-icon" /></span>
                    <span class="feature-list__item__label">{{ item.label }}</span>
                </div>
            </div>
        </div>
    </Card>
</template>

<script setup>
import Card from '@/components/Card.vue';
import AndroidLogo from '@/assets/logo/android-2014-2019.svg'

const props = defineProps({
    title: String,
    price: String,
    showAndroidIcon: {
        type: Boolean,
        default: false
    },
    features: {
        type: Array,
        default: () => [],
        validator: (value) => {
            return value.every(item =>
                typeof item.label === 'string' &&
                typeof item.isPremium === 'boolean'
            )
        }
    }
})
</script>

<style scoped>
.feature-card {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.title { font-size: 16px; font-weight: var(--weight-semibold); }
.price { font-size: 18px; font-weight: var(--weight-bold); }
.feature-list__item__label { font-size: 14px; font-weight: var(--weight-medium); line-height: 20px; }

/* title with android icon */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.android-logo {
    width: 32px; height: 32px;
}

/* Feature list */
.feature-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.feature-list__item {
    display: flex;
    gap: 8px;
    justify-items: baseline;
    /* align-items: center; */
}

.premium-icon { color: var(--cerise-400); }
.non-premium-icon { color: var(--blue-ribbon-400); }

</style>