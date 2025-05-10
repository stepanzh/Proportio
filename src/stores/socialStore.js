import { defineStore } from 'pinia'

export const useSocialStore = defineStore('social', () => {
    const telegramChannel = new URL("https://t.me/proportioapp")
    const vkChannel = new URL("https://vk.com/proportioapp")
    const stepanzhBlog = new URL("https://stepanzh.github.io")
    const feedbackSurvey = new URL("https://forms.yandex.ru/u/681e21d8d04688c05974798f/")
    const feedbackFreeForm = new URL("https://forms.yandex.ru/u/681f2013eb61467af495de02/")

    return {
        feedbackFreeForm,
        feedbackSurvey,
        telegramChannel,
        vkChannel,
        stepanzhBlog,
    }
})