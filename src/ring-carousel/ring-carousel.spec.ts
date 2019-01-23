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

// Default usage of component
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

    // Async part of preparation function
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [CarouselModule]
        });
        TestBed.overrideTemplate(TestComponent, html);
    }));

    // Sync part of preparation function
    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Tests
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

// Custom setup of component
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
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    const html = `
    <ring-carousel (transitionStart)="onTransitionStart()" (transitionEnd)="onTransitionEnd()">
        <ng-template ringCarouselItem>
            1
        </ng-template>
        <ng-template ringCarouselItem>
            2
        </ng-template>
    </ring-carousel>`;

    // Async part of preparation function
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [CarouselModule]
        });
        TestBed.overrideTemplate(TestComponent, html);
    }));

    // Sync part of preparation function
    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    // Tests
    it('should be initialized with defaults', () => {
        component.carousel.next();
        async(() => (expect(component.checkTransitionStart).toBe(true)));
    });
});

describe('Manual control:', () => {
    null;
});

/** Component for testing carousel in his template */
@Component({
    selector: 'test',
    template: ''
})
class TestComponent {
    @ViewChild(RingCarouselComponent) carousel: RingCarouselComponent;

    checkTransitionStart: boolean = false;
    checkTransitionEnd: boolean = false;

    onTransitionStart() {
        this.checkTransitionStart = true;
    }
    onTransitionEnd() {
        this.checkTransitionEnd = true;
    }

}
