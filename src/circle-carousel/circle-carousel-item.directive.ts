import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[circleCarouselItem]',
})
export class CircleCarouselItemDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}
