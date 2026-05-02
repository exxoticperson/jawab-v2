import asyncio
from playwright.async_api import async_playwright
import csv
import time

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False) # Keep true if you don't want to see it run
        page = await browser.new_page()
        
        print("[Jawab-Leads Agent] Navigating to Google Maps...")
        await page.goto("https://www.google.com/maps", timeout=60000)
        
        search_query = "dental clinic in UAE"
        await page.fill('input#searchboxinput', search_query)
        await page.press('input#searchboxinput', 'Enter')
        
        print(f"[Jawab-Leads Agent] Searching for: {search_query}")
        await page.wait_for_selector('a[href*="https://www.google.com/maps/place"]', timeout=30000)
        
        leads = set()
        results = []
        
        # Scroll the left pane to load more results
        # In Google Maps, the list of places is in a specific div
        # We find elements that have role="feed" or similar.
        print("[Jawab-Leads Agent] Beginning mass extraction. Scrolling...")
        
        try:
            scrollable_div_handle = await page.wait_for_selector('div[role="feed"]', timeout=10000)
        except:
            scrollable_div_handle = await page.wait_for_selector('div[aria-label^="Results for"]', timeout=10000)

        target_leads = 100  # Start with 100 for today, change to 1000 for full scrape
        
        while len(results) < target_leads:
            # Extract current items
            items = await page.query_selector_all('a[href*="https://www.google.com/maps/place"]')
            
            for item in items:
                url = await item.get_attribute('href')
                name = await item.get_attribute('aria-label')
                if url and name and url not in leads:
                    leads.add(url)
                    results.append({"name": name, "maps_url": url})
                    print(f"[{len(results)}] Found: {name}")
                
            if len(results) >= target_leads:
                break
                
            # Scroll down
            await scrollable_div_handle.evaluate('(el) => el.scrollTop = el.scrollHeight')
            await asyncio.sleep(2) # wait for network load
            
            # Check if "You've reached the end of the list." is visible
            end_of_list = await page.query_selector('text="You\'ve reached the end of the list."')
            if end_of_list:
                print("[Jawab-Leads Agent] Reached the end of Google Maps results.")
                break
                
        print(f"[Jawab-Leads Agent] Extraction complete. Found {len(results)} clinics.")
        
        # Save to CSV
        output_file = "mass_leads_scrape_output.csv"
        with open(output_file, mode='w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=["name", "maps_url"])
            writer.writeheader()
            writer.writerows(results)
            
        print(f"[Jawab-Leads Agent] Saved to {output_file}. Next step: Enrich with Apify for IG/WhatsApp.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
