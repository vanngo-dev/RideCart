import { describe, expect, it } from 'vitest'

import { formatCurrency } from '@/utils/formatCurrency'

describe('formatCurrency', () => {
  it('formats whole dollar values', () => {
    expect(formatCurrency(1499)).toBe('$1,499')
  })

  it('formats zero dollars', () => {
    expect(formatCurrency(0)).toBe('$0')
  })

  it('rounds decimal values to whole dollars', () => {
    expect(formatCurrency(129.49)).toBe('$129')
    expect(formatCurrency(129.5)).toBe('$130')
  })
})
