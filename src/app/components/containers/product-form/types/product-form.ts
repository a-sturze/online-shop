import { FormControl } from '@angular/forms';

export interface ProductFormValues {
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

export interface ProductFormType {
  name: FormControl<string>;
  category: FormControl<string>;
  image: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
}
