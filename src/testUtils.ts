import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router'

export function mountComponent(component: any, options: any = {}) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  const { global: globalOptions = {}, ...restOptions } = options

  return mount(component, {
    global: {
      plugins: (globalOptions.plugins || []).concat(router),
      ...globalOptions,
    },
    ...(restOptions || {}),
  })
}
