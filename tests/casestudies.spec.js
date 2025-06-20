const { test, expect } = require('@playwright/test');

test.describe('Case Studies Pages', () => {
  test('should display case studies list page', async ({ page }) => {
    await page.goto('/cases-de-sucesso');
    
    // Check if page loads correctly
    await expect(page.locator('h1')).toContainText('Nossos Cases de Sucesso');
    
    // Check if case study cards are displayed
    const cards = page.locator('[data-testid="case-study-card"]');
    await expect(cards).toHaveCount(5); // We have 5 mock cases
    
    // Check if first card has correct content
    const firstCard = cards.first();
    await expect(firstCard.locator('h3')).toContainText('Aumento de 400%');
    await expect(firstCard.locator('img')).toBeVisible();
  });

  test('should navigate to case study detail page', async ({ page }) => {
    await page.goto('/cases-de-sucesso');
    
    // Click on first case study card
    const firstCard = page.locator('[data-testid="case-study-card"]').first();
    await firstCard.click();
    
    // Should navigate to detail page
    await expect(page).toHaveURL(/\/cases-de-sucesso\/aumento-de-conversoes-para-e-commerce-de-moda/);
    
    // Check if detail page content is displayed
    await expect(page.locator('h1')).toContainText('Aumento de 400%');
    await expect(page.locator('text=O Desafio')).toBeVisible();
    await expect(page.locator('text=Nossa Solução')).toBeVisible();
    await expect(page.locator('text=Resultados')).toBeVisible();
  });

  test('should display case study detail page with all sections', async ({ page }) => {
    await page.goto('/cases-de-sucesso/aumento-de-conversoes-para-e-commerce-de-moda');
    
    // Check all main sections
    await expect(page.locator('text=O Desafio')).toBeVisible();
    await expect(page.locator('text=Nossa Solução')).toBeVisible();
    await expect(page.locator('text=Resultados')).toBeVisible();
    await expect(page.locator('text=Tecnologias Utilizadas')).toBeVisible();
    
    // Check if results are displayed as list items
    const results = page.locator('text=Aumento de 400% na taxa de conversão');
    await expect(results).toBeVisible();
    
    // Check if technologies are displayed
    const technologies = page.locator('text=Google Analytics');
    await expect(technologies).toBeVisible();
    
    // Check if testimonial is displayed
    const testimonial = page.locator('text=A parceria com a Delagil');
    await expect(testimonial).toBeVisible();
  });

  test('should handle 404 for non-existent case study', async ({ page }) => {
    await page.goto('/cases-de-sucesso/case-inexistente');
    
    // Should show 404 page
    await expect(page.locator('text=Página não encontrada')).toBeVisible();
  });

  test('should have proper SEO meta tags on list page', async ({ page }) => {
    await page.goto('/cases-de-sucesso');
    
    // Check title
    await expect(page).toHaveTitle(/Cases de Sucesso/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Explore nossos cases de sucesso/);
  });

  test('should have proper SEO meta tags on detail page', async ({ page }) => {
    await page.goto('/cases-de-sucesso/aumento-de-conversoes-para-e-commerce-de-moda');
    
    // Check title
    await expect(page).toHaveTitle(/Aumento de 400%/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /O cliente enfrentava baixas taxas/);
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/cases-de-sucesso');
    
    // Check if page has proper heading structure
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Check if images have alt text
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check if links are keyboard navigable
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should filter case studies by category', async ({ page }) => {
    await page.goto('/cases-de-sucesso');
    
    // Select "Marketing Digital" category
    const categorySelect = page.locator('select');
    await categorySelect.selectOption('Marketing Digital');
    
    // Should show only marketing digital cases
    const cards = page.locator('[data-testid="case-study-card"]');
    await expect(cards).toHaveCount(1);
    
    // Check if the filtered card is correct
    await expect(cards.first().locator('h3')).toContainText('Aumento de 400%');
  });

  test('should search case studies by text', async ({ page }) => {
    await page.goto('/cases-de-sucesso');
    
    // Search for "FashionNow"
    const searchInput = page.locator('input[type="text"]');
    await searchInput.fill('FashionNow');
    
    // Should show only cases containing "FashionNow"
    const cards = page.locator('[data-testid="case-study-card"]');
    await expect(cards).toHaveCount(1);
    
    // Check if the search result is correct
    await expect(cards.first().locator('h3')).toContainText('Aumento de 400%');
  });

  test('should clear filters', async ({ page }) => {
    await page.goto('/cases-de-sucesso');
    
    // Apply a filter
    const categorySelect = page.locator('select');
    await categorySelect.selectOption('Marketing Digital');
    
    // Should show filtered results
    let cards = page.locator('[data-testid="case-study-card"]');
    await expect(cards).toHaveCount(1);
    
    // Clear filters
    const clearButton = page.locator('button:has-text("Limpar Filtros")');
    await clearButton.click();
    
    // Should show all cases again
    cards = page.locator('[data-testid="case-study-card"]');
    await expect(cards).toHaveCount(5);
  });

  test('should show no results message when no matches found', async ({ page }) => {
    await page.goto('/cases-de-sucesso');
    
    // Search for something that doesn't exist
    const searchInput = page.locator('input[type="text"]');
    await searchInput.fill('xyz123nonexistent');
    
    // Should show no results message
    await expect(page.locator('text=Nenhum case encontrado')).toBeVisible();
    await expect(page.locator('text=Tente ajustar os filtros')).toBeVisible();
  });

  test('should display active filters', async ({ page }) => {
    await page.goto('/cases-de-sucesso');
    
    // Apply a filter
    const categorySelect = page.locator('select');
    await categorySelect.selectOption('Marketing Digital');
    
    // Should show active filter tag
    await expect(page.locator('text=Categoria: Marketing Digital')).toBeVisible();
    
    // Apply search
    const searchInput = page.locator('input[type="text"]');
    await searchInput.fill('test');
    
    // Should show both filter tags
    await expect(page.locator('text=Busca: "test"')).toBeVisible();
    await expect(page.locator('text=Categoria: Marketing Digital')).toBeVisible();
  });

  test('should remove individual filters', async ({ page }) => {
    await page.goto('/cases-de-sucesso');
    
    // Apply multiple filters
    const categorySelect = page.locator('select');
    await categorySelect.selectOption('Marketing Digital');
    
    const searchInput = page.locator('input[type="text"]');
    await searchInput.fill('test');
    
    // Remove search filter
    const searchFilterTag = page.locator('text=Busca: "test" button');
    await searchFilterTag.click();
    
    // Should only show category filter
    await expect(page.locator('text=Categoria: Marketing Digital')).toBeVisible();
    await expect(page.locator('text=Busca: "test"')).not.toBeVisible();
  });
}); 