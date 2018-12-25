import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[rotateCarouselContent]'
})
export class RotateCarouselItemContentDirective {

    constructor(public templateRef: TemplateRef<any>) { }

}
