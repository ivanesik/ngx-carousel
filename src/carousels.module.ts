import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemDirective } from './carousel/carousel-item.directive';
import { RotateCarouselComponent } from './rotate-carousel/rotate-carousel.component';
import { RotateCarouselItemDirective } from './rotate-carousel/rotate-carousel-item.directive';
import { RingCarouselComponent } from './ring-carousel/ring-carousel.component';
import { RingCarouselItemDirective } from './ring-carousel/ring-carousel-item.directive';

@NgModule({
    declarations: [
        CarouselComponent, CarouselItemDirective,
        RotateCarouselComponent, RotateCarouselItemDirective,
        RingCarouselComponent, RingCarouselItemDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CarouselComponent, CarouselItemDirective,
        RotateCarouselComponent, RotateCarouselItemDirective,
        RingCarouselComponent, RingCarouselItemDirective
    ]
})
export class CarouselModule {}
