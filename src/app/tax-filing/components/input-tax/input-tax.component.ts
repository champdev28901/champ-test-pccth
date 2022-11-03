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
  saleAmount: number | any = null;
  taxAmount: number | any = null;
  monthNow: string | any;

  constructor(private taxService: TaxService, private router: Router) {
    let monthList = new Date().getMonth() + 1;
    this.monthNow = monthList.toString()
  }

  ngOnInit(): void {
    // this.initDateForm()
    this.formDate = new FormGroup({
      month: new FormControl(this.monthSelect[0].Value === this.monthNow ? this.monthSelect[1]: this.monthSelect[0]),
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

  onChangeformatnumber(data: any): void {
    if (data.target.value === '') {
      this.saleAmount = ''
      this.taxAmount = ''
    } else {
      this.saleAmount = String(parseFloat(String(data.target.value)).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      this.taxAmount = String(parseFloat(String(data.target.value * 0.07)).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }
  }

  onChangeTaxAmount(data: any): void {
    if (data.target.value === '') {
      this.saleAmount = ''
      this.taxAmount = ''
    } else {
      this.saleAmount = String(parseFloat(String(data.target.value / 0.07)).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      this.taxAmount = String(parseFloat(String(data.target.value)).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      // if (((Number(this.saleAmount) * 0.07) + 20 <= Number(data.target.value)) && ((Number(this.saleAmount) * 0.07) - 20 >= Number(data.target.value))) {
      //   this.saleAmount = String(parseFloat(String(data.target.value / 0.07)).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      //   this.taxAmount = String(parseFloat(String(data.target.value)).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      // } else {
      //   alert("ส่วนต่างมากกว่า 20");
      // }

    }
  }


  onChange(event: any): void {
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

  validateForm() {
    const typeNumber = Number(this.filingType);
    if (this.totalAmount && this.taxAmount && this.saleAmount && this.formDate.value && this.formTax.value && this.typeSelect[typeNumber]) {
      this.nextStep();
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  }

  validateBtn(): boolean {
    const typeNumber = Number(this.filingType);
    if (this.totalAmount && this.taxAmount && this.saleAmount && this.formDate.value && this.formTax.value && this.typeSelect[typeNumber]) {
      return false
    } else {
      return true
    }
  }

}
