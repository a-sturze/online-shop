import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ProductFormView } from '../../presentational/product-form-view/product-form-view';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { FormMode } from './enums/product-form.enum';
import { createProductForm } from './utils/product-form.utils';
import { ProductsFacade } from '../../../state/products/products.facade';

@Component({
  selector: 'app-product-form',
  imports: [ProductFormView],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  protected readonly productsFacade = inject(ProductsFacade);

  protected readonly productId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id'))));
  protected readonly mode = computed(() => (this.productId() ? FormMode.Edit : FormMode.Add));
  protected readonly title = computed(() =>
    this.mode() === FormMode.Edit
      ? `Edit  ${this.productsFacade.currentProduct()?.name}`
      : 'Add Product'
  );

  protected readonly productForm: FormGroup = createProductForm();

  constructor() {
    this.productsFacade.error$
      .pipe(
        takeUntilDestroyed(),
        filter((error) => !!error)
      )
      .subscribe(() =>
        this.snackBar.open('Could not load product', 'Close', { verticalPosition: 'top' })
      );

    effect(() => {
      if (this.mode() === FormMode.Edit && this.productId()) {
        const product = this.productsFacade.currentProduct();
        if (product) {
          this.productForm.patchValue({
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            description: product.description,
          });
        }
      }
    });
  }

  ngOnInit() {
    const productId = this.productId();
    if (this.mode() === FormMode.Edit && productId)
      this.productsFacade.loadProductDetails(productId);
  }

  saveProduct() {
    if (!this.productForm.valid) {
      this.snackBar.open('The information entered is not correct', 'Close', {
        verticalPosition: 'top',
      });
      return;
    }
    if (this.mode() === FormMode.Edit && this.productId()) {
      const newProduct = { id: this.productId(), ...this.productForm.value };
      this.productsFacade.editProduct(newProduct);
    } else {
      this.productsFacade.createProduct(this.productForm.value);
    }
  }

  handleCancel() {
    if (this.mode() === FormMode.Edit && this.productId()) {
      this.router.navigate([`/products/details/${this.productId()}`]);
    } else {
      this.router.navigate(['/products']);
    }
  }
}
