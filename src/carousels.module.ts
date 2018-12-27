import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RotateCarouselComponent } from './rotate-carousel/rotate-carousel.component';
import { RotateCarouselItemDirective } from './rotate-carousel/rotate-carousel-item.directive';
import { RingCarouselComponent } from './circle-carousel/ring-carousel.component';
import { RingCarouselItemDirective } from './circle-carousel/ring-carousel-item.directive';

@NgModule({
    declarations: [
        RotateCarouselComponent, RotateCarouselItemDirective,
        RingCarouselComponent, RingCarouselItemDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RotateCarouselComponent, RotateCarouselItemDirective,
        RingCarouselComponent, RingCarouselItemDirective
    ]
})
export class CarouselModule {}
