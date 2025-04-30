import {Locator, Page} from "@playwright/test";

export class OfferPage {
    readonly page:Page

    private showData     : Locator
  
    constructor (page: Page) {
    this.page = page;

    this.showData = this.page.getByRole('button', { name: 'Naar je gegevens' })
   }

    async chooseContractType(option: string) {
        const contractType = this.page.getByRole("radio", { name: option });
        await contractType.waitFor({ state: "visible" });
        await contractType.check();
    }

    async showDataButton() {
        await this.showData.waitFor({state:'attached'})
        await this.showData.click()
    }
}
