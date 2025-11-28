import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loader',
  imports: [MatIconModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader {}
