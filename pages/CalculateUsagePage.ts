import {Locator, Page} from "@playwright/test";
import { input } from "../utils/input";

export class CalculateUsagePage {
    readonly page:Page

    private header       : Locator
    private electricity  : Locator
    private isUsageKnown : Locator
    private normalUsage  : Locator
    private offPeakUsage : Locator
    private solarPanel   : Locator
    private isMoving     : Locator
  

    constructor (page: Page) {
        this.page = page;

        this.header       = this.page.locator('main h1')
        this.electricity  = this.page.getByLabel(input.formFields.energyChoice)
        this.isUsageKnown = this.page.getByLabel(input.formFields.isUsageKnown)
        this.normalUsage  = this.page.locator('[name="usageElectricityHigh"]')
        this.offPeakUsage = this.page.locator('[name="usageElectricityLow"]')
        this.solarPanel   = this.solarPanel = this.page.getByRole("radio", { name: "Nee, ik wek zelf geen stroom" })
        this.isMoving     = this.page.getByLabel(input.formFields.moving)
     
    }

    async getHeaderText () {
        await this.header.waitFor({ state: 'visible', timeout: 60000})
        return await this.header.textContent()
    }
   
    async chooseEnergy (energy : string) {
        switch (energy.toLowerCase()) {
            case 'electricity':
                await this.electricity.click()
               break;
        }
    }
    
    async knowUsage (choose: string){
        if (choose.toLowerCase() === 'yes') {
           // await this.isUsageKnown.waitFor({state:'attached'})
            await this.isUsageKnown.click()
        }

    }

    async enterUsage(normalUsage: string, offPeakUsage: string) {
        await this.normalUsage.fill(normalUsage);
        await this.offPeakUsage.fill(offPeakUsage);
    }
     

    async chooseSolarOption(option: string) {
        switch (option.toLowerCase()) {
            case "no":
            case "nopanels":
                await this.solarPanel.click();
                break;
            default:
                throw new Error(`Invalid solar choice: ${option}`);
        }
    }

    async chooseMoving (move: string) {
        if (move.toLowerCase() === 'yes') {
            await this.isMoving.waitFor({state:'attached'})
            await this.isMoving.click()
        }
    }
}