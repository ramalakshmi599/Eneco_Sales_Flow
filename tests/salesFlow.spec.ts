import { test,expect } from 'playwright/test';
import { EnecoMainPage } from '../pages/EnecoMainPage';
import { CalculateUsagePage } from '../pages/CalculateUsagePage';
import { OfferPage } from '../pages/OfferPage';
import { CustomerDataPage } from '../pages/CustomerDataPage';
import { input } from '../utils/input'
import { clickNextPage } from '../utils/helpers'


test.describe('Eneco Sales Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


test('Navigate through Eneco sales flow', async ({ page }) => {
    const enecoMain = new EnecoMainPage(page);
    // Accept cookies on enecoMainPage
    try {
       await page.waitForSelector('[data-label="Accepteren"]', { timeout: 5000 });
       await page.click('[data-label="Accepteren"]');
       console.log('Clicked on the Accept Cookies button!');
    }  catch (error) {
       console.error('Cookie button not found:', error);
    }

    //Enter address to proceed
    await enecoMain.fillForm();
    await enecoMain.clickProceed();

    //Choose electricity and click next button
    const calculate = new CalculateUsagePage(page);

    const headerText = await calculate.getHeaderText();
    expect(headerText).toContain(input.formFields.chooseEnergy);

    await calculate.chooseEnergy("electricity");
    await clickNextPage(page)
 
    //Fill question about knowledge on energy consumption
    await calculate.knowUsage('yes')  
    await clickNextPage(page)

    //Enter normal and offpeak usage
    await calculate.enterUsage('100','150')
    await clickNextPage(page)

    //Fill question about solar panel usage
    await calculate.chooseSolarOption("no");
    await clickNextPage(page)

    // Fill question about moving
    await calculate.chooseMoving('yes')
    await clickNextPage(page)

    //Choose contract type
    const offer = new OfferPage(page);
    await offer.chooseContractType("Dynamisch");
    await clickNextPage(page)

    //Proceed to customer data
    await offer.showDataButton()
    await clickNextPage(page)

    //Fill question for address check
    const customerData =new CustomerDataPage(page)
    await customerData.chooseAddressCheck('yes')
    await clickNextPage(page)

   //Enter personal details
    await customerData.selectGender('female')
    await customerData.enterFirstName(input.formFields.firstName)
    await customerData.enterLastName(input.formFields.lastName)
    await customerData.enterInitials(input.formFields.initials)
    await customerData.enterBirthDate(input.formFields.birthDate)
    await customerData.enterBirthMonth(input.formFields.birthMonth)
    await customerData.enterBirthYear(input.formFields.birthYear)
    await clickNextPage(page)

   //Enter email and phone number
    await customerData.enterPhoneNumber(input.formFields.phoneNumber)
    await customerData.enterEmail(input.formFields.email)
    await customerData.checkOrderButton()
    
    //Validate title of final page
    const finalPageTitle = await customerData.checkLastPageTitle();
    expect(await customerData.checkLastPageTitle()).toBe(input.formFields.finishPageTitle)

    //Print success page
    console.log('Test executed successfully!');
});
});