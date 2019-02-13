import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CarData, CarBrandListData } from '../models';

@Injectable()
export class CarService {

    private carDataUrl = './assets/data/car.data.json';

    constructor(
        private httpClient: HttpClient
    ) { }

    public getCarList(filter: string, callback: (res: CarBrandListData[]) => void): void {
        this.httpClient.get(this.carDataUrl).pipe().subscribe((res: CarData[]) => {
            callback(
                filter !== ""
                    ? this.filterBrandData(res).filter(c => c.brand === filter)
                    : this.filterBrandData(res)
            );
        });
    }

    public getCarById(carId: number, callback: (res: CarData) => void): void {
        this.httpClient.get(this.carDataUrl).pipe().subscribe((res: CarData[]) => {
            callback(res.find(c => c.id === carId));
        });
    }

    private filterBrandData(data: CarData[], ): CarBrandListData[] {
        let brands = [];
        let carlist = new Array<CarBrandListData>();

        brands = data.map((car) => {
            return car.brand
        });

        brands = [...new Set(brands)];

        brands.forEach((b) => {
            const carsPerbrand = data.filter(c => c.brand === b);
            carlist.push({ brand: b, cars: carsPerbrand });
        });

        return carlist;
    }
}
