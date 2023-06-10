import { describe, it, expect } from 'vitest'

describe('Sanity Check', () => {
  it('should add 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3)	// NoSonar this is fine
  })
})