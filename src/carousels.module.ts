import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RotateCarouselComponent } from './rotate-carousel/rotate-carousel.component';
import { RotateCarouselItemDirective } from './rotate-carousel/rotate-carousel-item.component';

@NgModule({
    declarations: [
        RotateCarouselComponent, RotateCarouselItemDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RotateCarouselComponent, RotateCarouselItemDirective
    ]
})
export class CarouselModule {}
