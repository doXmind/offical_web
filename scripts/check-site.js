import assert from 'node:assert/strict'
import puppeteer from 'puppeteer'

const baseUrl = process.env.SITE_URL || 'http://127.0.0.1:4173'
const browser = await puppeteer.launch({ headless: true })
const consoleErrors = []

async function openPage(path, viewport) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle0' })
  return page
}

try {
  const desktop = await openPage('/', { width: 1440, height: 1000 })
  assert.match(await desktop.title(), /Local Desktop IDE/)
  const heroHeading = await desktop.$eval('h1', (node) => node.textContent)
  assert.equal(heroHeading.trim(), 'doXmind')
  assert.equal(
    await desktop.$eval('.hero-app-icon', (node) => node.getAttribute('src')),
    '/doxmind-app-icon.png',
  )
  assert.equal(
    await desktop.$eval('[data-testid="mac-download"]', (node) => node.href),
    'https://github.com/doXmind/releases/releases/latest/download/doXmind-mac-arm64.dmg',
  )
  assert.equal(await desktop.$eval('.is-upcoming button', (node) => node.disabled), true)

  const bodyText = await desktop.$eval('body', (node) => node.innerText)
  for (const removedSurface of ['Log in', 'Sign up', 'Launch App', 'Try for free', 'Pricing']) {
    assert.equal(bodyText.includes(removedSurface), false, `${removedSurface} should not appear`)
  }
  await desktop.screenshot({ path: '/tmp/doxmind-website-desktop.png', fullPage: true })
  await desktop.close()

  const mobile = await openPage('/', { width: 390, height: 844, deviceScaleFactor: 1 })
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  assert.ok(overflow <= 1, `mobile page overflows horizontally by ${overflow}px`)
  assert.equal(await mobile.$eval('.desktop-nav', (node) => getComputedStyle(node).display), 'none')
  await mobile.screenshot({ path: '/tmp/doxmind-website-mobile.png', fullPage: true })
  await mobile.close()

  const download = await openPage('/download/', { width: 1280, height: 900 })
  await new Promise((resolve) => setTimeout(resolve, 350))
  const downloadTop = await download.$eval('#download', (node) => node.getBoundingClientRect().top)
  assert.ok(downloadTop < 100, `/download did not scroll to download section (top: ${downloadTop})`)
  await download.close()

  const legacy = await openPage('/login', { width: 1280, height: 900 })
  assert.equal(await legacy.$eval('h1', (node) => node.textContent.trim()), 'doXmind')
  assert.equal((await legacy.$$('input')).length, 0)
  await legacy.close()

  assert.deepEqual(consoleErrors, [])
  console.log('Site checks passed: desktop, mobile, /download, and retired /login surface')
} finally {
  await browser.close()
}
