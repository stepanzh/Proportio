<template>
    <Teleport to="#app">
        <Transition name="fade">
            <div v-show="isVisible" class="p-toast">
                <div class="p-toast__icon">
                    <XCircleIconMini v-if="severity === 'error'" class="icon-err" />
                    <CheckCircleIconMini v-else-if="severity === 'success'" class="icon-succ" />
                    <ExclamationTriangleIconMini v-else-if="severity === 'warning'" class="icon-warn" />
                    <AcademicCapIconMini v-else-if="severity === 'tip'" class="icon-tip" />
                    <ExclamationCircleIconMini v-else class="icon-info" />
                </div>
                <div class="p-toast__content">
                    {{ message }}
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { useProportioToastStore } from '@/stores/proportioToastStore'
import { computed } from 'vue'

const toastStore = useProportioToastStore()
const message = computed(() => toastStore.toastMessage )
const isVisible = computed(() => toastStore.isToastVisible)
const severity = computed(() => toastStore.toastSeverity)
</script>


<style scoped>
.p-toast {
    box-sizing: border-box;
    position: absolute;
    left: 50vw;
    top: 40px;
    transform: translateX(-50%);
    width: 320px;

    display: flex;
    gap: 4px;
    align-items: center;

    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1;
    font-weight: var(--weight-semibold);
    background: var(--shuttle-gray-900);
    box-shadow: var(--elevation-1);
    color: white;
    z-index: 100;
}

.p-toast__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
}

.p-toast__icon svg {
    width: 16px;
    height: 16px;
}

.icon-err { color: var(--red-orange-600); }
.icon-succ { color: var(--malachite-700); }
.icon-warn { color: var(--gorse-500); }
.icon-info { color: var(--blue-ribbon-500); }
.icon-tip { color: var(--cerise-500); }
</style>