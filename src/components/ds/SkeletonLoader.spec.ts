import { describe, it, expect } from 'vitest'

import { mountComponent } from '@/testUtils'
import SkeletonLoader from './SkeletonLoader.vue'

describe('SkeletonLoader.vue', () => {
  it('renders default loader with default classes', () => {
    const wrapper = mountComponent(SkeletonLoader, {
      props: {
        label: 'HTTP',
      },
    })

    const loader = wrapper.findTestId('skeleton-loader')
    expect(loader).toBeTruthy()

    expect(loader.attributes('style')).toContain('width: 100%')
    expect(loader.attributes('style')).toContain('height: 32px')
    expect(loader.attributes('style')).toContain('border-radius: 4px')
  })

  it('renders appropriately when props are passed', async () => {
    const wrapper = mountComponent(SkeletonLoader, {
      props: {
        height: '64px',
        width: '50%',
        radius: '8px',
      },
    })

    const loader = wrapper.findTestId('skeleton-loader')

    expect(loader.attributes('style')).toContain('width: 50%')
    expect(loader.attributes('style')).toContain('height: 64px')
    expect(loader.attributes('style')).toContain('border-radius: 8px')
  })
})