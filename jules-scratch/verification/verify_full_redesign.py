from playwright.sync_api import sync_playwright, Page, expect

def take_screenshot(page: Page, url: str, name: str):
    """Navigates to a URL and takes a screenshot."""
    print(f"Navigating to {url}...")
    page.goto(url)
    # Wait for the page to be in a stable state, e.g., wait for a key element.
    # For simplicity, we'll use a timeout, but waiting for an element is more robust.
    page.wait_for_timeout(2000)
    screenshot_path = f"jules-scratch/verification/{name}.png"
    page.screenshot(path=screenshot_path)
    print(f"Screenshot saved to {screenshot_path}")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Set a viewport size for consistent screenshots
        page.set_viewport_size({"width": 1280, "height": 800})

        # Pages to screenshot
        pages_to_capture = {
            "login": "http://localhost:3000/login",
            "career-events": "http://localhost:3000/career-events",
            "timeline": "http://localhost:3000/timeline",
        }

        for name, url in pages_to_capture.items():
            take_screenshot(page, url, name)

        browser.close()
    print("Verification script finished.")

if __name__ == "__main__":
    main()
