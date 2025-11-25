import { FormControl, FormGroup, Validators } from '@angular/forms';

export enum FormMode {
  Edit = 'edit',
  Add = 'add',
}

interface ProductFormValues {
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

interface ProductFormType {
  name: FormControl<string>;
  category: FormControl<string>;
  image: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
}

const productFormDefaults: ProductFormValues = {
  name: '',
  category: '',
  image: '',
  price: 1,
  description: '',
};

export function createProductForm(
  values: Partial<ProductFormValues> = productFormDefaults
): FormGroup<ProductFormType> {
  return new FormGroup<ProductFormType>({
    name: new FormControl<string>(values.name || productFormDefaults.name, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    category: new FormControl<string>(values.category || productFormDefaults.category, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl<number>(values.price || productFormDefaults.price, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')],
    }),
    image: new FormControl<string>(values.image || productFormDefaults.image, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl(values.description || productFormDefaults.description, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
