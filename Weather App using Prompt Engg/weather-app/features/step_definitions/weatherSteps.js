const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');

let driver;

Given('I am on the weather app page', async function () {
  driver = await new Builder()
    .forBrowser('chrome')
    .build();
  await driver.get('http://localhost:3000'); // Adjust the port if necessary
});

When('I enter {string} in the city input', async function (city) {
  const input = await driver.findElement(By.css('input[placeholder="Enter city"]'));
  await input.sendKeys(city);
});

When('I click the {string} button', async function (buttonText) {
  const button = await driver.findElement(By.xpath(`//button[text()="${buttonText}"]`));
  await button.click();
});

Then('I should see the weather information for {string}', async function (city) {
  await driver.wait(until.elementLocated(By.css('.card-title')), 5000);
  const title = await driver.findElement(By.css('.card-title')).getText();
  const chai = await import('chai');
  const { expect } = chai;
  expect(title).to.equal(city);
  await driver.quit();
});

Then('I should see an error message {string}', async function (errorMessage) {
  await driver.wait(until.elementLocated(By.css('.alert-danger')), 5000);
  const alert = await driver.findElement(By.css('.alert-danger')).getText();
  const chai = await import('chai');
  const { expect } = chai;
  expect(alert).to.equal(errorMessage);
  await driver.quit();
});

// Scenario: API is loading
// Given I am on the weather app page
// When I enter "Mumbai" in the city input
// And I click the "Get Weather" button
// Then I should see a loading spinner

// Then('I should see a loading spinner', async function () {
//   await driver.wait(until.elementLocated(By.css('.spinner-border')), 5000);
//   const spinner = await driver.findElement(By.css('.spinner-border'));
//   const chai = await import('chai');
//   const { expect } = chai;
//   expect(spinner).to.not.be.null;
//   await driver.quit();
// });
