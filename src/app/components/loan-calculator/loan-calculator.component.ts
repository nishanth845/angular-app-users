// loan-calculator.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent {
  loanForm: FormGroup;
  emi: number | null = null;
  totalPayment: number | null = null;
  totalInterest: number | null = null;

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      amount: [500000],
      rate: [10],
      years: [10]
    });
  }

  calculate() {
    const { amount, rate, years } = this.loanForm.value;

    const P = amount;
    const R = rate / 12 / 100;
    const N = years * 12;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    this.emi = Math.round(emi);
    this.totalPayment = Math.round(emi * N);
    this.totalInterest = Math.round((emi * N) - P);
  }
}
