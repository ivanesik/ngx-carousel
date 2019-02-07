import { Component, QueryList, ContentChildren, Input, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { CarouselItemDirective } from './carousel-item.directive';
import { first } from 'rxjs/operators';

@Component({
    selector: 'carousel',
    templateUrl: 'carousel.component.html',
    styleUrls: ['carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {

    @ContentChildren(CarouselItemDirective) carouselInners: QueryList<CarouselItemDirective>;
    @ViewChildren('carouselItems') carouselItems: QueryList<ElementRef<HTMLElement>>;

    /** Enable autoChange of carousel items */
    @Input() autochange: boolean = false;
    /** Enable transit animation */
    @Input() animationType: 'none' | 'fade' = 'none';
    /** Period for autoChange */
    @Input() period: number = 5000;

    private _activeIndex: number = 0;
    private _subscriber: Subscription;
    private _isAnimation: boolean = false;

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
        if (this.autochange)
            this._subscriber = interval(this.period)
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
        if (!this._isAnimation) {
            this.setItemInactive(this._activeIndex);
            this._activeIndex = indexPath >= this.carouselItems.length ? this.carouselItems.length - 1 : indexPath;
            this._activeIndex = indexPath < 0 ? 0 : indexPath;
            this.setItemActive(this._activeIndex);
            this.setupCarousel();
        }
    }

    next() {
        if (!this._isAnimation) {
            this.setItemInactive(this._activeIndex);
            this._activeIndex = this._activeIndex + 1 >= this.carouselItems.length ? 0 : this._activeIndex + 1;
            this.setItemActive(this._activeIndex);
            this.setupCarousel();
        }
    }

    prev() {
        if (!this._isAnimation) {
            this.setItemInactive(this._activeIndex);
            this._activeIndex = this._activeIndex - 1 < 0 ? this.carouselItems.length - 1 : this._activeIndex - 1;
            this.setItemActive(this._activeIndex);
            this.setupCarousel();
        }
    }

    //***************************************************************************************************************
    //-Help----------------------------------------------------------------------------------------------------------
    //***************************************************************************************************************
    private setItemActive(index: number) {
        const item = this.carouselItems.find((_, i) => i == index);
        switch (this.animationType) {
            case 'fade':
                if (item) {
                    this._isAnimation = true;
                    item.nativeElement.classList.add('active', 'fade-in');
                    interval(1005).pipe(first())
                        .subscribe(() => {
                            item.nativeElement.classList.remove('fade-in');
                            this._isAnimation = false;
                        });
                }
                break;
            default:
                if (item) item.nativeElement.classList.add('active');
                break;
        }
    }

    private setItemInactive(index: number) {
        const item = this.carouselItems.find((_, i) => i == index);
        switch (this.animationType) {
            case 'fade':
                if (item) {
                    item.nativeElement.classList.add('fade-out');
                    interval(1005).pipe(first())
                        .subscribe(() => {
                            item.nativeElement.classList.remove('active', 'fade-out');
                        });
                }
                break;
            default:
                if (item) item.nativeElement.classList.remove('active');
                break;
        }
    }

}
