import { Component, OnInit } from '@angular/core';
import { taxData } from '../../model/tax-data';
import { TaxService } from '../../service/tax.service';

@Component({
  selector: 'app-review-tax',
  templateUrl: './review-tax.component.html',
  styleUrls: ['./review-tax.component.scss'],
})
export class ReviewTaxComponent implements OnInit {
  dataSet: any;
  constructor(private taxService: TaxService) {}

  ngOnInit(): void {
    this.check();
  }

  check() {
    this.dataSet = this.taxService.taxGet();
  }

  getJson() {
    alert(JSON.stringify(this.dataSet , null, 4));

  }

}
