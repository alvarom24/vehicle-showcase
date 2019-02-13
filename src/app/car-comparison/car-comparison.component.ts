import { Component, OnInit } from '@angular/core';

import { CarService, CarBrandListData, CarData } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-comparison',
  templateUrl: './car-comparison.component.html',
  styleUrls: ['./car-comparison.component.scss']
})
export class CarComparisonComponent implements OnInit {
  public carList: CarBrandListData[];
  public selectedFilter: string;
  public filterList: string[];
  public listToCompare: CarData[];
  public isReadyToCompare: boolean;

  constructor(
    private carService: CarService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.filterList = [];
    this.carList = [];
    this.selectedFilter = "";
    this.listToCompare = [];
    this.loadCarList();
  }

  public filterChange(filter: string): void {
    this.selectedFilter = filter;
    this.loadCarList();
  }

  public allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  public onDragStart(event: DragEvent, car: CarData): void {
    event.dataTransfer.setData("carId", car.id.toString());
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    const carId = parseInt(event.dataTransfer.getData("carId"));
    const foundCar = this.listToCompare.find(car => car.id === carId);
    if (foundCar) {
      alert("The car is already added for comparison");
      return;
    }
    if (this.listToCompare.length === 3) {
      alert("You chose the maximum number of cars to compare");
      return;
    }
    this.carService.getCarById(carId, (res: CarData) => {
      this.listToCompare.push(res);
      if (this.listToCompare.length === 3) {
        this.isReadyToCompare = true;
      }
    });
  }

  public onReturnCar(event: DragEvent): void {
    event.preventDefault();
    const carId = parseInt(event.dataTransfer.getData("carId"));
    const carIndex = this.listToCompare.findIndex(car => car.id === carId);
    this.listToCompare.splice(carIndex, 1);
  }

  public returnToList(): void {
    this.router.navigate(['list']);
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
