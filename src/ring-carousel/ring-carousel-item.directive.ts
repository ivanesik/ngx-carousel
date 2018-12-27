import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[ringCarouselItem]',
})
export class RingCarouselItemDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}
