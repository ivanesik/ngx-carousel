import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[carouselItem]',
})
export class CarouselItemDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}
