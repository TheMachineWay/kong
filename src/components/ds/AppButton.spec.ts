import { vi, describe, it, expect } from 'vitest'

import AppButton from './AppButton.vue'
import { mountComponent } from '../../testUtils'

describe('AppButton.vue', () => {
  it('renders default button with default classes', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementationOnce(() => {})
    const wrapper = mountComponent(AppButton, {
      props: {
        leadingIcon: 'icon-name',
        label: 'Button Label',
        dataTestId: 'test-button',
      },
    })

    expect(wrapper.findTestId('test-button')).toBeTruthy()
    expect(errorSpy).not.toHaveBeenCalledOnce()
    expect(wrapper.classes()).toContain('primary')
    expect(wrapper.classes()).toContain('medium')
  })

  it('throws error if icon is passed but no label or aria label is passed', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementationOnce(() => {})
    mountComponent(AppButton, {
      props: {
        leadingIcon: 'icon-name',
        dataTestId: 'test-button',
      },
    })

    expect(errorSpy).toHaveBeenCalledOnce()
  })

  it('renders leading icon if leading icon is passed with aria label', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementationOnce(() => {})
    const wrapper = mountComponent(AppButton, {
      props: {
        leadingIcon: 'icon-name',
        dataTestId: 'test-button',
        ariaLabel: 'The Button',
      },
    })

    expect(wrapper.find('.leading-icon')).toBeTruthy()
    expect(errorSpy).not.toHaveBeenCalledOnce()
  })

  it('does not render leading icon if leading icon is not passed', () => {
    const label = 'Button Label'
    const wrapper = mountComponent(AppButton, {
      props: {
        label,
        dataTestId: 'test-button',
      },
    })

    expect(wrapper.find('.leading-icon').exists()).toBe(false)
    expect(wrapper.text()).toContain('Button Label')
  })

  it('emits click event on click', async () => {
    const wrapper = mountComponent(AppButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('applies secondary class when button type is secondary', () => {
    const wrapper = mountComponent(AppButton, {
      props: {
        type: 'secondary',
        label: 'Button Label',
      },
    })

    expect(wrapper.classes()).toContain('secondary')
    expect(wrapper.classes()).not.toContain('primary')
  })

  it('applies large style when button size is large', () => {
    const wrapper = mountComponent(AppButton, {
      props: {
        size: 'large',
      },
    })
    expect(wrapper.classes()).toContain('large')
    expect(wrapper.classes()).not.toContain('medium')
  })

  it('applies small style when small prop is true', () => {
    const wrapper = mountComponent(AppButton, {
      props: {
        size: 'small',
      },
    })
    expect(wrapper.classes()).toContain('small')
    expect(wrapper.classes()).not.toContain('medium')
  })
})
