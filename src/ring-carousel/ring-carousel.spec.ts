import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingCarouselComponent } from './ring-carousel.component';
import { Component, ViewChild } from '@angular/core';
import { CarouselModule } from 'src/carousels.module';

const DEFAULT_RING_COUNT = 12;
const DEFAULT_RING_DELAY = 130;
const DEFAULT_RING_DURATION = 800;
const CUSTOM_RING_COUNT = 15;
const CUSTOM_RING_DELAY = 150;
const CUSTOM_RING_DURATION = 1000;

describe('Default works', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    const html = `
    <ring-carousel>
        <ng-template ringCarouselItem>
            1
        </ng-template>
        <ng-template ringCarouselItem>
            2
        </ng-template>
    </ring-carousel>`;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [CarouselModule]
        });
        TestBed.overrideTemplate(TestComponent, html);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be initialized with defaults', () => {
        expect(component.carousel).toBeDefined();
        expect(component.carousel.ringColor).toBe('white');
        expect(component.carousel.ringsCount).toBe(DEFAULT_RING_COUNT);
        expect(component.carousel.ringsDelay).toBe(DEFAULT_RING_DELAY);
        expect(component.carousel.ringsDuration).toBe(DEFAULT_RING_DURATION);
        expect(component.carousel.expandOnTransition).toBe(true);
        expect(component.carousel.enableControl).toBe(true);
    });
});

describe('Custom settings', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    const html = `
    <ring-carousel ringColor="blue" ringsCount="${CUSTOM_RING_COUNT}" [ringsDelay]="${CUSTOM_RING_DELAY}" [ringsDuration]="${CUSTOM_RING_DURATION}"
        [expandOnTransition]="false" [enableControl]="false">
        <ng-template ringCarouselItem>
            1
        </ng-template>
        <ng-template ringCarouselItem>
            2
        </ng-template>
    </ring-carousel>`;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [CarouselModule]
        });
        TestBed.overrideComponent(TestComponent, {set: {template: html }});
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be initialized with custom setting', () => {
        expect(component.carousel).toBeDefined();
        expect(component.carousel.ringColor).toBe('blue');
        expect(component.carousel.ringsCount).toBe(CUSTOM_RING_COUNT);
        expect(component.carousel.ringsDelay).toBe(CUSTOM_RING_DELAY);
        expect(component.carousel.ringsDuration).toBe(CUSTOM_RING_DURATION);
        expect(component.carousel.expandOnTransition).toBe(false);
        expect(component.carousel.enableControl).toBe(false);
    });
});

describe('Emit outputs:', () => {
});

describe('Manual control:', () => {
});

//** Component for testing carousel in his template */
@Component({
    selector: 'test',
    template: ''
})
class TestComponent {
    @ViewChild(RingCarouselComponent) carousel: RingCarouselComponent;
}
