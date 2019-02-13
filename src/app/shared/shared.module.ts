import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarService } from './services';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        CarService
    ]
})
export class SharedModule { }