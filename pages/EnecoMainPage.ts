import { Locator, Page } from 'playwright';
import { input } from "../utils/input"; 

export class EnecoMainPage {
     private page: Page;
     private postCode       : Locator;
     private houseNumber    : Locator;
     private proceedButton  : Locator;
     private addressVisible : Locator;

  constructor (page: Page) {
     this.page = page;
     this.postCode       = this.page.locator('[name="postalCode"]')
     this.houseNumber    = this.page.locator('[name="houseNumber"]')
     this.proceedButton  = this.page.locator('[data-label="'+input.formFields.proceedButton+'"]')
     this.addressVisible = this.page.locator('[data-gtm-form-interact-id="0"]');
  }
    
  async fillForm() {
    try {
      await this.postCode.fill(input.formFields.postCode);
      console.log('Postcode field filled with:', input.formFields.postCode);
      await this.houseNumber.fill(input.formFields.houseNumber);
      console.log('House number field filled with:', input.formFields.houseNumber);
    } catch (error) {
      console.error('Error while filling the form:', error);
      throw error;
    }
  }


  async clickProceed() {
      while (true) {
          const divCount = await this.addressVisible.filter().locator('div').count()
          if (divCount === 19) {
              break
          }
      }
      await this.page.waitForTimeout(2000)
      await this.proceedButton.click()
  }
}