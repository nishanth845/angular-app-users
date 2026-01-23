import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule, HeaderComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
