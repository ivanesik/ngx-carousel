import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[rotateCarouselContent]',
    host: { 'style': 'width: 100%' }
})
export class RotateCarouselItemContentDirective {

    constructor(public templateRef: TemplateRef<any>) {
        let item: any;
        item = false ? item : null;
    }

}
