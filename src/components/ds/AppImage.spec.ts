import { describe, it, expect } from 'vitest'
import { fireEvent } from '@testing-library/vue'

import { mountComponent } from '../../testUtils'

import AppImage from './AppImage.vue'

describe('AppImage.vue', () => {
  it('renders the loading image initially with hidden loaded image', () => {
    const wrapper = mountComponent(AppImage, {
      props: {
        src: 'image-src.jpg',
        alt: 'Kong default image',
        imageTestId: 'after-load-image',
        loadingImageTestId: 'loading-image',
      },
    })

    const imageToBeLoaded = wrapper.findTestId('after-load-image')
    const loadingImage = wrapper.findTestId('loading-image')

    expect(imageToBeLoaded.attributes('style')).toContain('display: none')
    expect(loadingImage).toBeTruthy()
  })

  it.only('renders the main image after loading', async () => {
    const wrapper = mountComponent(AppImage, {
      props: {
        src: 'image-src.jpg',
        alt: 'Kong default image',
        imageTestId: 'after-load-image',
        loadingImageTestId: 'loading-image',
      },
    })

    const imageToBeLoaded = wrapper.findTestId('after-load-image')

    // Simulate the image load event
    await fireEvent.load(imageToBeLoaded.element)

    expect(imageToBeLoaded.attributes('style')).not.toContain('display: none')
  })
})
