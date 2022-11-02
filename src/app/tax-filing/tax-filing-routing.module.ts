import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputTaxComponent } from './components/input-tax/input-tax.component';
import { ReviewTaxComponent } from './components/review-tax/review-tax.component';
import { TaxFilingComponent } from './tax-filing.component';

const routes: Routes = [{ 
  path: '', component: TaxFilingComponent,
  children: [
    { path: '', redirectTo: 'input', pathMatch: 'full' },
    {
      path: 'input',
      component: InputTaxComponent,
    },
    {
      path: 'review',
      component: ReviewTaxComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxFilingRoutingModule { }
