<template>
    <div class="p-app-base">

        <!-- In-app navigation -->
        <div class="p-app-base__nav-wrapper">
            <slot name="nav" />
        </div>

        <!-- Screen body -->
        <div class="p-app-base__body-wrapper">
            <slot name="body" />
        </div>
    </div>
</template>


<script setup>

</script>


<style scoped>
.p-app-base {
    max-width: 512px;
}

.p-app-base__nav-wrapper {
    padding: 8px;
}

.p-app-base__body-wrapper {
    padding: 0 16px 16px 16px;
}
</style>