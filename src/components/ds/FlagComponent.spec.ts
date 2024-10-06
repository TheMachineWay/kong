import { describe, it, expect } from 'vitest'

import { mountComponent } from '@/testUtils'
import FlagComponent from './FlagComponent.vue'

describe('FlgComponent.vue', () => {
  it('renders default flag with default classes', () => {
    const wrapper = mountComponent(FlagComponent, {
      props: {
        label: 'HTTP',
      },
    })

    expect(wrapper.findTestId('app-flag')).toBeTruthy()
    expect(wrapper.text()).toContain('HTTP')
    expect(wrapper.classes()).toContain('primary')
  })

  it('renders secondary flag component with secondary class', async () => {
    const wrapper = mountComponent(FlagComponent, {
      props: {
        label: 'HTTP',
        type: 'secondary',
      },
    })

    expect(wrapper.classes()).toContain('secondary')
    expect(wrapper.classes()).not.toContain('primary')
  })
})