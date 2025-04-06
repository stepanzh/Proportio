// Store for creating global toasts (notification)

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProportioToastStore = defineStore('proportio-toast', () => {
    // Uses one toast, not many

    const toastMessage = ref('')
    const toastSeverity = ref('info')  // One of: info, error, success, warning
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

    function showInfo(message) {
        return showToast({ message: message, severity: 'info' })
    }

    function showError(message) {
        return showToast({ message: message, severity: 'error' })
    }

    function showSuccess(message) {
        return showToast({ message: message, severity: 'success' })
    }

    function showWarning(message) {
        return showToast({ message: message, severity: 'warning' })
    }

    function showTip(message) {
        return showToast({ message: message, severity: 'tip' })
    }

    return {
        toastMessage,
        toastSeverity,
        isToastVisible,
        showInfo,
        showError,
        showSuccess,
        showWarning,
        showTip,
    }
})