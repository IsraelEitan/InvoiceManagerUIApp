import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  constructor(private location: Location) { }

  reloadPage() {
    this.location.back();
  }
}
