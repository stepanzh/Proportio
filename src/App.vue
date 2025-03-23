<template>
  <div class="app-layout">
    <SiteNav />
    <ProportioView />
  </div>
</template>


<script setup>
import ProportioView from '@/views/proportio/ProportioView.vue'
import SiteNav from '@/components/SiteNav.vue'
import { useProportioCalculatorStore } from '@/stores/proportioCalculator'

const store = useProportioCalculatorStore()
store.add()

</script>


<style scoped>
.app-layout {
  display: grid;
  gap: 12px;
  grid-template-columns: auto;
  grid-template-rows: auto auto; 
}
</style>