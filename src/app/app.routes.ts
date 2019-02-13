import { RouterModule, Routes } from '@angular/router';

import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarComparisonComponent } from './car-comparison/car-comparison.component';

const APP_ROUTES: Routes = [
    { path: 'list', component: CarListComponent },
    { path: "cardetails/:carId", component: CarDetailComponent },
    { path: "comparison", component: CarComparisonComponent }
];

const AppRouting = RouterModule.forRoot(APP_ROUTES, { useHash: true });

export { AppRouting };