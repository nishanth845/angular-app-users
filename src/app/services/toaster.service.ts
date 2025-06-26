import { inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _snackBar = inject(MatSnackBar);
  constructor() { }

  showMessage(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000,verticalPosition: 'top'
    });
  }
}
