export interface CarData {
    id: number;
    photo: string;
    model: string;
    year: string;
    brand: string;
    price: string;
    feautures?: string;
    imageGallery?: string[];
}

export class CarBrandListData {
    public brand: string;
    public cars: CarData[];

    public constructor(fields?: any) {
        this.brand = "";
        this.cars = [];

        if (fields) {
            Object.assign(this, fields);
        }
    }
}