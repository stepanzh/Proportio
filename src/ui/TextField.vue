<template>
    <input v-model="model" type="text" class="inp"  />
</template>

<script setup>
const model = defineModel()
</script>


<style>
.inp {
    box-sizing: border-box;
    padding: 7px 8px 5px 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    line-height: 1;
    border: 1px solid var(--shuttle-gray-200);
    border-radius: 4px;
}

.inp:focus {
    border-color: var(--blue-ribbon-400);
    outline: 1px solid var(--blue-ribbon-400);
}

.inp:hover {
    border-color: var(--blue-ribbon-400);
}

.invalid {
    border-color: var(--red-orange-500);
}

.inp.invalid:focus {
    outline: 1px solid var(--red-orange-500);
}
</style>