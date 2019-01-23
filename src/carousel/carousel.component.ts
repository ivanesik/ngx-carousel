import { Component, QueryList, ContentChildren, Input, OnChanges, AfterContentInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { timer, Observable, Subscriber, Subscription } from 'rxjs';

import { CarouselItemDirective } from './carousel-item.directive';

@Component({
    selector: 'carousel',
    templateUrl: 'carousel.component.html',
    styleUrls: ['carousel.component.scss']
})
export class CarouselComponent implements OnChanges, AfterViewInit {

    @ContentChildren(CarouselItemDirective) carouselInners: QueryList<CarouselItemDirective>;
    @ViewChildren('carouselItems') carouselItems: QueryList<ElementRef<HTMLElement>>;

    /** Enable control  */
    @Input() bottomControl: boolean = true;
    /** Enable autoChange of carousel items */
    @Input() autochange: boolean = true;
    /** Enable transit animation */
    @Input() animationType: 'none' | 'slide' | 'fade' = 'none';
    /** Period for autoChange */
    @Input() period: number = 5000;

    private _activeIndex: number = 0;
    private _subscriber: Subscription;

    ngOnChanges() {
    }

    ngAfterViewInit() {
        this.setupCarousel();
    }

//***************************************************************************************************************
//-Setup---------------------------------------------------------------------------------------------------------
//***************************************************************************************************************
    private setupCarousel() {
        if (this._subscriber)
            this._subscriber.unsubscribe();
        this.setItemActive(this._activeIndex);
        this._subscriber = timer(this.period, this.period)
            .subscribe(() => {
                this.setItemInactive(this._activeIndex);
                this._activeIndex = this._activeIndex + 1 >= this.carouselItems.length ? 0 : this._activeIndex + 1;
                this.setItemActive(this._activeIndex);
            });
    }

//***************************************************************************************************************
//-API-----------------------------------------------------------------------------------------------------------
//***************************************************************************************************************
    selectAt(indexPath: number) {
        this.setItemInactive(this._activeIndex);
        this._activeIndex = indexPath >= this.carouselItems.length ? this.carouselItems.length - 1 : indexPath;
        this._activeIndex = indexPath < 0 ? 0 : indexPath;
        this.setItemActive(this._activeIndex);
        this.setupCarousel();
    }

    next() {
        this.setItemInactive(this._activeIndex);
        this._activeIndex = this._activeIndex + 1 >= this.carouselItems.length ? 0 : this._activeIndex + 1;
        this.setItemActive(this._activeIndex);
        this.setupCarousel();
    }

    prev() {
        this.setItemInactive(this._activeIndex);
        this._activeIndex = this._activeIndex - 1 < 0 ? 0 : this._activeIndex + 1;
        this.setItemActive(this._activeIndex);
        this.setupCarousel();
    }

//***************************************************************************************************************
//-Help----------------------------------------------------------------------------------------------------------
//***************************************************************************************************************
    private setItemActive(index: number) {
        const item = this.carouselItems.find((_, i) => i == index);
        if (item) item.nativeElement.classList.add('active');
    }

    private setItemInactive(index: number) {
        const item = this.carouselItems.find((_, i) => i == index);
        if (item) item.nativeElement.classList.remove('active');
    }

}
