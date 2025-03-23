<template>
    <TextField v-model="user" @focus="isChangeByUser = true" @blur="isChangeByUser = false" type="text" :class="{ invalid: !isValid }" />
</template>


<script setup>
// TODO: Something wrong with precision and trailing zeros
//       See captures: after 4th digit model filled with incorrect values


import { computed, ref, watch } from 'vue'

const model = defineModel({ required: true })
const user = ref(prettify(model.value))
const isValid = computed(() => user.value === '' ? true : validate(user.value))
const isChangeByUser = ref(false)

watch(user, () => {
    if (!isValid.value) {
        model.value = NaN
        return
    }
    
    // NOTE: Here we may compare new value with old and change model only when neccessary
    //       It's usable when user edit number, e.g. replace dot with comma

    model.value = parseFloat(user.value.replace(',', '.'))
})

watch(model, () => {
    if (isChangeByUser.value) {
        return
    }
    user.value = prettify(model.value)
})

function validate(text) {
    const trimmed = text.trim()
    const re = /^\d+([,.]\d*)?$/
    const isNumber = re.test(trimmed)
    return isNumber
}

function prettify(number) {
    if (isNaN(number)) {
        return ''
    }

    let rounded
    if (0 <= number && number < 10){
        rounded = number.toFixed(3);
    } else if (10 <= number && number < 100){
        rounded = number.toFixed(2);
    } else if (100 <= number && number < 1000){
        rounded = number.toFixed(1);
    } else {
        rounded = number.toFixed(0);
    }

    // TODO: dot and comma
    return parseFloat(rounded).toString()
}
</script>


<style scoped>
.invalid,
.invalid:focus {
    border-color: red;
    outline: 0;
}
</style>