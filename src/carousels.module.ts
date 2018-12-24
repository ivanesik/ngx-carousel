import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RotateCarouselComponent } from './rotate-carousel/rotate-carousel.component';
import { RotateCarouselItemDirective } from './rotate-carousel/rotate-carousel-item.component';
import { RotateCarouselItemContentDirective } from './rotate-carousel/rotate-carouse-item-content.component';

@NgModule({
    declarations: [
        RotateCarouselComponent, RotateCarouselItemDirective, RotateCarouselItemContentDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RotateCarouselComponent, RotateCarouselItemDirective, RotateCarouselItemContentDirective
    ]
})
export class CarouselModule {}
