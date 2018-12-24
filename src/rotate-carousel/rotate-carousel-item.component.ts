import { Directive, ContentChild, AfterContentChecked } from '@angular/core';
import { RotateCarouselItemContentDirective } from './rotate-carouse-item-content.component';

@Directive({
    selector: 'rotate-carousel-item',
})
export class RotateCarouselItemDirective implements AfterContentChecked {

    @ContentChild(RotateCarouselItemContentDirective) contentTemplate: RotateCarouselItemContentDirective;

    angle: number;
    contentTpl: RotateCarouselItemContentDirective | null;

    ngAfterContentChecked() {
        this.contentTpl = this.contentTemplate;
    }
}
