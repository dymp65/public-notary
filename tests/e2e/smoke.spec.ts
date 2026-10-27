import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

// Smoke tests for AT-01…AT-07 plus the C4/C6/C9 checks (docs/website-mvp/plan.md §6).

const LINKEDIN = 'https://www.linkedin.com/in/igustingurahpremana'
const MAPS = 'https://maps.app.goo.gl/TyGB2XTzgziTXk4T9'
const HEADER_HEIGHT = 72

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 0) < 1024

async function openMenuIfNeeded(page: Page) {
  if (!isMobile(page)) return
  const toggle = page.locator('button[aria-controls="mobile-menu"]')
  if ((await toggle.getAttribute('aria-expanded')) !== 'true') await toggle.click()
  await expect(page.locator('#mobile-menu')).toBeVisible()
}

async function clickNav(page: Page, section: string) {
  await openMenuIfNeeded(page)
  const nav = isMobile(page) ? page.locator('#mobile-menu') : page.locator('header nav').first()
  await nav.locator(`a[href="#${section}"]`).click()
}

// Wait until smooth scrolling has stopped
async function waitForScrollEnd(page: Page) {
  let last = -1
  await expect.poll(async () => {
    const y = await page.evaluate(() => window.scrollY)
    const settled = y === last
    last = y
    return settled
  }, { intervals: [150] }).toBe(true)
}

async function switchLocale(page: Page) {
  if (isMobile(page)) {
    await openMenuIfNeeded(page)
    await page.locator('#mobile-menu button').click()
  } else {
    await page.getByRole('button', { name: /^(Ganti bahasa|Switch language)/ }).first().click()
  }
}

// Visible text, alt, aria-label, and title, skipping elements marked with another language
function collectText(page: Page, skipLang: string) {
  return page.evaluate((skip) => {
    const parts: string[] = []
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const parent = node.parentElement
      if (!parent || parent.closest(`[lang="${skip}"]`)) continue
      parts.push(node.textContent ?? '')
    }
    for (const el of document.querySelectorAll('[alt], [aria-label], [title]')) {
      if (el.closest(`[lang="${skip}"]`)) continue
      parts.push(el.getAttribute('alt') ?? '', el.getAttribute('aria-label') ?? '', el.getAttribute('title') ?? '')
    }
    return parts.join(' ')
  }, skipLang)
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('page structure: one h1, ordered headings, images sized', async ({ page }) => {
  await expect(page.locator('h1')).toHaveCount(1)
  const levels = await page.locator('main h1, main h2, main h3').evaluateAll((els) => els.map((el) => Number(el.tagName[1])))
  for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1)
  const images = await page.locator('img').evaluateAll((els) =>
    els.map((el) => ({ w: el.getAttribute('width'), h: el.getAttribute('height'), loading: el.getAttribute('loading'), src: el.getAttribute('src') })),
  )
  for (const image of images) {
    expect(image.w && image.h, image.src ?? '').toBeTruthy()
    if (image.src !== '/images/portrait-headshot.jpg') expect(image.loading, image.src ?? '').toBe('lazy')
  }
})

test('AT-01 navigation lands each heading below the sticky header', async ({ page }) => {
  for (const [section, heading] of [
    ['about', '#about-title'],
    ['practice', '#practice-title'],
    ['office', '#office-title'],
    ['insights', '#insights-title'],
    ['home', 'h1'],
  ]) {
    await clickNav(page, section)
    await expect(page).toHaveURL(new RegExp(`#${section}$`))
    await waitForScrollEnd(page)
    const box = await page.locator(heading).boundingBox()
    expect(box!.y, section).toBeGreaterThanOrEqual(HEADER_HEIGHT)
    expect(box!.y + box!.height, section).toBeLessThanOrEqual(page.viewportSize()!.height)
  }
})

test('AT-02 mobile menu opens, closes on Escape and link, no horizontal scroll', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  const toggle = page.locator('button[aria-controls="mobile-menu"]')
  const menu = page.locator('#mobile-menu')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(menu).toBeHidden()

  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(toggle).toHaveAttribute('aria-label', 'Tutup menu')
  await expect(menu).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(toggle).toBeFocused()

  await toggle.click()
  await menu.locator('a[href="#office"]').click()
  await expect(menu).toBeHidden()
  await waitForScrollEnd(page)
  expect((await page.locator('#office-title').boundingBox())!.y).toBeGreaterThanOrEqual(HEADER_HEIGHT)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  // Closes when the viewport reaches the desktop breakpoint
  await toggle.click()
  await page.setViewportSize({ width: 1100, height: 812 })
  await expect(menu).toBeHidden()
})

test('AT-03 locale switch updates text, labels, alt, metadata, and open panels', async ({ page }) => {
  await expect(page.locator('html')).toHaveAttribute('lang', 'id')
  await expect(page).toHaveTitle('I Gusti Ngurah Premana — Notaris & PPAT di Bali')

  // Expand an accordion before switching
  await page.locator('#insight-button-0').click()
  await expect(page.locator('#insight-panel-0')).toContainText('Akta autentik adalah')

  const idText = await collectText(page, 'en')
  expect(idText).not.toMatch(/\b(the|and|of|Open|Close|Skip|Photo|Previous|Next|Switch|Show|Learn)\b/)

  await switchLocale(page)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveTitle('I Gusti Ngurah Premana — Notary & PPAT in Bali')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /^Professional profile/)
  await expect(page.locator('h1')).toContainText('Committed to')
  await expect(page.locator('#insight-button-0')).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#insight-panel-0')).toContainText('An authentic deed')
  await expect(page.getByText('Content is general information, not legal advice')).toBeVisible()

  // Dialog text follows the locale
  await page.locator('#practice button[aria-haspopup="dialog"]').first().click()
  await expect(page.locator('dialog')).toContainText('Notarial Matters')
  await expect(page.locator('dialog button').first()).toHaveAttribute('aria-label', 'Close details')
  await page.keyboard.press('Escape')

  const enText = await collectText(page, 'id')
  expect(enText).not.toMatch(/\b(dan|yang|untuk|dengan|Lewati|Buka|Tutup|Foto|Ganti|Navigasi|Potret|Lorong|Tampilkan|Peta|Baca|Kantor|Informasi|Tentang|Beranda|Seluruh|Konten|Kunjungi|selengkapnya)\b/)

  // Choice persists across a reload; switching back restores Indonesian
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await switchLocale(page)
  await expect(page.locator('html')).toHaveAttribute('lang', 'id')
  await expect(page.locator('h1')).toContainText('Komitmen pada')
})

test('AT-04 practice dialog traps focus, closes three ways, restores focus', async ({ page }) => {
  const trigger = page.locator('#practice button[aria-haspopup="dialog"]').first()
  const dialog = page.locator('dialog')
  const focusInsideDialog = () => page.evaluate(() => {
    const active = document.activeElement
    return !active || active === document.body || !!active.closest('dialog')
  })

  await trigger.click()
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAttribute('aria-labelledby', 'service-dialog-title')
  await expect(page.locator('#service-dialog-title')).toHaveText('Kenotariatan')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe('hidden')
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true)
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab')
    expect(await focusInsideDialog()).toBe(true)
  }
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Shift+Tab')
    expect(await focusInsideDialog()).toBe(true)
  }
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()

  await trigger.click()
  await expect(dialog).toBeVisible()
  await page.mouse.click(4, 4) // backdrop
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()

  await trigger.click()
  await dialog.getByRole('button', { name: 'Tutup', exact: true }).click()
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden')
})

test('AT-05 office photos load with localized alt text', async ({ page }) => {
  // G-21: the prev/next gallery became a fixed bento of office photos (owner request)
  // G-24: the interior/formal row is hidden by default (flags.showOfficePhotos), so only the team photo shows
  const photos = page.locator('#office img')
  await expect(photos).toHaveCount(1)
  for (const photo of await photos.all()) {
    await photo.scrollIntoViewIfNeeded()
    await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth)).toBeGreaterThan(0)
    expect(((await photo.getAttribute('alt')) ?? '').length).toBeGreaterThan(10)
  }
  await expect(photos.first()).toHaveAttribute('alt', /tim kantor/)
  await switchLocale(page)
  await expect(photos.first()).toHaveAttribute('alt', /office team/)
})

test('AT-06 insights accordion state matches aria', async ({ page }) => {
  for (let i = 0; i < 3; i++) {
    const button = page.locator(`#insight-button-${i}`)
    const panel = page.locator(`#insight-panel-${i}`)
    await expect(button).toHaveAttribute('aria-controls', `insight-panel-${i}`)
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(panel).toBeHidden()
    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(panel).toBeVisible()
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(panel).toBeHidden()
    await page.keyboard.press('Space')
    await expect(panel).toBeVisible()
  }
  // One open at a time
  await expect(page.locator('[id^="insight-panel-"]:visible')).toHaveCount(1)
  await expect(page.getByText('Konten bersifat informasi umum, bukan nasihat hukum')).toBeVisible()
})

test('AT-07 external links use the supplied URLs safely', async ({ page }) => {
  const external = page.locator('a[target="_blank"]')
  for (const rel of await external.evaluateAll((els) => els.map((el) => el.getAttribute('rel')))) {
    expect(rel).toBe('noopener noreferrer')
  }
  const hrefs = await external.evaluateAll((els) => els.map((el) => el.getAttribute('href')))
  expect(hrefs.filter((href) => href === LINKEDIN)).toHaveLength(2)
  expect(hrefs.filter((href) => href === MAPS)).toHaveLength(2)
  expect(hrefs.every((href) => href === LINKEDIN || href === MAPS)).toBe(true)
})

test('C4 Pejabat Lelang hidden by default', async ({ page }) => {
  await expect(page.locator('#practice article')).toHaveCount(2)
  expect(await collectText(page, 'none')).not.toMatch(/lelang/i)
  await switchLocale(page)
  expect(await collectText(page, 'none')).not.toMatch(/auction/i)
})

test('C6 map is a deferred 2D embed and keeps the plain link', async ({ page }) => {
  const mapRequests: string[] = []
  page.on('request', (request) => {
    if (/google\.[a-z.]+\/maps/.test(request.url())) mapRequests.push(request.url())
  })
  await page.goto('/')
  await page.waitForTimeout(500)
  expect(mapRequests).toHaveLength(0) // not fetched while the visitor is at the top of the page

  const frame = page.locator('iframe')
  await expect(frame).toHaveAttribute('title', 'Peta lokasi kantor di Google Maps')
  await expect(frame).toHaveAttribute('loading', 'lazy')
  await expect(page.getByRole('link', { name: /Buka Google Maps/ }).first()).toHaveAttribute('href', MAPS)

  await frame.scrollIntoViewIfNeeded()
  await expect(frame).toHaveAttribute('src', /q=-8\.672171,115\.168603&hl=id&z=16&output=embed/) // road map, coordinates only, Indonesian labels
  await expect.poll(() => mapRequests.length).toBeGreaterThan(0)
})

test('C9 reduced motion disables smooth scroll and hover motion', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto('http://localhost:4173/')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  const card = page.locator('#practice article').first()
  await card.scrollIntoViewIfNeeded()
  await card.hover()
  await page.waitForTimeout(400)
  expect(await card.evaluate((el) => getComputedStyle(el).transform)).toBe('none')
  await context.close()
})
