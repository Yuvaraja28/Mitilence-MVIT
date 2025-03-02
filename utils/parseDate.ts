export function parseDateTime(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    localeMatcher: 'best fit',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour12: true,
    formatMatcher: 'basic',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function parseDateTimeShort(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    localeMatcher: 'best fit',
    year: '2-digit',
    month: 'short',
    day: '2-digit',
    hour12: true,
    formatMatcher: 'basic',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function parseDateOnly(date: string) {
  return new Date(date).toLocaleDateString('en-us', {
    month: 'short',
    year: 'numeric',
    day: '2-digit'
  })
}

export function parseTimeOnly(date: string) {
  return new Date(date).toLocaleTimeString('en-us', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}