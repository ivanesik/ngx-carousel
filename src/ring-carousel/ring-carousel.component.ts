import { Component, Output, ContentChildren, QueryList, EventEmitter, AfterContentInit, ElementRef, ViewChildren, ViewChild, Input } from '@angular/core';
import { interval } from 'rxjs';
import { take, last, first } from 'rxjs/operators';

import { RingCarouselItemDirective } from './ring-carousel-item.directive';

@Component({
    selector: 'ring-carousel',
    templateUrl: './ring-carousel.component.html',
    styleUrls: ['./ring-carousel.component.scss']
})
export class RingCarouselComponent implements AfterContentInit {

    @ContentChildren(RingCarouselItemDirective) carouselItems: QueryList<RingCarouselItemDirective>;

    @ViewChild('carousel') carouselRef: ElementRef;
    @ViewChildren('expandSvgAnimations') expandAnimations: QueryList<ElementRef>;
    @ViewChildren('collapseSvgAnimations') collapseAnimations: QueryList<ElementRef>;

    /** Emit event of transition start */
    @Output() rotationStart = new EventEmitter<number>();
    /** Emit event of transition end */
    @Output() rotationEnd = new EventEmitter<number>();
    /** Color of transition rings */
    @Input() ringColor: string = 'white';
    /** Count of transition rings */
    @Input() ringsCount: number = 12;
    /** Rings delay in ms */
    @Input() ringsDelay: number = 130;
    /** Ring expand/collapse duration in ms */
    @Input() ringsDuration: number = 800;
    /** Flag of transition expand effect */
    @Input() expandOnTransition: boolean = true;
    /** Flag of disable control of left and right part click */
    @Input() enableControl: boolean = true;

    private _activeIndex: number;
    _activeItem: RingCarouselItemDirective;
    /** Stroke-width of each transition circle */
    _strokeWidthStep: number = 0;
    _isExpanding: boolean = false;
    _isCollapsing: boolean = false;

    _cx: number;
    _cy: number;

    ngAfterContentInit() {
        this._activeItem = this.carouselItems.first;
        this._activeIndex = 0;
    }

//***************************************************************************************************************
//-Api-----------------------------------------------------------------------------------------------------------
//***************************************************************************************************************
    /** Select carousel item at index path */
    public selectAt(index: number, $event = null): void {
        this._activeIndex = index;
        let x: number, y: number;
        if ($event) {
            x = $event.layerX;
            y = $event.layerY;
        }
        else {
            y = this.carouselRef.nativeElement.clientHeight / 2;
            x = this.carouselRef.nativeElement.clientWidth / 2;
        }
        this.showRings(x, y, index);
    }

    /** Select next carousel item  */
    public next($event = null): void {
        this._activeIndex = this._activeIndex + 1 < this.carouselItems.length ? this._activeIndex + 1 : 0;
        this.selectAt(this._activeIndex, $event);
    }

    /** Select previous carousel item */
    public prev($event = null): void {
        this._activeIndex = this._activeIndex - 1 >= 0 ? this._activeIndex - 1 : this.carouselItems.length - 1;
        this.selectAt(this._activeIndex, $event);
    }

//***************************************************************************************************************
//-Style-Visibility-Availability---------------------------------------------------------------------------------
//***************************************************************************************************************
    showRings(x: number, y: number, index: number) {
        this.calcRingsWidth(x, y);
        this._cx = x;
        this._cy = y;
        this._isExpanding = true;
        const timer = interval(this.ringsDelay).pipe(take(this.ringsCount));
        timer.subscribe(timValue => {
            const animation = this.expandAnimations.find((_, i) => timValue == i);
            animation.nativeElement.beginElement();
        });
        timer.pipe(last()).subscribe(_ => {
            interval(this.ringsDuration).pipe(first())
                .subscribe(_ => {
                    this._activeItem = this.carouselItems.find((_, i) => i == index);
                    this._isExpanding = false;
                    this.hideRings();
                });
        });
    }

    hideRings() {
        this._isCollapsing = true;
        const timer = interval(this.ringsDelay).pipe(take(this.ringsCount));
        timer.subscribe(i => {
            const animation = this.collapseAnimations.find((_, index) => i == index);
            animation.nativeElement.beginElement();
        });
        timer.pipe(last()).subscribe(_ => {
            interval(this.ringsDuration).pipe(first())
                .subscribe(_ => {
                    this._isCollapsing = false;
                });
        });
    }

//***************************************************************************************************************
//-Help----------------------------------------------------------------------------------------------------------
//***************************************************************************************************************
    calcRingsWidth(x: number, y: number) {
        const x1 = this.carouselRef.nativeElement.clientWidth;
        const y1 = this.carouselRef.nativeElement.clientHeight;
        const isTop = y1 / 2 - y > 0;
        const isLeft = x1 / 2 - x > 0;

        let d: number;
        if (isTop && isLeft)
            d = Math.sqrt(Math.pow(y1 - y, 2) + Math.pow(x1 - x, 2));
        else if (isTop && !isLeft)
            d = Math.sqrt(Math.pow(y1 - y, 2) + Math.pow(x, 2));
        else if (!isTop && isLeft)
            d = Math.sqrt((Math.pow(y, 2) + Math.pow(x1 - x, 2)));
        else
            d = Math.sqrt((Math.pow(y, 2) + Math.pow(x, 2)));
        this._strokeWidthStep = d / (this.ringsCount - 1);
    }

}
