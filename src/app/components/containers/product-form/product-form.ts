import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
} from '@angular/core';
import { ProductFormView } from '../../presentational/product-form-view/product-form-view';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products';
import { FormGroup } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { createProductForm, FormMode } from './utils/form.utils';

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
  private readonly destroyRef = inject(DestroyRef);

  protected readonly productService = inject(ProductsService);
  protected readonly productId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id'))));
  protected readonly mode = computed(() => (this.productId() ? FormMode.Edit : FormMode.Add));
  protected readonly title = computed(() =>
    this.mode() === FormMode.Edit ? `Edit  ${this.productService.product()?.name}` : 'Add Product'
  );

  protected readonly productForm: FormGroup = createProductForm();

  constructor() {
    effect(() => {
      if (this.productService.hasError()) {
        this.snackBar.open('Could not load product', 'Close', { verticalPosition: 'top' });
      }
    });

    effect(() => {
      if (this.mode() === FormMode.Edit && this.productId()) {
        const product = this.productService.product();
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
      this.productService.getProductDetails(productId);
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
      this.productService
        .editProduct(newProduct)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.router.navigate([`/products/details/${this.productId()}`]);
        });
    } else {
      this.productService
        .createProduct(this.productForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.router.navigate(['/products']);
        });
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
