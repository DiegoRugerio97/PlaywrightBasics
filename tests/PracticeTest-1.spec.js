// Logging into practice app https://rahulshettyacademy.com/client/#/auth/login, filling out a form, and asserting that the first card on the page contains the expected product name "iphone X". The test demonstrates how to use Playwright's locator methods to interact with multiple elements on the page and perform assertions on their content.
import { test, expect } from '@playwright/test';

test('UI Basics - First Practice', async ({ page }) => {   
    const url = 'https://rahulshettyacademy.com/client/#/auth/login';
    const username = 'diego.rugerio@gmail.com';
    const password = 'Pass123456';
    await page.goto(url);
    await page.getByPlaceholder('email@example.com').fill(username);
    await page.getByPlaceholder('enter your passsword').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Using waitForLoadState('networkidle') to ensure that the page has finished loading and all network requests have completed before proceeding with further actions. This is important to avoid interacting with elements that may not be fully rendered or available on the page yet.
    await page.waitForLoadState('networkidle'); 
    const cards = page.locator('.card-body');
    const firstCard = cards.nth(0);
    const productName = 'ADIDAS ORIGINAL';
    await firstCard.waitFor();
    await expect(firstCard.locator('h5')).toHaveText(productName);
});
