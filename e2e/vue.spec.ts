import { expect, test } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'RideCart Vue 3 Commerce UI' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Browse products' })).toBeVisible()
})
