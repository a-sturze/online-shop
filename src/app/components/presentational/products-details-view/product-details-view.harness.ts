import { ComponentHarness } from '@angular/cdk/testing';

export class ProductDetailsViewHarness extends ComponentHarness {
  static hostSelector = 'app-products-details-view';

  async getProductName(): Promise<string> {
    const nameElement = await this.locatorFor('[data-testid="product-name"]')();
    return nameElement.text();
  }

  async getProductTitle(): Promise<string> {
    const titleElement = await this.locatorFor('[data-testid="product-title"]')();
    return titleElement.text();
  }

  async getProductDescription(): Promise<string> {
    const descriptionElement = await this.locatorFor('[data-testid="product-description"]')();
    return descriptionElement.text();
  }

  async getProductCategory(): Promise<string> {
    const categoryElement = await this.locatorFor('[data-testid="product-category"]')();
    return categoryElement.text();
  }

  async getProductPrice(): Promise<string> {
    const priceElement = await this.locatorFor('[data-testid="product-price"]')();
    return priceElement.text();
  }

  async getEditBtn(): Promise<string | undefined> {
    const editElement = await this.locatorForOptional('[data-testid="product-edit-btn"]')();
    return editElement ? editElement.text() : undefined;
  }

  async edit(): Promise<void> {
    const editElement = await this.locatorForOptional('[data-testid="product-edit-btn"]')();
    return editElement?.click();
  }

  async delete(): Promise<void> {
    const deleteElement = await this.locatorForOptional('[data-testid="product-delete-btn"]')();
    return deleteElement?.click();
  }
}
