import { defineConfig } from '@playwright/test';

export default defineConfig({
    
    testDir: './tests', 
    testMatch: '**/*.spec.ts', 
    timeout:60000,
    retries:2,
    use: {
        baseURL: 'https://www.eneco.nl/',
        headless: false,
        viewport: { width: 1280, height: 720 }, 
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        screenshot: "on",
        video : "off",
    },
    
        projects : [
            {
               name : "Chromium",
               use:  {browserName: "chromium"},
            },
        
        ],
    }

);
