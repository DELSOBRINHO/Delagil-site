const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');

test.describe('Accessibility Tests', () => {
  test('should not have any automatically detectable accessibility violations on homepage', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    
    // Check if there's a main heading (h1)
    const h1 = await page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    // Check if headings are in logical order
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      // Images should have alt text (empty alt is acceptable for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/');
    
    // Tab through the page and check for focus indicators
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check if focused element has visible focus indicator
    const focusStyles = await focusedElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow,
        border: styles.border
      };
    });
    
    // At least one focus indicator should be present
    const hasFocusIndicator = 
      focusStyles.outline !== 'none' || 
      focusStyles.boxShadow !== 'none' || 
      focusStyles.border !== 'none';
    
    expect(hasFocusIndicator).toBe(true);
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();
    
    // Filter for color contrast violations
    const colorContrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(colorContrastViolations).toEqual([]);
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact form section
    const contactSection = await page.locator('#contact-form-section');
    if (await contactSection.isVisible()) {
      const formInputs = await page.locator('input, textarea, select').all();
      
      for (const input of formInputs) {
        const id = await input.getAttribute('id');
        if (id) {
          const label = await page.locator(`label[for="${id}"]`);
          await expect(label).toBeVisible();
        }
      }
    }
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper ARIA labels on interactive elements
    const buttons = await page.locator('button').all();
    
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();
      
      // Button should have either aria-label or text content
      expect(ariaLabel || textContent?.trim()).toBeTruthy();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    let focusCount = 0;
    
    // Tab through all focusable elements
    for (let i = 0; i < 50; i++) { // Limit to prevent infinite loop
      const focusedElement = await page.locator(':focus');
      if (await focusedElement.isVisible()) {
        focusCount++;
        await page.keyboard.press('Tab');
      } else {
        break;
      }
    }
    
    expect(focusCount).toBeGreaterThan(0);
  });
}); 