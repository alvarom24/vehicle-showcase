import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { CarService, CarData } from '../shared';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {
  public carData: CarData;
  public isShowingCar: boolean;
  public selectedPhoto: string;

  private carId: number;
  private urlSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.isShowingCar =false;
    this.initUrlSubscription();
  }

  public changeSelectedPhoto(photo: string): void {
    this.selectedPhoto = photo;
  }

  public returnToList(): void {
    this.router.navigate(['list']);
  }

  private initUrlSubscription(): void {
    this.urlSubscription = this.route.params.subscribe((params: Array<string>) => {
      if (params["carId"]) {
        this.carId = parseInt(params["carId"]);
      }
      this.loadCarData();
    });
  }

  private loadCarData(): void {
    this.carService.getCarById(this.carId, (res: CarData) => {
      this.carData = res;
      this.selectedPhoto = this.carData.photo;
      this.isShowingCar =  true;
    });
  }
}
