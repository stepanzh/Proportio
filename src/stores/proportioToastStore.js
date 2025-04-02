// Store for creating global toasts (notification)

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProportioToastStore = defineStore('proportio-toast', () => {
    // Uses one toast, not many

    const toastMessage = ref('')
    const toastSeverity = ref('info')
    const isToastVisible = ref(false)

    let _lastShowTimeoutID = -1

    function showToast({ message, severity = 'info' }) {
        toastMessage.value = message
        toastSeverity.value = severity
        isToastVisible.value = true

        if (_lastShowTimeoutID != -1) {
            clearTimeout(_lastShowTimeoutID)
        }

        _lastShowTimeoutID = setTimeout(() => {
            isToastVisible.value = false
        }, 2000)
    }

    return {
        toastMessage,
        toastSeverity,
        isToastVisible,
        showToast,
    }
})