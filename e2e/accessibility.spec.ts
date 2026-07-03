import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('accessibility smoke checks', () => {
  test('products page has no obvious axe violations', async ({ page }) => {
    await page.goto('/products')

    await expect(page.getByRole('heading', { name: 'Product browsing' })).toBeVisible()
    await expect(page.getByLabel('Search products')).toBeVisible()
    await expect(page.getByLabel('Category')).toBeVisible()
    await expect(page.getByLabel('Sort by')).toBeVisible()

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('main')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('product filters are keyboard reachable', async ({ page }) => {
    await page.goto('/products')

    await page.getByLabel('Search products').focus()
    await expect(page.getByLabel('Search products')).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Category')).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Sort by')).toBeFocused()
  })

  test('cart drawer opens and closes with Escape', async ({ page }) => {
    await page.goto('/products')

    await page.getByTestId('cart-button').click()

    await expect(page.getByTestId('cart-drawer')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Shopping cart' })).toBeVisible()
    await expect(page.getByTestId('drawer-close-button')).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(page.getByTestId('cart-drawer')).toHaveCount(0)
  })
})
