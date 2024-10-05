type paramFunction<T, U> = (...args: T[]) => U

export function debounce<T, U>(func: paramFunction<T, U>, wait = 300) {
  let timeout: ReturnType<typeof setTimeout>

  return function(...args: T[]) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export function formatNumberToReadable(num: number) {
  if (num < 1000) return num.toString()

  let suffix
  if (num >= 1000000000) {
    num /= 1000000000
    suffix = 'b'
  } else if (num >= 1000000) {
    num /= 1000000
    suffix = 'm'
  } else {
    num /= 1000
    suffix = 'k'
  }

  return `${num.toFixed(2)}${suffix}`
}

export function timeAgo(dateString: string): string {
  const now = new Date()
  const pastDate = new Date(dateString)

  const secondsAgo = Math.floor((now.getTime() - pastDate.getTime()) / 1000)

  if (secondsAgo < 60) {
    return 'just now'
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60)
    return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`
  } else if (secondsAgo < 86400) {
    return 'today'
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400)
    return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`
  }
}