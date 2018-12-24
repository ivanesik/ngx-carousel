import { Component, Input, OnChanges, ContentChildren, QueryList, AfterContentChecked } from '@angular/core';
import { RotateCarouselItemDirective } from './rotate-carousel-item.component';

const DEFAULT_IMAGE_WIDTH = '500px';
const DEFAULT_IMAGE_HEIGHT = '500px';
const DEFAULT_DEPTH = '40vw';

@Component({
    selector: 'rotate-carousel',
    templateUrl: './rotate-carousel.component.html',
    styleUrls: ['./rotate-carousel.component.scss']
})
export class RotateCarouselComponent implements OnChanges, AfterContentChecked {

    @ContentChildren(RotateCarouselItemDirective) rotateItems: QueryList<RotateCarouselItemDirective>;

    /** Ссылки на изображения */
    @Input() width: string;
    @Input() height: string;
    @Input() depth: string;

    fullAngle: number = 360;

    ngOnChanges() {
        this.calcItemsAngle();
    }

    ngAfterContentChecked() {
        this.calcItemsAngle();
    }

    calcItemsAngle() {
        const angleStep = this.fullAngle / this.rotateItems.length;
        let angle = 0;
        this.rotateItems.forEach(x => {
            x.angle = angle;
            angle += angleStep;
        });
    }

    getCarouselStyle() {
        const width = this.width ? this.width : DEFAULT_IMAGE_WIDTH;
        const height = this.height ? this.height : DEFAULT_IMAGE_HEIGHT;
        const depth = this.depth ? this.depth : DEFAULT_DEPTH;
        return { width: width, height: height, transform: 'translateZ(-' + depth + ')'};
    }

    getItemStyle(item: RotateCarouselItemDirective) {
        const depth = this.depth ? this.depth : DEFAULT_DEPTH;
        const style = { transform: 'rotateY(' + item.angle + 'deg) translateZ(' + depth + ')' };
        return style;
    }

}
