import {Locator, Page} from "@playwright/test";
import { input } from "../utils/input";

export class CustomerDataPage {
    readonly page:Page

    private addressCheck     : Locator
    private chooseSalutation : Locator
    private firstName        : Locator
    private lastName         : Locator
    private initials         : Locator
    private birthDate        : Locator
    private birthMonth       : Locator
    private birthYear        : Locator
    private phoneNumber      : Locator
    private email            : Locator
    private checkOrder       : Locator
    private lastPageTitle    : Locator

    constructor (page: Page) {
        this.page = page;
        this.addressCheck     = this.page.getByLabel('Ja')
        this.chooseSalutation = this.page.getByLabel(input.formFields.gender)
        this.firstName        = this.page.locator('[name="firstName"]')
        this.initials         = this.page.locator('[name="initials"]')
        this.lastName         = this.page.locator('[name="surname"]')
        this.birthDate        = this.page.locator('[name="day"]')
        this.birthMonth       = this.page.locator('[name="month"]')
        this.birthYear        = this.page.locator('[name="year"]')
        this.phoneNumber      = this.page.locator('[name="phoneNumber"]')
        this.email            = this.page.locator('[name="emailAddress"]')
        this.checkOrder       = this.page.locator('[data-label="Controleer je bestelling"]')
        this.lastPageTitle    = this.page.locator("h1")
    }

        async chooseAddressCheck (address: string) {
            if (address.toLowerCase() === 'yes') {
                await this.addressCheck.waitFor({state:'attached'})
                await this.addressCheck.click()
            }
        }
    
        async selectGender (gender: string) {
            if (gender.toLowerCase() === 'female') {
                await this.chooseSalutation.waitFor({state:'attached'})
                await this.chooseSalutation.check()
            }
        }
    
        async enterFirstName (data : string) {
            await this.firstName.fill(data)
        }
        async enterLastName (data : string) {
            await this.lastName.fill(data)
        }
        async enterInitials (data : string) {
            await this.initials.fill(data)
        }
        async enterBirthDate (data : string) {
            await this.birthDate.fill(data)
        }
        async enterBirthMonth (data : string) {
            await this.birthMonth.fill(data)
        }
        async enterBirthYear (data : string) {
            await this.birthYear.fill(data)
        }
       
        async enterPhoneNumber (data: string) {
            await this.phoneNumber.fill(data)
        }

        async enterEmail (data: string) {
            await this.email.fill(data)
        }
        async checkOrderButton () {
            await this.checkOrder.click()
        }

        async checkLastPageTitle () {
            await this.lastPageTitle.waitFor({ state: 'visible', timeout: 60000})
            return await this.lastPageTitle.textContent()
        }
}