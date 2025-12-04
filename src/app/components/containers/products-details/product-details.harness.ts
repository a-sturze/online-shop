import { ComponentHarness } from '@angular/cdk/testing';
import { ProductDetailsViewHarness } from '../../presentational/products-details-view/product-details-view.harness';

export class ProductDetailsHarness extends ComponentHarness {
  static hostSelector = 'app-products-details';
  private readonly _getProduct = this.locatorFor(ProductDetailsViewHarness);

  async hasLoader(): Promise<boolean> {
    const loaderElement = await this.locatorForOptional('[data-testid="loader"')();
    return !!loaderElement;
  }

  async deleteProduct(): Promise<void> {
    return (await this._getProduct()).delete();
  }

  async getProduct(): Promise<string> {
    return (await this._getProduct()).getProductName();
  }
}
