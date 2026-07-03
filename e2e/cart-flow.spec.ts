import { expect, test } from '@playwright/test'

test.describe('browsing to cart flow', () => {
  test('user can filter, open detail, add to cart, update quantity, and remove item', async ({ page }) => {
    await page.goto('/products')

    await page.getByLabel('Search products').fill('helmet')

    await expect(page.getByRole('heading', { name: '1 product' })).toBeVisible()

    const productLink = page.getByRole('link', { name: 'PeakGuard Helmet' }).first()
    await expect(productLink).toBeVisible()
    await productLink.click()

    await expect(page.getByRole('heading', { name: 'PeakGuard Helmet' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Specifications' })).toBeVisible()

    await page.getByTestId('detail-add-to-cart').click()

    const drawer = page.getByTestId('cart-drawer')
    const cartItem = page.getByTestId('cart-item-peakguard-helmet')

    await expect(drawer).toBeVisible()
    await expect(drawer.getByRole('heading', { name: 'Shopping cart' })).toBeVisible()
    await expect(cartItem).toBeVisible()
    await expect(page.getByTestId('cart-quantity-peakguard-helmet')).toHaveText('1')
    await expect(page.getByTestId('cart-line-total-peakguard-helmet')).toHaveText('$89')
    await expect(page.getByTestId('cart-total-items')).toHaveText('1')
    await expect(page.getByTestId('cart-subtotal')).toHaveText('$89')

    await cartItem.getByRole('button', { name: /increase quantity/i }).click()
    await expect(page.getByTestId('cart-quantity-peakguard-helmet')).toHaveText('2')
    await expect(page.getByTestId('cart-line-total-peakguard-helmet')).toHaveText('$178')
    await expect(page.getByTestId('cart-total-items')).toHaveText('2')
    await expect(page.getByTestId('cart-subtotal')).toHaveText('$178')

    await cartItem.getByRole('button', { name: /decrease quantity/i }).click()
    await expect(page.getByTestId('cart-quantity-peakguard-helmet')).toHaveText('1')
    await expect(page.getByTestId('cart-line-total-peakguard-helmet')).toHaveText('$89')
    await expect(page.getByTestId('cart-total-items')).toHaveText('1')
    await expect(page.getByTestId('cart-subtotal')).toHaveText('$89')

    await cartItem.getByRole('button', { name: /remove peakguard helmet from cart/i }).click()

    await expect(page.getByTestId('cart-item-peakguard-helmet')).toHaveCount(0)
    await expect(drawer.getByText('Your cart is empty')).toBeVisible()
    await expect(page.getByTestId('cart-total-items')).toHaveText('0')
    await expect(page.getByTestId('cart-subtotal')).toHaveText('$0')
  })
})
