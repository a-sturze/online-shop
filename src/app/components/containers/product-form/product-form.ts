import { Component, DestroyRef, effect, inject } from '@angular/core';
import { ProductFormView } from '../../presentational/product-form-view/product-form-view';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-form',
  imports: [ProductFormView],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly productService = inject(ProductsService);
  protected productId = this.route.snapshot.paramMap.get('id');
  protected mode = this.productId ? 'edit' : 'add';

  protected readonly productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor() {
    effect(() => {
      if (this.productService.hasError()) {
        this._snackBar.open('Could not load product', 'Close', { verticalPosition: 'top' });
      }
    });

    effect(() => {
      if (this.mode === 'edit' && this.productId) {
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
    if (this.mode === 'edit' && this.productId)
      this.productService.getProductDetails(this.productId);
  }

  saveProduct() {
    if (!this.productForm.valid) {
      this._snackBar.open('The information entered is not correct', 'Close', {
        verticalPosition: 'top',
      });
      return;
    }
    if (this.mode === 'edit' && this.productId) {
      const newProduct = { id: this.productId, ...this.productForm.value };
      this.productService
        .editProduct(newProduct)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.router.navigate([`/products/details/${this.productId}`]);
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
    if (this.mode === 'edit' && this.productId) {
      this.router.navigate([`/products/details/${this.productId}`]);
    } else {
      this.router.navigate(['/products']);
    }
  }
}
