import { describe, it, expect } from 'vitest'
import baseHtml from '../base.html?raw'
import {getInputData} from '../src/common'

describe('DOM check', () => {
	const parser = new DOMParser();
	const document = parser.parseFromString(baseHtml, 'text/html');

  it('element with id "civInput" should exist', () => {
    expect(getInputData()).toMatchObject({
			inputs: []
			checkboxes: document.querySelectorAll('[data-dest-checkbox]'),
			stores: document.querySelectorAll('[data-dest-noauto]'),
			defaults: document.querySelectorAll('[data-default]'),
			simple: document.querySelectorAll('[data-dest-simple]'),
			lists: document.querySelectorAll('[list]'),
	})
  })
})