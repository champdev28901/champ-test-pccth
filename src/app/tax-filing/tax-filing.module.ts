import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxFilingRoutingModule } from './tax-filing-routing.module';
import { TaxFilingComponent } from './tax-filing.component';
import { InputTaxComponent } from './components/input-tax/input-tax.component';
import { ReviewTaxComponent } from './components/review-tax/review-tax.component';
import { CommaPipe } from './pipe/comma.pipe';


@NgModule({
  declarations: [
    TaxFilingComponent,
    InputTaxComponent,
    ReviewTaxComponent,
    CommaPipe
  ],
  imports: [
    CommonModule,
    TaxFilingRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TaxFilingModule { }
