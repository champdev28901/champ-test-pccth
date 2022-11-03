import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { taxData } from '../../model/tax-data';
import { TaxService } from '../../service/tax.service';

@Component({
  selector: 'app-review-tax',
  templateUrl: './review-tax.component.html',
  styleUrls: ['./review-tax.component.scss'],
})
export class ReviewTaxComponent implements OnInit, AfterViewInit {
  dataSet: taxData | any;
  constructor(private taxService: TaxService, private router: Router) {}

  ngOnInit(): void {
    this.dataInit();
  }

  dataInit() {
    return (this.dataSet = this.taxService.taxGet());
  }

  onCheck() {
    if (!this.dataSet) this.router.navigate(['tax/input']);    
  }

  ngAfterViewInit(): void {
    this.onCheck();
  }

  getJson() {
    alert(JSON.stringify(this.dataSet, null, 4));
  }
}
