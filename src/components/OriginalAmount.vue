<template>
    <TextField v-model="user" type="text" :class="{ invalid: !isValid }" />
</template>


<script setup>
import { computed, ref, watch } from 'vue'

const model = defineModel({ required: true })
const user = ref(prettify(model.value))
const isValid = computed(() => wasEnterred.value ? validate(user.value) : true )

watch(user, () => {
    if (!isValid.value) {
        model.value = NaN
        return
    }
    model.value = parseFloat(user.value.replace(',', '.'))
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
    // TODO: Dot and comma (?)
    return number.toString()
}

// Did user interact with input?
const wasEnterred = ref(false)
watch(user, () => { wasEnterred.value = true }, { once: true })

</script>


<style scoped>
.invalid,
.invalid:focus {
    border-color: red;
    outline: 0;
}
</style>