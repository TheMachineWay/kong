import { vi, describe, it, expect } from 'vitest'
import { debounce, formatNumberToReadable, timeAgo } from './utils'


describe('utils', () => {
  it('debounce: should call the function after the specified wait time', async () => {
    const mockFunction = vi.fn()
    const debouncedFunction = debounce(mockFunction, 100)

    debouncedFunction('arg1')
    debouncedFunction('arg2')

    // Ensure the function is not called immediately
    expect(mockFunction).not.toHaveBeenCalled()

    // Wait for more than the debounce time
    await new Promise(resolve => setTimeout(resolve, 150))

    expect(mockFunction).toHaveBeenCalledOnce()
    expect(mockFunction).toHaveBeenCalledWith('arg2')
  })

  it('formatNumberToReadable: should format numbers correctly', () => {
    expect(formatNumberToReadable(999)).toBe('999')
    expect(formatNumberToReadable(1000)).toBe('1.00k')
    expect(formatNumberToReadable(1500)).toBe('1.50k')
    expect(formatNumberToReadable(1000000)).toBe('1.00m')
    expect(formatNumberToReadable(2500000)).toBe('2.50m')
    expect(formatNumberToReadable(1000000000)).toBe('1.00b')
    expect(formatNumberToReadable(2500000000)).toBe('2.50b')
  })

  it('timeAgo: should return the correct time ago string', () => {
    const now = new Date()
    const oneMinuteAgo = new Date(now.getTime() - 60000).toISOString()
    const oneHourAgo = new Date(now.getTime() - 3600000).toISOString()
    const oneDayAgo = new Date(now.getTime() - 86400000).toISOString()
    const twoDaysAgo = new Date(now.getTime() - 172800000).toISOString()

    expect(timeAgo(now.toISOString())).toBe('just now')
    expect(timeAgo(oneMinuteAgo)).toBe('1 minute ago')
    expect(timeAgo(oneHourAgo)).toBe('today') // Adjust based on current time change logic if necessary
    expect(timeAgo(oneDayAgo)).toBe('1 day ago')
    expect(timeAgo(twoDaysAgo)).toBe('2 days ago')
  })
})
