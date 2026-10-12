import {test, expect} from '@playwright/test';

//The `browser` fixture in Playwright is a built-in feature that provides a browser instance for your tests. It allows you to create and manage browser contexts and pages, enabling you to interact with web applications in a controlled environment.
// Passing browser as a parameter to the test function allows you to access the browser instance and perform actions such as opening new pages, navigating to URLs, and interacting with web elements. This is useful for testing web applications in different browsers and configurations.
test('UI Basics - Browser', async ({browser}) => {
    // The `newContext()` method creates a new browser context, which is a container for one or more pages. Each context has its own storage (cookies, local storage) and can be used to isolate tests.
    const context = await browser.newContext();
    // From the browser context instance, we can create a new page using the `newPage()` method. This page represents a single tab or window in the browser where we can perform actions like navigating to URLs, interacting with elements, and asserting conditions.
    const page = await context.newPage();
    const url = 'https://playwright.dev/';
    await page.goto(url);
    await expect(page).toHaveTitle(/Playwright/);
    // Page closure is handled by the `page.close()` method, which is called at the end of the test to clean up resources and close the page after the test execution. This ensures that each test runs in isolation and does not interfere with other tests.
    await page.close();
});

// The `page` fixture is a built-in feature in Playwright that provides a pre-configured page instance for your tests. It is automatically created and managed by Playwright, allowing you to interact with web applications without needing to manually create a new context or page. This simplifies the test code and makes it easier to write tests, as you can directly use the `page` fixture to perform actions like navigating to URLs, interacting with elements, and asserting conditions.
test('UI Basics - Page', async ({page}) => {
    const url = 'https://playwright.dev/';
    await page.goto(url);
    // toHaveTitle assertion is used to verify that the page's title matches the expected value. In this case, it checks if the title contains the substring "Playwright". This assertion helps ensure that the correct page has been loaded and that the application is functioning as expected.
    await expect(page).toHaveTitle(/Playwright/);
});

// Locators are used to find elements on a web page based on their attributes, text content, or other properties. In this test, we demonstrate different ways of locating elements using the `locator` and `getByRole` methods. The `locator` method allows you to find elements based on their attributes (e.g., id, class), while the `getByRole` method allows you to find elements based on their role (e.g., button, checkbox) and associated label text. These locators are then used to perform actions like filling input fields, checking checkboxes, selecting options from dropdowns, and clicking buttons.
test('UI Basics - Locators', async ({page}) => {
    // Storing values in variables
    const url = 'https://rahulshettyacademy.com/loginpagePractise/';
    const username = 'rahulshettyacademy';
    const password = 'Learning@830$3mK2';
    const checkLabel = 'Admin';
    const comboText = 'Consultant';
    await page.goto(url);
    await expect(page).toHaveTitle(/LoginPage Practise | Rahul Shetty Academy/);
    // Using id selectors to locate elements on the page and perform actions like filling in input fields. The `locator` method is used to find elements based on their attributes (in this case, the `id` attribute), and the `fill` method is used to enter text into those input fields.
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    // Using getByRole to locate a checkbox element by its role and perform a check action. The `getByRole` method is used to find the checkbox based on the label text "Admin", and the `check` method is used to select the checkbox.
    await page.getByRole('radio', {name: checkLabel}).check();
    // Using getByRole to locate a combobox element by its role and perform a select action. The `getByRole` method is used to find the combobox based on its role, and the `selectOption` method is used to select an option from the dropdown list. In this case, it selects the option with the value "Consultant".
    await page.getByRole('combobox').selectOption(comboText);
    // Using getByRole to locate a checkbox element by its role and perform a check action. The `getByRole` method is used to find the checkbox based on the label text "I agree to the terms and conditions", and the `check` method is used to select the checkbox.
    await page.getByRole('checkbox', {name: 'I agree to the terms and conditions'}).check();
    // Using getByRole to locate a button element by its role and perform a click action. The `getByRole` method is used to find the button based on the label text "Sign In", and the `click` method is used to simulate a user clicking the button.
    await page.getByRole('button', {name: 'Sign In'}).click();
    // Expecting the page title to contain the substring "ProtoCommerce" after the sign-in action. This assertion helps ensure that the user has successfully logged in and that the application has navigated to the expected page.
    await expect(page).toHaveTitle(/ProtoCommerce/);
});

// Extracting text from elements is a common task in UI testing, and Playwright provides methods to retrieve the text content of elements on a web page. In this test, we demonstrate how to extract text from an element that displays an error message after a failed login attempt. We use the `waitFor()` method to wait for the error message element to appear on the page, and then we use the `textContent()` method to retrieve its text content. Finally, we use the `toContain` assertion to verify that the extracted error message contains the expected substring "Incorrect", ensuring that the application is displaying the correct error message when a user enters incorrect login credentials.
test('UI Basics - Extracting Text', async ({page}) => {
    // Storing values in variables
    const url = 'https://rahulshettyacademy.com/loginpagePractise/';
    const username = 'rahulshettyacademy';
    const wrongPassword = 'Learning';
    const checkLabel = 'Admin';
    const comboText = 'Consultant';
    await page.goto(url);
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(wrongPassword);
    await page.getByRole('radio', {name: checkLabel}).check();
    await page.getByRole('combobox').selectOption(comboText);
    await page.getByRole('checkbox', {name: 'I agree to the terms and conditions'}).check();
    await page.getByRole('button', {name: 'Sign In'}).click();
    
    // Using the `waitFor()` method to wait for the element with the class "alert-danger" to appear on the page. This is important because the error message may not be immediately visible after the sign-in action, and we want to ensure that we wait for it to be rendered before attempting to extract its text content.
    await page.locator('.alert-danger').waitFor();
    // Expecting the element with the text "Incorrect username/password." to be visible on the page. This assertion helps ensure that the error message is displayed as expected after a failed login attempt, providing feedback to the user about the incorrect credentials.
    await expect(page.getByText('Incorrect username/password.')).toBeVisible();
    // Using the `textContent()` method to extract the text content of an element. In this case, it retrieves the text content of the element with the class "alert-danger", which is expected to contain an error message after a failed login attempt.
    const errorMessage = await page.locator('.alert-danger').textContent();
    // Using the `toContain` assertion to verify that the extracted error message contains the expected substring "Incorrect". This assertion helps ensure that the application is displaying the correct error message when a user enters incorrect login credentials.
    expect(errorMessage).toContain('Incorrect username/password.');
});

// Handling locators that return multiple results is an important aspect of UI testing, as web pages often contain multiple elements with similar attributes or roles. In this test, we demonstrate how to work with locators that return multiple results using the `locator` method and the `nth()` method. The `locator` method is used to find all elements that match a specific selector (in this case, elements with the class "card-body"), and the `nth()` method is used to select a specific element from the list of matched elements based on its index. This allows us to interact with individual elements in a collection, such as clicking buttons or extracting text from specific cards on the page.
test('UI Basics - Multiple Elements', async ({page}) => {
    // Storing values in variables
    const url = 'https://rahulshettyacademy.com/loginpagePractise/';
    const username = 'rahulshettyacademy';
    const password = 'Learning@830$3mK2';
    const checkLabel = 'Admin';
    const comboText = 'Consultant';
    await page.goto(url);
    await expect(page).toHaveTitle(/LoginPage Practise | Rahul Shetty Academy/);
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    await page.getByRole('radio', {name: checkLabel}).check();
    await page.getByRole('combobox').selectOption(comboText);
    await page.getByRole('checkbox', {name: 'I agree to the terms and conditions'}).check();
    await page.getByRole('button', {name: 'Sign In'}).click();
    // Using the `locator` method to find all elements with the class "card-body" on the page. This returns a list of elements that match the specified selector, allowing us to interact with individual cards on the page.
    const cards = page.locator('.card-body');
    // Using the `nth()` method to select the first card from the list of matched elements. The `nth()` method takes an index as an argument (0-based) and returns the element at that index, allowing us to interact with a specific card on the page. An alternative is to use the `first()` method, which returns the first element in the list of matched elements. In this case, we are using `nth(0)` to select the first card, but we could also use `first()` to achieve the same result.
    const firstCard = cards.nth(0);
    // Using the `locator` method to find the anchor element (`<a>`) within the first card and asserting that its text content matches the expected value "iphone X". This assertion helps ensure that the correct product is displayed in the first card on the page.
    const productName = 'iphone X';
    // Using the `waitFor()` method to wait for the first card element to be visible on the page before performing assertions. This is important because the card may not be immediately visible after the sign-in action, and we want to ensure that we wait for it to be rendered before attempting to assert its text content.
    await firstCard.waitFor();
    await expect(firstCard.locator('a')).toHaveText(productName);

    
});