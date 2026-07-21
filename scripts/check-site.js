import assert from 'node:assert/strict'
import puppeteer from 'puppeteer'

const baseUrl = process.env.SITE_URL || 'http://127.0.0.1:4173'
const browser = await puppeteer.launch({ headless: true })
const consoleErrors = []

async function openPage(path, viewport, { collectConsoleErrors = true } = {}) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  page.on('console', (message) => {
    if (collectConsoleErrors && message.type() === 'error') consoleErrors.push(message.text())
  })
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle0' })
  return page
}

async function revealScrolledContent(page) {
  await page.evaluate(async () => {
    const pause = () => new Promise((resolve) => setTimeout(resolve, 90))
    const originalScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    const lastScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    for (let scrollTop = 0; scrollTop < lastScrollTop; scrollTop += window.innerHeight * 0.7) {
      window.scrollTo(0, scrollTop)
      await pause()
    }
    window.scrollTo(0, lastScrollTop)
    await new Promise((resolve) => setTimeout(resolve, 850))
    window.scrollTo(0, 0)
    await pause()
    document.documentElement.style.scrollBehavior = originalScrollBehavior
  })
}

try {
  const desktop = await openPage('/', { width: 1440, height: 1000 })
  assert.match(await desktop.title(), /Fully Local Markdown Knowledge Workspace/)
  const heroHeading = await desktop.$eval('h1', (node) => node.textContent)
  assert.equal(heroHeading.trim(), 'doXmind')
  assert.equal(
    await desktop.$eval('.hero-icon', (node) => node.getAttribute('src')),
    '/doxmind-app-icon.png',
  )
  assert.equal(
    await desktop.$eval('[data-testid="mac-download"]', (node) => node.href),
    'https://github.com/doXmind/releases/releases/latest/download/doXmind-mac-arm64.dmg',
  )
  assert.equal(
    await desktop.$eval('.site-header [data-testid="mac-download"]', (node) => node.href),
    'https://github.com/doXmind/releases/releases/latest/download/doXmind-mac-arm64.dmg',
  )
  assert.deepEqual(
    await desktop.$$eval('.frame img', (nodes) => nodes.map((node) => node.getAttribute('src'))),
    [
      '/doxmind-overview.png',
      '/doxmind-editor.png',
      '/doxmind-overview.png',
      '/doxmind-editor.png',
    ],
  )
  assert.deepEqual(
    await desktop.$$eval('.frame img', (nodes) => nodes.map((node) => node.getAttribute('alt'))),
    [
      'The doXmind workspace showing a Markdown Page with spreadsheet and PDF Attachments',
      'A Markdown Page open in the doXmind rich editor',
      'A local folder in doXmind with one Markdown Page and two read-only Attachments',
      'A doXmind Page documenting how PDF and spreadsheet files remain read-only Attachments',
    ],
  )
  assert.equal(
    await desktop.$$eval('.frame img', (nodes) => nodes.every((node) => node.complete && node.naturalWidth > 0)),
    true,
  )

  const bodyText = await desktop.$eval('body', (node) => node.innerText)
  for (const requiredSurface of [
    'A fully local, Markdown-native knowledge workspace.',
    'One editing surface: the Markdown Page.',
    'read-only Attachments',
    'eligible cases can use an explicit, unverified recovery attempt',
    'v1.8.0',
  ]) {
    assert.equal(bodyText.includes(requiredSurface), true, `${requiredSurface} should appear`)
  }
  for (const removedSurface of ['Log in', 'Sign up', 'Launch App', 'Try for free', 'Pricing']) {
    assert.equal(bodyText.includes(removedSurface), false, `${removedSurface} should not appear`)
  }
  for (const retiredClaim of [
    'desktop IDE for Markdown, PDF, and Excel',
    'Read, annotate and organize long documents',
    'Block-based annotation and edit surface',
    'A real formula engine, not a viewer',
    'spreadsheet editor',
  ]) {
    assert.equal(bodyText.includes(retiredClaim), false, `${retiredClaim} should not appear`)
  }

  const softwareSchema = await desktop.$$eval('script[type="application/ld+json"]', (nodes) =>
    nodes.map((node) => JSON.parse(node.textContent)).find((schema) => schema['@type'] === 'SoftwareApplication'),
  )
  assert.ok(softwareSchema)
  assert.ok(softwareSchema.featureList.includes('Read-only PDF, spreadsheet, and HTML Attachments'))
  assert.equal(softwareSchema.featureList.includes('PDF annotation and document tools'), false)
  assert.equal(softwareSchema.featureList.includes('Excel workbook editing'), false)

  await revealScrolledContent(desktop)
  const hiddenRevealSections = await desktop.$$eval('.reveal', (nodes) =>
    nodes
      .map((node) => ({
        opacity: getComputedStyle(node).opacity,
        text: node.textContent.trim().replace(/\s+/g, ' ').slice(0, 80),
      }))
      .filter(({ opacity }) => !(Number.parseFloat(opacity) > 0.99)),
  )
  assert.deepEqual(hiddenRevealSections, [], 'all reveal sections should become visible while scrolling')
  await desktop.screenshot({ path: '/tmp/doxmind-website-desktop.png', fullPage: true })
  await desktop.close()

  const mobile = await openPage('/', { width: 390, height: 844, deviceScaleFactor: 1 })
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  assert.ok(overflow <= 1, `mobile page overflows horizontally by ${overflow}px`)
  assert.equal(await mobile.$eval('.header-ghost', (node) => getComputedStyle(node).display), 'none')
  await revealScrolledContent(mobile)
  await mobile.screenshot({ path: '/tmp/doxmind-website-mobile.png', fullPage: true })
  await mobile.close()

  const download = await openPage('/download/', { width: 1280, height: 900 })
  await new Promise((resolve) => setTimeout(resolve, 350))
  const downloadPosition = await download.$eval('#download', (node) => ({
    top: node.getBoundingClientRect().top,
    viewportHeight: window.innerHeight,
    scrollY: window.scrollY,
  }))
  assert.ok(
    downloadPosition.top < downloadPosition.viewportHeight && downloadPosition.scrollY > 1000,
    `/download did not reveal the download section (${JSON.stringify(downloadPosition)})`,
  )
  await download.close()

  assert.deepEqual(consoleErrors, [])

  const legacy = await openPage(
    '/login',
    { width: 1280, height: 900 },
    { collectConsoleErrors: false },
  )
  assert.equal(await legacy.$eval('h1', (node) => node.textContent.trim()), 'doXmind')
  assert.equal((await legacy.$$('input')).length, 0)
  await legacy.close()

  console.log('Site checks passed: 1.8 product boundary, imagery, desktop, mobile, /download, and retired /login surface')
} finally {
  await browser.close()
}
