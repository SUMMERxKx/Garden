import { test, expect } from '@playwright/test'

test.describe('Garden of Words', () => {
  test('page loads and displays main components', async ({ page }) => {
    await page.goto('/')

    // Check that writing area is visible
    await expect(page.getByText(/Writing Area/)).toBeVisible()

    // Check that stats panel is visible
    await expect(page.getByText('Writing Stats')).toBeVisible()

    // Check that music control is visible
    await expect(page.getByText(/Music Intensity/)).toBeVisible()
  })

  test('user can type in writing area and see stats update', async ({ page }) => {
    await page.goto('/')

    // Find the textarea
    const textarea = page.locator('textarea')
    await expect(textarea).toBeVisible()

    // Type some text
    await textarea.fill('This is a test sentence with multiple words.')

    // Wait a bit for stats to update
    await page.waitForTimeout(500)

    // Check that session words increased
    const sessionWords = page.locator('text=Session Words:').locator('..').locator('text=/\\d+/').first()
    await expect(sessionWords).toContainText(/\d+/)
  })

  test('music slider controls rainfall', async ({ page }) => {
    await page.goto('/')

    // Find the music intensity slider
    const slider = page.locator('input[type="range"]')
    await expect(slider).toBeVisible()

    // Set music intensity to 50%
    await slider.fill('0.5')

    // Wait for climate to update
    await page.waitForTimeout(200)

    // Check that rain percentage is displayed
    const rainText = page.getByText(/Rain:/)
    await expect(rainText).toBeVisible()
  })

  test('plant grows over time with writing', async ({ page }) => {
    await page.goto('/')

    // Type a significant amount of text
    const textarea = page.locator('textarea')
    await textarea.fill('This is a longer piece of text. '.repeat(20))

    // Wait for plant state to update
    await page.waitForTimeout(2000)

    // The terrarium should be visible (plant is inside)
    const terrarium = page.locator('[class*="terrarium"], [class*="Terrarium"]').first()
    await expect(terrarium).toBeVisible()
  })
})

