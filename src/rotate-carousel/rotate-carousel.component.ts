import {
    Component, Input, Output, EventEmitter, ContentChildren, QueryList, ViewChild, ElementRef, AfterContentInit
} from '@angular/core';
import { timer, Subscription } from 'rxjs';

import { RotateCarouselItemDirective } from './rotate-carousel-item.directive';

const DEFAULT_WIDTH = '300px';
const DEFAULT_HEIGHT = '200px';
const DEFAULT_DEPTH = '510px';
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

    /** Emit event of rotation start */
    @Output() rotationStart = new EventEmitter<number>();
    /** Emit event of rotation end */
    @Output() rotationEnd = new EventEmitter<number>();
    /** Width of content in carousel item */
    @Input() width: string = DEFAULT_WIDTH;
    /** Height of content in carousel item */
    @Input() height: string = DEFAULT_HEIGHT;
    /** Depth of the center of carousel */
    @Input() depth: string = DEFAULT_DEPTH;
    /** Period of carousel rotation */
    @Input() period: number | string = DEFAULT_PERIOD;
    /** Direction of rotation */
    @Input() direction: 'forward' | 'reverse' = 'forward';

    private _period: number;
    private _angleStep: number;
    private _rotationTimerSubscription: Subscription;
    private _activeIndex: number = 0;

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
        if (!Number.isNaN(this.period as any % 1))
            this._period = parseInt(this.period as string);
        else {
            const periodStr = this.period as string;
            const values = periodStr.replace(/\'/g, '').split(/([0-9]*\.?[0-9])/);
            // split string like '1003ms' to '1000' and 'ms' .replace(/\'/g, '').split(/(\d+)/)
            this._period = values[2] == 's' ? parseInt(values[1]) * 1000 : parseInt(values[1]);
        }
        this._rotationTimerSubscription = this.setRotationTimer();
    }

//***************************************************************************************************************
//-Events--------------------------------------------------------------------------------------------------------
//***************************************************************************************************************
    onRotationStart() {
        this.rotationStart.emit(this._activeIndex);
    }

    onRotateEnd($event) {
        if (this._activeIndex == 0) {
            this.carouselInner.nativeElement.style.transition = 'none';
            this.carouselInner.nativeElement.style.transform = 'rotateY(0deg)';
        }
        this.rotationEnd.emit(this._activeIndex);
    }

//***************************************************************************************************************
//-Style-Visibility-Availability---------------------------------------------------------------------------------
//***************************************************************************************************************
    getCarouselStyle() {
        const width = this.width;
        const height = this.height;
        const depth = this.depth;
        return { width: width, height: height, transform: 'translateZ(-' + depth + ')' };
    }

    getItemStyle(item: RotateCarouselItemDirective) {
        const depth = this.depth;
        const style = { transform: 'rotateY(' + item.angle + 'deg) translateZ(' + depth + ')' };
        return style;
    }

//***************************************************************************************************************
//-Methods-------------------------------------------------------------------------------------------------------
//***************************************************************************************************************
    selectAt(index: number) {
        this._rotationTimerSubscription.unsubscribe();
        this.carouselInner.nativeElement.style.transform = `rotateY(${index * this._angleStep}deg)`;
        this._rotationTimerSubscription = this.setRotationTimer();
    }

//***************************************************************************************************************
//-Help----------------------------------------------------------------------------------------------------------
//***************************************************************************************************************
    setRotationTimer(): Subscription {
        return timer(0, this._period)
            .subscribe((i: number) => {
                this._activeIndex = i % this.rotateItems.length;
                let angle: number;
                if (this._activeIndex == 1)
                    this.carouselInner.nativeElement.style.transition = `transform ${this._period / 2}ms ease-in-out`;
                if (i > 0 && this._activeIndex == 0)
                    angle = this.rotateItems.length * this._angleStep * (this.direction == 'forward' ? -1 : 1);
                else
                    angle = this._activeIndex * this._angleStep * (this.direction == 'forward' ? -1 : 1);
                this.carouselInner.nativeElement.style.transform = `rotateY(${angle}deg)`;
                this.onRotationStart();
            });
    }
}
