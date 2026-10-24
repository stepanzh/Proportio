const YM_COUNTER_ID = 95640747;

export const YmActionStatus = Object.freeze({
  error: 'error',
  success: 'success'
})

export const YmGoal = Object.freeze({
  app_calc_scale_recipe: 'app_calc_recipe_scaled',
  app_recipe_action: 'app_recipe_action',  // params: {recipe_action: 'export' | 'import' | 'clipboard', status: YmActionStatus }
  app_recipe_add_ingredient: 'app_recipe_add_ingredient',
  goto_rustore: 'goto_rustore', // params: { goto_rustore_via: 'landing_first_screen_btn' | 'landing_navbar_btn' | 'landing_price_card_free' | 'landing_price_card_premimum' | 'landing_footer' | 'app_navbar_btn' | 'app_banner' }
  landing_goto_app: 'landing_goto_app'
});

export function ymReachGoal(target, params = undefined, callback = undefined, ctx = undefined) {
  const isMetrikaLoaded = typeof window !== 'undefined' && typeof window.ym === 'function';

  if (isMetrikaLoaded) {
    try {
      window.ym(YM_COUNTER_ID, 'reachGoal', target, params, callback, ctx);
    } catch (error) {
      console.error('ymReachGoal:', error);
      if (typeof callback === 'function') {
        callback.call(ctx);
      }
    }
  } else {
    // Ad blocker or smth else
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Yandex Metrika Mock]: Цель "${target}" не отправлена (Метрика недоступна).`);
    }

    // КРИТИЧЕСКИ ВАЖНО: Если был передан callback, выполняем его, чтобы не сломать UI/логику
    if (typeof callback === 'function') {
      // Используем setTimeout, чтобы сохранить асинхронный характер поведения ym()
      setTimeout(() => {
        callback.call(ctx);
      }, 50);
    }
  }
}

export function createGotoRustoreViaClick(rustoreHref, via) {
    return function (event) {
        event.preventDefault()

        ymReachGoal(
            YmGoal.goto_rustore,
            { goto_rustore_via: via ? via : 'unknown' },
            () => {
                // For debug
                // setTimeout(() => {window.location.href = rustoreHref }, 5000)
                window.location.href = rustoreHref
            }
        )
    }
}
