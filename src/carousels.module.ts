import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RotateCarouselComponent } from './rotate-carousel/rotate-carousel.component';
import { RotateCarouselItemDirective } from './rotate-carousel/rotate-carousel-item.directive';
import { CircleCarouselComponent } from './circle-carousel/circle-carousel.component';
import { CircleCarouselItemDirective } from './circle-carousel/circle-carousel-item.directive';

@NgModule({
    declarations: [
        RotateCarouselComponent, RotateCarouselItemDirective,
        CircleCarouselComponent, CircleCarouselItemDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RotateCarouselComponent, RotateCarouselItemDirective,
        CircleCarouselComponent, CircleCarouselItemDirective
    ]
})
export class CarouselModule {}
