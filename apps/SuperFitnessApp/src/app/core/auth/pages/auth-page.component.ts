import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegesterComponent } from "./components/Regester/Regester.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {}
