import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from './shared/ui/header/header.component';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {
  title = 'front_crud';
}
