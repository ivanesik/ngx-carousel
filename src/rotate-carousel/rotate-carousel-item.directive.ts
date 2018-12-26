import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[rotateCarouselItem]',
})
export class RotateCarouselItemDirective {

    constructor(public templateRef: TemplateRef<any>) { }
    angle: number;

}
