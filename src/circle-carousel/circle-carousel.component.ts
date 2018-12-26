import { Component, Output, ContentChildren, QueryList, EventEmitter, AfterContentInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { take, last } from 'rxjs/operators';

import { CircleCarouselItemDirective } from './circle-carousel-item.directive';

@Component({
    selector: 'circle-carousel',
    templateUrl: './circle-carousel.component.html',
    styleUrls: ['./circle-carousel.component.scss']
})
export class CircleCarouselComponent implements AfterContentInit {

    @ContentChildren(CircleCarouselItemDirective) carouselItems: QueryList<CircleCarouselItemDirective>;

    @ViewChild('carousel') carouselRef: ElementRef;
    @ViewChildren('expandSvgAnimations') expandAnimations: QueryList<ElementRef>;
    @ViewChildren('collapseSvgAnimations') collapseAnimations: QueryList<ElementRef>;

    /** Emit event of transition start */
    @Output() rotationStart = new EventEmitter<number>();
    /** Emit event of transition end */
    @Output() rotationEnd = new EventEmitter<number>();

    private _activeItem: CircleCarouselItemDirective;
    private _activeIndex: number;
    /** Count of transition circles */
    private _ringsCount: number = 12;
    /** Stroke-width of each transition circle */
    private _strokeWidthStep: number = 20;
    private _isExpanding: boolean = false;
    private _isCollapsing: boolean = false;

    private _cx: number;
    private _cy: number;
    private _circleDur: number = 100; //ms
    private _activateList: boolean[] = Array(this._ringsCount);

    ngAfterContentInit() {
        this._activeItem = this.carouselItems.first;
        this._activeIndex = 0;
    }

//***************************************************************************************************************
//-User-Interaction----------------------------------------------------------------------------------------------
//***************************************************************************************************************
    prevItem($event: MouseEvent) {
        this.showCircles($event.layerX, $event.layerY);
    }

    nextItem($event: MouseEvent) {
        this.showCircles($event.layerX, $event.layerY);
    }

//***************************************************************************************************************
//-Style-Visibility-Availability---------------------------------------------------------------------------------
//***************************************************************************************************************
    showCircles(x: number, y: number) {
        this.calcRingsWidth(x, y);
        this._cx = x;
        this._cy = y;
        this._isExpanding = true;
        const timer = interval(this._circleDur).pipe(take(this._ringsCount));
        timer.subscribe(i => {
            const animation = this.expandAnimations.find((_, index) => i == index);
            animation.nativeElement.beginElement();
        });
        timer.pipe(last()).subscribe(_ => {
            this._activeIndex = this._activeIndex + 1 < this.carouselItems.length ? this._activeIndex + 1 : 0;
            this._activeItem = this.carouselItems.find((_, index) => index == this._activeIndex);
            this.hideRings();
        });
    }

    hideRings() {
        const timer = interval(this._circleDur).pipe(take(this._ringsCount))
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
        this._strokeWidthStep = d / (this._ringsCount - 1);
    }

}
