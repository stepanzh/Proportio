import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProportioNavStore = defineStore('proportio-nav', () => {
    const screens = Object.freeze({
        calc: 1,
        edit: 2,
        help: 3,
        support: 4
    })

    // Current app's home is calc screen
    const homeScreen = screens.calc


    // Initial screen
    const currentScreen = ref(homeScreen)

    // Nav history is organized via stack
    let navHistory = [currentScreen.value]

    function navToScreenById(screenId) {
        if (currentScreen.value == screenId){
            return
        }

        currentScreen.value = screenId
        navHistory.push(currentScreen.value)
        console.debug('forward', navHistory)
    }

    function navToHome() { navToScreenById(homeScreen) }

    function navToCalc() { navToScreenById(screens.calc) }

    function navToEdit() { navToScreenById(screens.edit) }
    
    function navToHelp() { navToScreenById(screens.help) }
    
    function navToSupport() { navToScreenById(screens.support) }

    function navBack() {
        console.debug('back before', navHistory)
        if (navHistory.length > 0) {
            let prevScreen = navHistory.pop()
            if (navHistory.length > 0) {
                currentScreen.value = navHistory[navHistory.length-1]
            }
        }
        console.debug('back after', navHistory)
    }

    return {
        screens,
        homeScreen,
        currentScreen,
        navHistory,
        navToScreenById,
        navToHome,
        navBack,
        navToCalc,
        navToEdit,
        navToHelp,
        navToSupport,
    }
})