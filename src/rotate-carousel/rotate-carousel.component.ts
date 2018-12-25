import {
    Component, Input, Output, EventEmitter, ContentChildren, QueryList, ViewChild, ElementRef, AfterContentInit
} from '@angular/core';
import { timer } from 'rxjs';

import { RotateCarouselItemDirective } from './rotate-carousel-item.component';

const DEFAULT_WIDTH = '300px';
const DEFAULT_HEIGHT = '200px';
const DEFAULT_DEPTH = '500px';
const DEFAULT_PERIOD = 3500;

const FULL_ANGLE = 360;

@Component({
    selector: 'rotate-carousel',
    templateUrl: './rotate-carousel.component.html',
    styleUrls: ['./rotate-carousel.component.scss']
})
export class RotateCarouselComponent implements AfterContentInit {

    @ContentChildren(RotateCarouselItemDirective) rotateItems: QueryList<RotateCarouselItemDirective>;
    @ViewChild('carouselInner') carouselInner: ElementRef;

    @Output() startRotate = new EventEmitter<number>();
    /** Width of content in carousel item */
    @Input() width: string = DEFAULT_WIDTH;
    /** Height of content in carousel item */
    @Input() height: string = DEFAULT_HEIGHT;
    /** Depth of the center of carousel */
    @Input() depth: string = DEFAULT_DEPTH;
    /** Period of carousel rotation */
    @Input() period: number | string = DEFAULT_PERIOD;

    private _angleStep: number;

    ngAfterContentInit() {
        this.calcItemsAngle();
        this.setupRotation();
    }

//***************************************************************************************************************
//-Setup----------------------------------------------------------------------------------------------------------
//***************************************************************************************************************
    private calcItemsAngle() {
        this._angleStep = FULL_ANGLE / this.rotateItems.length;
        let angle = 0;
        this.rotateItems.forEach(x => {
            x.angle = angle;
            angle += this._angleStep;
        });
    }

    private setupRotation() {
        let period: any = this.period;
        if (Number.isNaN(period % 1)) {
            const values = period.replace(/\'/g, '').split(/(\d+)/); // split strings like '1003ms' to '1000' and 'ms'
            period = values[2] == 's' ? values[1] * 1000 : values[1];
        }
        this.carouselInner.nativeElement.style.transition = `transform ${period / 2}ms ease-in-out`;
        timer(0, period).subscribe(i => {
            const angle = i * this._angleStep;
            this.carouselInner.nativeElement.style.transform = `rotateY(${angle}deg)`;
            this.onPanelChange(i % this.rotateItems.length);
        });
    }

//***************************************************************************************************************
//-Events----------------------------------------------------------------------------------------------
//***************************************************************************************************************
    private onPanelChange(index: number) {
        this.startRotate.emit(index);
    }

//***************************************************************************************************************
//-Style-Visibility-Availability---------------------------------------------------------------------------------
//***************************************************************************************************************
    private getCarouselStyle() {
        const width = this.width;
        const height = this.height;
        const depth = this.depth;
        return { width: width, height: height, transform: 'translateZ(-' + depth + ')' };
    }

    private getItemStyle(item: RotateCarouselItemDirective) {
        const depth = this.depth;
        const style = { transform: 'rotateY(' + item.angle + 'deg) translateZ(' + depth + ')' };
        return style;
    }

}
