import asyncio
from playwright.async_api import async_playwright
import csv

async def main():
    print("[Jawab-Leads Agent] Initializing Mass Lead Extraction...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        
        print("[Jawab-Leads Agent] Navigating to Google Maps...")
        await page.goto("https://www.google.com/maps")
        
        search_query = "dental clinic Dubai"
        await page.fill('input#searchboxinput', search_query)
        await page.press('input#searchboxinput', 'Enter')
        
        print(f"[Jawab-Leads Agent] Searching for: {search_query}")
        await page.wait_for_selector('a[href*="https://www.google.com/maps/place"]', timeout=30000)
        
        leads = set()
        results = []
        
        try:
            scroll_div = await page.wait_for_selector('div[role="feed"]', timeout=10000)
        except:
            scroll_div = await page.wait_for_selector('div[aria-label^="Results for"]', timeout=10000)

        target_leads = 200 # Target for the first mass batch
        
        while len(results) < target_leads:
            items = await page.query_selector_all('a[href*="https://www.google.com/maps/place"]')
            for item in items:
                url = await item.get_attribute('href')
                name = await item.get_attribute('aria-label')
                if url and name and url not in leads:
                    leads.add(url)
                    results.append({"Clinic Name": name, "Maps URL": url})
                    print(f"[{len(results)}] Extracted: {name}")
                
            if len(results) >= target_leads:
                break
                
            await scroll_div.evaluate('(el) => el.scrollTop = el.scrollHeight')
            await asyncio.sleep(2)
                
        print(f"[Jawab-Leads Agent] Done. Found {len(results)} clinics.")
        
        with open("mass_leads_scrape.csv", mode='w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=["Clinic Name", "Maps URL"])
            writer.writeheader()
            writer.writerows(results)
            
        print(f"[Jawab-Leads Agent] Saved to mass_leads_scrape.csv")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
