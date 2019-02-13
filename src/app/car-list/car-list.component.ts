import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CarData, CarService, CarBrandListData } from '../shared';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  public carList: CarBrandListData[];
  public selectedFilter: string;
  public filterList: string[];

  private selectedCarsForComparation: CarData[];

  constructor(
    private carService: CarService
    , private router: Router
  ) { }

  public ngOnInit(): void {
    this.selectedFilter = "";
    this.filterList = [];
    this.selectedCarsForComparation = [];
    this.loadCarList();
  }

  public filterChange(filter: string): void {
    this.selectedFilter = filter;
    this.loadCarList();
  }

  public onViewDetails(carId: number): void {
    this.router.navigate([`cardetails/${carId}`]);
  }

  public compare(): void {
    this.router.navigate(["comparison"]);
  }

  private loadCarList(): void {
    this.carService.getCarList(this.selectedFilter, (res: CarBrandListData[]) => {
      if (this.filterList.length === 0) {
        this.filterList = res.map((carBrand) => {
          return carBrand.brand;
        });
      }
      this.carList = res;
    });
  }
}
