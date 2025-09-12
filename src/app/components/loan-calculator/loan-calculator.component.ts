// loan-calculator.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createAction, createReducer, on, Store } from '@ngrx/store';
export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');

export const counterReducer = createReducer(
  0,
  on(increment, state => state + 1),
  on(decrement, state => state - 1)
);
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
  count$! : any;
  

  constructor(private fb: FormBuilder,private store : Store<{count:number}>) {
    this.count$ = this.store.select((state)=>state.count);
    this.loanForm = this.fb.group({
      amount: [500000],
      rate: [10],
      years: [10]
    });
  }

  onIncrement(){
    this.store.dispatch(increment());
  }
  onDecrement(){
    this.store.dispatch(decrement());
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
