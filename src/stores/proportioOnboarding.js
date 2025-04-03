// Store for onboarading process.
// Author(s): Stepan Zakharov

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProportioOnboardingStore = defineStore('proportio-onboarding', () => {
    // Flag. Show or not help for scale mode of calculator
    const isOnboardingForScaledModeEnabled = ref(true)

    return {
        isOnboardingForScaledModeEnabled,
    }
})