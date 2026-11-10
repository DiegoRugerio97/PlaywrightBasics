import {test, expect} from '@playwright/test';

// Handling basic UI elements like input fields, checkboxes, radio buttons, and dropdowns is a fundamental aspect of UI testing. In this test, we demonstrate how to interact with these elements using Playwright's locator methods and perform assertions on their state or content.
test('Basic UI Elements - Inputs, Selectors, Checkboxes, Radio Buttons', async ({page}) => {
    const url = 'https://rahulshettyacademy.com/client/#/auth/register'
    await page.goto(url);

    const firstNameInput = page.getByPlaceholder('First Name');
    const lastNameInput = page.getByPlaceholder('Last Name');
    const emailInput = page.getByPlaceholder('email@example.com');
    const phoneNumberInput = page.getByPlaceholder('enter your number');
    const passwordInput = page.getByPlaceholder('Passsword', {exact: true});
    const confirmPasswordInput = page.getByPlaceholder('Confirm Passsword', {exact: true});
    const occupationSelect = page.getByRole('combobox');
    const maleRadio = page.getByRole('radio', {name: 'Male', exact: true});
    const ageCheckbox = page.getByRole('checkbox');

    // Mockup register page with input fields, checkboxes, radio buttons, and dropdowns. The test demonstrates how to use Playwright's locator methods to interact with these elements and perform assertions on their state or content.
    // Using getByPlaceholder to locate input fields by their placeholder text and fill them with the specified values.
    await firstNameInput.fill('Diego');
    await lastNameInput.fill('Rugerio');
    await emailInput.fill('diego@fakemail.com');
    await phoneNumberInput.fill('1234567894');
    await passwordInput.fill('Pass123456');
    await confirmPasswordInput.fill('Pass123456');
    // Using getByRole to locate a select element by its role and perform a select action.
    await occupationSelect.selectOption('Engineer');
    // Using getByRole to locate a checkbox element by its role and perform a check action.
    await maleRadio.check();
    // Using getByRole to locate a checkbox element by its role and perform a check action. Checkbox is unique in page, so we can use getByRole without specifying the name of the checkbox. The `check` method is used to select the checkbox, simulating a user interaction with the element.
    await ageCheckbox.check();

    // Running assertions to verify that the input fields contain the expected values after filling them out. The `toHaveValue` assertion is used to check the value of each input field, ensuring that the correct data has been entered into the form.
    await expect(firstNameInput).toHaveValue('Diego');
    await expect(lastNameInput).toHaveValue('Rugerio');
    await expect(emailInput).toHaveValue('diego@fakemail.com');
    await expect(phoneNumberInput).toHaveValue('1234567894');
    await expect(passwordInput).toHaveValue('Pass123456');
    await expect(confirmPasswordInput).toHaveValue('Pass123456');
    await expect(occupationSelect).toHaveValue('3: Engineer');
    await expect(maleRadio).toBeChecked();
    await expect(ageCheckbox).toBeChecked();
});

test('Basic UI Elements - Buttons and Attributes', async ({page}) => {  
    const url = 'https://rahulshettyacademy.com/loginpagePractise/';
    await page.goto(url);
    const usernameInput = page.getByLabel('Username:');
    const passwordInput = page.getByLabel('Password:');
    const userRadio = page.getByRole('radio', {name: 'User'});
    const okayBtn = page.getByRole('button', {name: 'Okay', exact: true});
    const select = page.getByRole('combobox');
    const agreeCheckbox = page.getByRole('checkbox', {name: 'I agree to the terms and conditions'});
    const signInBtn = page.getByRole('button', {name: 'Sign In'});
    const flashingText = page.getByRole('link', {name: 'Free Access to InterviewQues/ResumeAssistance/Material'});

    await usernameInput.fill('rahulshettyacademy');
    await passwordInput.fill('Learning@830$3mK2');
    await userRadio.check();
    await okayBtn.click();
    await select.selectOption('Consultant');
    await agreeCheckbox.check();
    // Using toHaveAttribute assertion to verify that the flashing text element has the expected class attribute value "blinkingText". This assertion helps ensure that the element is styled correctly and is visually distinct on the page.
    await expect(flashingText).toHaveAttribute('class', 'blinkingText');
    await signInBtn.click();
    await expect(page).toHaveTitle(/ProtoCommerce/);

});

// Switching between child windows and tabs is a common scenario in web applications. In this test, we demonstrate how to handle multiple windows or tabs using Playwright's context and page management features. The test navigates to a login page, performs actions that open a new window or tab, and switches between them to perform assertions on their content.
// Instead of using the `page` object directly, we create a new page using `browser.newPage()` to simulate opening a new window or tab. This allows us to interact with the newly opened page and perform assertions on its content, ensuring that the application behaves as expected when multiple windows or tabs are involved.
test.only('Child windows and Tabs', async ({browser}) => {
    const context = await browser.newContext();
    const page = await  context.newPage();
    const url = 'https://rahulshettyacademy.com/loginpagePractise/';
    await page.goto(url);
    const pageLink = page.getByRole('link', {name: 'Free Access to InterviewQues/ResumeAssistance/Material'});
    // Using context.waitForEvent('page') to wait for the new page to be opened after clicking the link. This allows us to capture the newly opened page and perform assertions on its content.
    // Event listener is created before clicking the link to ensure that we capture the new page when it is opened. The `pagePromise` variable holds the promise that resolves to the new page, allowing us to interact with it after it has been opened.
    const pagePromise = context.waitForEvent('page')
    await pageLink.click();
    const newPage = await pagePromise;
    const heading = newPage.getByRole('heading', {name: 'Documents Request'});
    await heading.waitFor();
    await expect(heading).toHaveText('Documents request');
});
