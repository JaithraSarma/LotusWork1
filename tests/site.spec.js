// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Page Load & Structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/LotusWork1/);
  });

  test('should display the main heading', async ({ page }) => {
    const heading = page.locator('#page-title');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Automated DevOps Pipeline');
  });

  test('should have a visible header with logo', async ({ page }) => {
    await expect(page.locator('#header')).toBeVisible();
    await expect(page.locator('#logo')).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have all navigation links', async ({ page }) => {
    await expect(page.locator('#nav-home')).toBeVisible();
    await expect(page.locator('#nav-about')).toBeVisible();
    await expect(page.locator('#nav-features')).toBeVisible();
    await expect(page.locator('#nav-contact')).toBeVisible();
  });
});

test.describe('Content Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the About section', async ({ page }) => {
    await expect(page.locator('#about-title')).toHaveText('About This Project');
  });

  test('should display the Features section with cards', async ({ page }) => {
    await expect(page.locator('#features-title')).toHaveText('Key Features');
    await expect(page.locator('#feature-ci')).toBeVisible();
    await expect(page.locator('#feature-testing')).toBeVisible();
    await expect(page.locator('#feature-deploy')).toBeVisible();
  });

  test('should display the footer', async ({ page }) => {
    await expect(page.locator('#footer')).toBeVisible();
  });
});

test.describe('Button Click Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show idle status text initially', async ({ page }) => {
    const status = page.locator('#status-text');
    await expect(status).toHaveText('Pipeline idle. Click the button to start.');
  });

  test('should update status text after clicking the action button', async ({ page }) => {
    const button = page.locator('#action-button');
    const status = page.locator('#status-text');

    await expect(button).toHaveText('Run Pipeline');
    await button.click();
    await expect(button).toHaveText('Running…');
    await expect(status).not.toHaveText('Pipeline idle. Click the button to start.');
  });

  test('should complete the pipeline and show success', async ({ page }) => {
    const button = page.locator('#action-button');
    const status = page.locator('#status-text');

    await button.click();

    await expect(status).toHaveText(
      '✅ All stages passed. Deployment successful!',
      { timeout: 10000 }
    );
    await expect(button).toHaveText('✓ Pipeline Complete');
  });
});
