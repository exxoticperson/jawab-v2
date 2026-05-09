import asyncio
import csv
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        # Launch visible browser so you can verify it is not fake
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()
        
        cities = ["Dubai", "Abu Dhabi", "Sharjah"]
        all_leads = []
        
        for city in cities:
            print(f"[*] Starting scrape for dental clinics in {city}...")
            await page.goto(f"https://www.google.com/maps/search/dental+clinic+in+{city}")
            
            # Wait for the search results pane to populate
            await page.wait_for_selector('a[href*="https://www.google.com/maps/place"]', timeout=30000)
            
            # 1. Scroll repeatedly to load all cards in the sidebar
            print(f"[*] Scrolling results for {city} to load maximum clinics...")
            previous_count = 0
            scroll_attempts = 0
            
            while scroll_attempts < 10: 
                items = await page.locator('a[href*="https://www.google.com/maps/place"]').all()
                if len(items) > previous_count:
                    previous_count = len(items)
                    scroll_attempts = 0
                else:
                    scroll_attempts += 1
                
                # Execute javascript to push the scrollbar down
                await page.evaluate("""
                    let pane = document.querySelector('div[role="feed"]');
                    if(!pane) pane = document.querySelectorAll('div[aria-label^="Results for"]')[0];
                    if(pane) pane.scrollTop = pane.scrollHeight;
                """)
                await asyncio.sleep(2)
                
                # Check for absolute end of list
                if await page.locator('text="You\'ve reached the end of the list."').is_visible():
                    break

            # 2. Click deeply into every single loaded card to scrape the details pane
            links = await page.locator('a[href*="https://www.google.com/maps/place"]').element_handles()
            print(f"[*] Found {len(links)} clinics in {city}. Extracting deep data...")
            
            for index in range(len(links)):
                # Re-fetch handles to avoid stale DOM exceptions
                current_links = await page.locator('a[href*="https://www.google.com/maps/place"]').element_handles()
                if index >= len(current_links): break
                
                link = current_links[index]
                try:
                    await link.scroll_into_view_if_needed()
                    await link.click()
                    await page.wait_for_timeout(2000) # Wait for details pane to slide in
                    
                    # Exact DOM extractions
                    name_locator = page.locator('h1.DUwDvf')
                    name = await name_locator.inner_text() if await name_locator.count() > 0 else "Unknown Name"
                    
                    website_loc = page.locator('a[data-item-id="authority"]')
                    website = await website_loc.get_attribute('href') if await website_loc.count() > 0 else "No Website"
                    
                    phone_loc = page.locator('button[data-tooltip="Copy phone number"]')
                    phone = await phone_loc.get_attribute('aria-label') if await phone_loc.count() > 0 else "No Phone"
                    if phone != "No Phone": phone = phone.replace("Phone number: ", "").strip()
                    
                    rating_loc = page.locator('div.F7nice > span > span[aria-hidden="true"]').first
                    rating = await rating_loc.inner_text() if await rating_loc.count() > 0 else "N/A"
                    
                    print(f"  -> Scraped: {name} | Phone: {phone}")
                    all_leads.append({
                        "City": city,
                        "Clinic Name": name,
                        "Phone": phone,
                        "Website": website,
                        "Google Rating": rating
                    })
                except Exception as e:
                    print(f"  [!] Error parsing card {index}: continuing...")
                    continue

        # Export pure hard data
        output_filename = "02_Outreach_and_Data/03_MEGA_MAPS_SCRAPE.csv"
        with open(output_filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=["City", "Clinic Name", "Phone", "Website", "Google Rating"])
            writer.writeheader()
            writer.writerows(all_leads)
        
        print(f"\n[*] MEGA SCRAPE COMPLETE! Saved {len(all_leads)} fully enriched leads to {output_filename}")
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
