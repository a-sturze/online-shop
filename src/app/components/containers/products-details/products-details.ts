import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
} from '@angular/core';
import { ProductsDetailsView } from '../../presentational/products-details-view/products-details-view';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../presentational/delete-dialog/delete-dialog';
import { AuthService } from '../../../services/auth';
import { Role } from '../../../enums/role';

@Component({
  selector: 'app-products-details',
  imports: [ProductsDetailsView],
  templateUrl: './products-details.html',
  styleUrl: './products-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly productService = inject(ProductsService);
  private readonly authService = inject(AuthService);
  protected readonly productId = this.route.snapshot.paramMap.get('id') || '';
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  protected readonly isAdmin = computed<boolean>(() => {
    const user = this.authService.user();
    if (user && user.roles.includes(Role.Admin)) {
      return true;
    }
    return false;
  });

  constructor() {
    effect(() => {
      if (this.productService.hasError()) {
        this.snackBar.open('Could not load product', 'Close', { verticalPosition: 'top' });
      }
    });
  }
  ngOnInit() {
    this.productService.getProductDetails(this.productId);
  }

  deleteProduct() {
    this.productService
      .deleteProduct(this.productId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['/products']));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
      data: { product: this.productService.product()?.name || '' },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result !== undefined) {
          this.deleteProduct();
        }
      });
  }
}
