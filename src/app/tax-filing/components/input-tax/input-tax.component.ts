import { month } from '../../const/month';
import { Component, OnInit } from '@angular/core';
import { year } from '../../const/year';
import { TaxService } from '../../service/tax.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  monthNow: string | any;

  constructor(private taxService: TaxService, private router: Router) {
    let monthList = new Date().getMonth() + 1;
    this.monthNow = monthList.toString()
  }

  ngOnInit(): void {
    // this.initDateForm()
    this.formDate = new FormGroup({
      month: new FormControl(this.monthSelect[0], [Validators.required]),
      year: new FormControl(this.yearSelect[0], [Validators.required]),
    });

    this.formTax = new FormGroup({
      saleAmount: new FormControl('', [Validators.required]),
      taxAmount: new FormControl('', [Validators.required]),
      surcharge: new FormControl(),
      penalty: new FormControl(200),
      totalAmount: new FormControl(),
    });
  }

  get f() {
    return this.formTax.controls;
  }

  get surcharge() {
    return Math.ceil((this.f.saleAmount.value * 0.1) / 0.05) * 0.05;
  }

  get value() {
    return this.f.saleAmount.value;
  }

  get totalAmount() {
    return Number(this.surcharge + this.f.taxAmount.value + 200);
  }

  // onChangeformatnumber(data: any): void {
  //   console.log(data.target.value);
  //   if (data.target.value === '') {
  //     this.saleAmount = ''
  //     this.taxAmount = ''
  //   } else {
  //     this.saleAmount = String(parseFloat(String(data.target.value)).toFixed(2))
  //     let formTaxAmount = String(parseFloat(String(data.target.value * 0.07)).toFixed(2))
  //     this.taxAmount = formTaxAmount.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  //   }
  // }

  formatNumber(event: any) {
    if (event.target.value) {
      const name = event.target.name;
      const changeNumber = String(
        parseFloat(String(event.target.value)).toFixed(2)
      );
      const commaAdded = changeNumber
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
        .toLocaleString();

      if (name === 'saleAmount') {
        const vatSet = String(
          parseFloat(String((event.target.value * 7) / 100)).toFixed(2)
        );
        this.formTax.patchValue({
          taxAmount: vatSet,
        });
      }

      const surchargeCalculator = String(
        parseFloat(String(this.f.taxAmount.value * 0.1)).toFixed(2)
      );
      const total =
        Number(this.f.taxAmount.value) + Number(surchargeCalculator) + 200;
      const totalAmountCalculator = String(
        parseFloat(String(total)).toFixed(2)
      );

      const penalty = String(parseFloat(String(this.f.penalty.value)).toFixed(2));

      console.log(Number(totalAmountCalculator), 'totalAmountCalculator');
      console.log(Number(surchargeCalculator), 'surchargeCalculator');
      console.log(penalty, 'this.f.penalty.value');

      this.formTax.patchValue({
        [name]: changeNumber,
        surcharge: surchargeCalculator,
        totalAmount: totalAmountCalculator,
        penalty: penalty
      });
    }
  }

  onChange(event: any): void {
    this.filingType = event.target.value;
  }

  validatorChecked() {}

  nextStep() {
    const typeNumber = Number(this.filingType);
    const stateDate = this.formDate.value;
    const stateTax = this.formTax.value;
    const type = this.typeSelect[typeNumber];
    this.taxService.taxSend(stateDate, stateTax, type);
    console.log(stateDate, 'stateDate');
    console.log(stateTax, 'stateTax');

    return this.router.navigate(['tax/review']);
  }

  backStep() {
    this.filingType = '0';
  }
  validateForm() {
    if (this.formTax.valid) {
      this.nextStep();
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  }
  validateBtn(): boolean {
    const typeNumber = Number(this.filingType);
    if (this.formTax.value.penalty && this.formTax.value.saleAmount && this.formTax.value.surcharge && this.formTax.value.taxAmount && this.formTax.value.totalAmount) {
      return false
    } else {
      return true
    }
  }

}
