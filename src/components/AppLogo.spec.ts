import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

import AppLogo from './AppLogo.vue'
import { mountComponent } from '../testUtils'

describe('AppLogo', () => {
  it('should emit clock in click', async () => {
    const wrapper = mountComponent(AppLogo)
    const logo = wrapper.findTestId('logo')

    expect(logo).toBeTruthy()

    await userEvent.click(logo.element)

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('router link should point to root url', async () => {
    const wrapper = mountComponent(AppLogo)
    const routerLink = wrapper.findTestId('logo-router-link')

    expect(routerLink).toBeTruthy()
    expect(routerLink.attributes('href')).toBe('/')
  })

  it('should have kong logo', async () => {
    const wrapper = mountComponent(AppLogo)
    const kongLogo = wrapper.findTestId('kong-logo')

    expect(kongLogo).toBeTruthy()
    expect(kongLogo.attributes('src')).toBe('/src/assets/images/logo.svg')
  })

  it('should have Konnect logo', async () => {
    const wrapper = mountComponent(AppLogo)
    const kongLogo = wrapper.findTestId('konnect-logo')

    expect(kongLogo).toBeTruthy()
    expect(kongLogo.attributes('src')).toBe('/src/assets/images/konnect.svg')
  })
})