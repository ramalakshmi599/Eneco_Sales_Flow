import {Page} from "@playwright/test";

export async function clickNextPage(page:Page) {
    const nextButton = page.getByRole('button', { name: 'Volgende' })
     await nextButton.waitFor({state:'attached'})
     await nextButton.click()
 }  