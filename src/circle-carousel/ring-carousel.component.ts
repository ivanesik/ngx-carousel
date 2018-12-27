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
    /** Rings duration in ms */
    @Input() ringsDur: number = 130;
    /** Flag of transition expand effect */
    @Input() expandOnTransition: boolean = true;

    private _activeItem: RingCarouselItemDirective;
    private _activeIndex: number;
    /** Stroke-width of each transition circle */
    private _strokeWidthStep: number = 0;
    private _isExpanding: boolean = false;
    private _isCollapsing: boolean = false;

    private _cx: number;
    private _cy: number;

    ngAfterContentInit() {
        this._activeItem = this.carouselItems.first;
        this._activeIndex = 0;
    }

//***************************************************************************************************************
//-User-Interaction----------------------------------------------------------------------------------------------
//***************************************************************************************************************
    prevItem($event: MouseEvent) {
        this.showRings($event.layerX, $event.layerY);
    }

    nextItem($event: MouseEvent) {
        this.showRings($event.layerX, $event.layerY);
    }

//***************************************************************************************************************
//-Style-Visibility-Availability---------------------------------------------------------------------------------
//***************************************************************************************************************
    showRings(x: number, y: number) {
        this.calcRingsWidth(x, y);
        this._cx = x;
        this._cy = y;
        this._isExpanding = true;
        const timer = interval(this.ringsDur).pipe(take(this.ringsCount));
        timer.subscribe(i => {
            const animation = this.expandAnimations.find((_, index) => i == index);
            animation.nativeElement.beginElement();
        });
        timer.pipe(last()).subscribe(_ => {
            interval(this.ringsDur).pipe(first())
                .subscribe(_ => {
                    this._activeIndex = this._activeIndex + 1 < this.carouselItems.length ? this._activeIndex + 1 : 0;
                    this._activeItem = this.carouselItems.find((_, index) => index == this._activeIndex);
                    this._isExpanding = false;
                    this.hideRings();
                });
        });
    }

    hideRings() {
        this._isCollapsing = true;
        interval(this.ringsDur).pipe(take(this.ringsCount))
            .subscribe(i => {
                const animation = this.collapseAnimations.find((_, index) => i == index);
                animation.nativeElement.beginElement();
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
