import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

interface AmortRow { month: number; principal: number; interest: number; balance: number; }

@Component({
  standalone : true,
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss'],
  imports: [ReactiveFormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule, HeaderComponent]
})
export class LoanCalculatorComponent implements OnInit {
  loanForm: FormGroup;
  emi: number | null = null;
  totalPayment = 0;
  totalInterest = 0;
  months = 0;
  amortization: AmortRow[] = [];
  sparkPoints: string | null = null;
  sparkWidth = 360;
  sparkHeight = 90;
  calculating = false;

  // simple counter for engagement demo
  private countSub = new BehaviorSubject<number>(0);
  count$ = this.countSub.asObservable();

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      amount: [100000, [Validators.required, Validators.min(1000)]],
      rate: [10, [Validators.required, Validators.min(0)]],
      years: [5, [Validators.required, Validators.min(0.1)]],
    });
  }

  ngOnInit(): void {
    // optional: react to changes and auto-calc after small debounce
    // but keep calculate on submit for clear UX
  }

  onIncrement() { this.countSub.next(this.countSub.value + 1); }
  onDecrement() { this.countSub.next(Math.max(0, this.countSub.value - 1)); }

  calculate(): void {
    if (this.loanForm.invalid) return;

    const P = Number(this.loanForm.value.amount);
    const annualRate = Number(this.loanForm.value.rate);
    const years = Number(this.loanForm.value.years);

    // visual "thinking" time to encourage user attention (keeps user engaged)
    this.calculating = true;
    this.emi = null;
    this.amortization = [];
    this.sparkPoints = null;

    // simulate CPU work / thoughtful UX delay (short)
    setTimeout(() => {
      const r = annualRate / 100 / 12; // monthly rate
      const n = Math.round(years * 12);
      this.months = n;

      let emiLocal = 0;
      if (r <= 0) {
        emiLocal = P / n;
      } else {
        const pow = Math.pow(1 + r, n);
        emiLocal = (P * r * pow) / (pow - 1);
      }

      // rounding to 2 decimals for usability (but keep accurate schedule)
      this.emi = Number((emiLocal).toFixed(2));
      this.totalPayment = Number((this.emi * n).toFixed(2));
      this.totalInterest = Number((this.totalPayment - P).toFixed(2));

      // amortization schedule
      let balance = P;
      const schedule: AmortRow[] = [];

      for (let i = 1; i <= n; i++) {
        const interestPayment = Number((balance * r).toFixed(10));
        let principalPayment = Number((this.emi - interestPayment).toFixed(10));

        // handle rounding last payment
        if (i === n) principalPayment = Number(balance.toFixed(10));

        balance = Number((balance - principalPayment).toFixed(10));
        if (balance < 0.001) balance = 0;

        schedule.push({
          month: i,
          principal: Number(principalPayment.toFixed(2)),
          interest: Number(interestPayment.toFixed(2)),
          balance: Number(balance.toFixed(2)),
        });
      }

      this.amortization = schedule;

      // generate sparkline points for SVG polyline
      this.sparkPoints = this.buildSparkline(schedule, this.sparkWidth, this.sparkHeight);

      this.calculating = false;
    }, 650); // 650ms delay — long enough for "focus" but still snappy
  }

  buildSparkline(schedule: AmortRow[], width: number, height: number): string {
    if (!schedule.length) return '';
    const points: string[] = [];
    const n = schedule.length;
    const maxBalance = schedule[0].balance || schedule[0].principal + schedule[0].interest;
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1 || 1)) * (width - 8) + 4; // padding
      const normalized = (schedule[i].balance) / (maxBalance || 1);
      const y = (1 - normalized) * (height - 8) + 4;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  }

  reset(): void {
    this.loanForm.reset({ amount: 100000, rate: 10, years: 5 });
    this.emi = null;
    this.totalPayment = 0;
    this.totalInterest = 0;
    this.months = 0;
    this.amortization = [];
    this.sparkPoints = null;
  }

  // download amortization schedule as CSV
  downloadSchedule(): void {
    if (!this.amortization.length) return;

    const headers = ['Month', 'Principal', 'Interest', 'Balance'];
    const rows = this.amortization.map(r => [r.month, r.principal.toFixed(2), r.interest.toFixed(2), r.balance.toFixed(2)]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', `amortization_${Date.now()}.csv`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
}
