import { describe, it, expect } from 'vitest'
import baseHtml from '../base.html?raw'

describe('DOM check', () => {
	const parser = new DOMParser();
	const dom = parser.parseFromString(baseHtml, 'text/html');

  it('element with id "versionInput" should exist', () => {
    expect(dom.getElementById('versionInput')).toBeTruthy()
  })
})
