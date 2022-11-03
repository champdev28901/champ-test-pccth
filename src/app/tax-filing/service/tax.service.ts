import { TypeFilter } from './../const/type-fillter.enum';
import { Injectable } from '@angular/core';
import { Date, Tax, taxData } from '../model/tax-data';

@Injectable({
  providedIn: 'root',
})
export class TaxService {
  constructor() {}
  taxJson?: taxData;
  readonly typeFilter = TypeFilter

  taxSend(stateDate: Date, stateTax: Tax, type: any): void {
    let taxString = {}
    if (this.typeFilter.Ordinary_Filing === type) {
      taxString = {
        month: stateDate.month.Text,
        year: stateDate.year,
        filingType: type,
        saleAmount: stateTax.saleAmount,
        taxAmount: stateTax.taxAmount,
      };
    } else {
       taxString = {
        month: stateDate.month.Text,
        year: stateDate.year,
        filingType: type,
        saleAmount: stateTax.saleAmount,
        taxAmount: stateTax.taxAmount,
        surcharge: stateTax.surcharge,
        penalty: stateTax.penalty,
        totalAmount: stateTax.penalty,
      };
    }
    this.taxJson = taxString;
  }

  taxGet() {
    if (this.taxJson) {
      return this.taxJson;
    } else {
      return null;
    }
  }
}
