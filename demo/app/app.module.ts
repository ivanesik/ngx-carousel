import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './pages/app.component';

import { CarouselModule } from '../../index';

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, CarouselModule ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
