import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile, optimize } from '@tailwindcss/node'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

const here = dirname(fileURLToPath(import.meta.url))
const entryCssPath = resolve(here, '../src/index.css')
const entryCssSource = readFileSync(entryCssPath, 'utf8')

// jsdom's getComputedStyle does not honor :is() selectors nor cascade across
// nested @layer blocks. Walk the parsed stylesheet ourselves and use
// element.matches() (which does honor :is()) to determine what applies.
function resolveDeclaredProperty(el: Element, prop: string): string {
  let value = ''
  const visit = (rules: CSSRuleList | undefined): void => {
    if (!rules) return
    for (let i = 0; i < rules.length; i++) {
      const rule = rules.item(i)!
      const styleRule = rule as CSSStyleRule
      if (styleRule.selectorText) {
        try {
          if (el.matches(styleRule.selectorText)) {
            const v = styleRule.style.getPropertyValue(prop)
            if (v) value = v
          }
        } catch {
          // Selector not parseable by this DOM — skip.
        }
      }
      const nested = (rule as CSSGroupingRule).cssRules
      if (nested && nested.length > 0) visit(nested)
    }
  }
  for (let i = 0; i < el.ownerDocument!.styleSheets.length; i++) {
    visit(el.ownerDocument!.styleSheets[i]!.cssRules)
  }
  return value
}

let compiledCss: string

beforeAll(async () => {
  const compiler = await compile(entryCssSource, {
    base: dirname(entryCssPath),
    onDependency: () => {},
  })
  const raw = compiler.build(['dark:bg-red-500', 'bg-white'])
  compiledCss = optimize(raw, { minify: false }).code
})

afterEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = ''
  document.documentElement.className = ''
})

describe('@custom-variant dark', () => {
  it('is declared in the entry CSS', () => {
    expect(entryCssSource).toMatch(/@custom-variant\s+dark\s*\(\s*&:is\(\.dark\s+\*\)\s*\)\s*;/)
  })

  it('compiles dark:bg-red-500 into a .dark-descendant rule, not a media query', () => {
    expect(compiledCss).toMatch(/\.dark\\:bg-red-500[^{]*\.dark/)
    expect(compiledCss).not.toMatch(/@media\s*\([^)]*prefers-color-scheme:\s*dark[^)]*\)\s*\{\s*\.dark\\:bg-red-500/)
  })

  it('applies dark:bg-red-500 only when <html> carries the dark class', () => {
    const style = document.createElement('style')
    style.textContent = compiledCss
    document.head.appendChild(style)

    const div = document.createElement('div')
    div.className = 'dark:bg-red-500'
    document.body.appendChild(div)

    document.documentElement.classList.add('dark')
    const dark = resolveDeclaredProperty(div, 'background-color')
    expect(dark).not.toBe('')
    expect(dark).toMatch(/red-500/)

    document.documentElement.classList.remove('dark')
    const light = resolveDeclaredProperty(div, 'background-color')
    expect(light).toBe('')
  })
})
