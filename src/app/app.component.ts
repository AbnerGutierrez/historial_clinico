import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from './shared/ui/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {
  title = 'front_crud';
}
