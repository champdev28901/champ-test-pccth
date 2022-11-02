import { month } from '../../const/month';
import { Component, OnInit } from '@angular/core';
import { year } from '../../const/year';
import { TaxService } from '../../service/tax.service';
import { FormControl, FormGroup } from '@angular/forms';
import { formatNumber } from '@angular/common';
import { Router } from '@angular/router';
import { type } from '../../const/type';

@Component({
  selector: 'app-input-tax',
  templateUrl: './input-tax.component.html',
  styleUrls: ['./input-tax.component.scss'],
})
export class InputTaxComponent implements OnInit {
  formDate!: FormGroup;
  formTax!: FormGroup;
  formTaxStep!: FormGroup;
  ordinaryChecked: any;
  additionalChecked: any;
  filingType: string = '0';
  monthSelect = month;
  yearSelect = year;
  typeSelect = type;

  constructor(private taxService: TaxService, private router: Router) {}

  ngOnInit(): void {
    // this.initDateForm()
    this.formDate = new FormGroup({
      month: new FormControl(this.monthSelect[0]),
      year: new FormControl(this.yearSelect[0]),
    });

    this.formTax = new FormGroup({
      saleAmount: new FormControl(),
      taxAmount: new FormControl(),
      surcharge: new FormControl(),
      penalty: new FormControl(),
      totalAmount: new FormControl(),
    });
  }

  get f() {
    return this.formTax.controls;
  }

  get surcharge() {
    return Math.ceil((this.f.saleAmount.value * 0.1) / 0.05) * 0.05;
  }

  get totalAmount() {
    return this.surcharge + this.f.taxAmount.value + 200;
  }


  onChange(event: any): void {
    console.log(event.target.value);
    this.filingType = event.target.value;
  }

  nextStep() {
    const typeNumber = Number(this.filingType);
    const stateDate = this.formDate.value;
    const stateTax = this.formTax.value;
    const type = this.typeSelect[typeNumber];
    console.log(type);
    if (type) this.taxService.taxSend(stateDate, stateTax, type);
    return this.router.navigate(['tax/review']);
  }

  backStep() {
    this.filingType = '0';
  }
}
