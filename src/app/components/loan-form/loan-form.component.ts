import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { S3UploadService } from '../services/s3-upload.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-loan-form',
  standalone: true,
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
  imports: [
    MatStepperModule, MatInputModule, MatButtonModule, CommonModule, ReactiveFormsModule,
    HeaderComponent
]
})
export class LoanFormComponent {
  personalForm: FormGroup;
  incomeForm: FormGroup;
  loanForm: FormGroup;
  documentForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      fullName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required],
    });

    this.incomeForm = this.fb.group({
      occupation: ['', Validators.required],
      annualIncome: ['', Validators.required],
      employer: [''],      
    });

    this.loanForm = this.fb.group({
      loanType: ['', Validators.required],
      amount: ['', Validators.required],
      tenure: ['', Validators.required],
      interestRate: [''],
    });

    this.documentForm = this.fb.group({
      documents: [null, Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.documentForm.patchValue({ documents: this.selectedFiles });
  }

  async submitAll() {
    if (
      this.personalForm.invalid ||
      this.incomeForm.invalid ||
      this.loanForm.invalid ||
      this.documentForm.invalid
    ) {
      alert('Please complete all required fields.');
      return;
    }

    const loanData = {
      personalInfo: this.personalForm.value,
      incomeInfo: this.incomeForm.value,
      loanDetails: this.loanForm.value,
      documentForm : this.documentForm.value
    };

    try {
      // await this.s3Service.uploadLoanApplication(loanData, this.selectedFiles);
      alert('Loan application submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error submitting loan application.');
    }
  }
}
