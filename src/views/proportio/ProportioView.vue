<template>
    <div class-="p-view-wrapper">
        <div class="p-app-card">
            <CalculatorView v-if="proportio.currentScreen == proportio.screens.calc" />
            <EditView v-if="proportio.currentScreen == proportio.screens.edit" />
            <HelpView v-if="proportio.currentScreen == proportio.screens.help" />
            <SupportView v-if="proportio.currentScreen == proportio.screens.support" />
        </div>
    </div>
</template>


<script setup>
import CalculatorView from '@/views/proportio/CalculatorView.vue'
import EditView from '@/views/proportio/EditView.vue'
import HelpView from '@/views/proportio/HelpView.vue'
import SupportView from '@/views/proportio/SupportView.vue'

import { useProportioNavStore } from '@/stores/proportioNav'

const proportio = useProportioNavStore()

proportio.navToHome()
</script>


<style>
.p-view-wrapper {
    display: flex;
    justify-content: center;
}

.p-app-card {
    justify-content: center;
    background-color: white;
    /* TODO: minus site-nav height */
    min-height: 100vh;
}

@media screen and (min-width: 512px) {
    .p-app-card {
        width: 512px;
        height: auto;
        min-height: 512px;
        padding: 24px 32px;
        border-radius: 16px;
        margin: 0 auto;
        box-shadow: var(--elevation-3);
    }
}
</style>