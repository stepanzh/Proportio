import { defineStore } from 'pinia'

export const useSocialStore = defineStore('social', () => {
    const telegramChannel = new URL("https://t.me/proportioapp")
    const vkChannel = new URL("https://vk.com/proportioapp")
    const stepanzhBlog = new URL("https://stepanzh.github.io")

    return {
        telegramChannel,
        vkChannel,
        stepanzhBlog,
    }
})