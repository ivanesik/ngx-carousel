# NGX-Carousels - [Angular](https://angular.io/) Carousel components with custom template inner

[![Angular](https://img.shields.io/badge/angular-7-red.svg)](https://angular.io) [![npm](https://img.shields.io/badge/npm--package-6.4.1-rgb(203%2C%2056%2C%2055).svg)](https://www.npmjs.com)
--

## Table of Contents
- [Demo](#Demo)
- [Summary](#Summary)
- [How to use](#How-to-use)
- [Todo](#TODO)


## Demo
View [demo](https://ivanesik.github.io/#/ngx-carousels/demo)

## Summary
Angular 7+ module with carousels. View [docs](https://ivanesik.github.io/#/ngx-carousels/docs)

## How to use
#### Installation
```
npm install --save ngx-carousels
```
Import CarouselModule in your AppModule
```js
import { CarouselModule } from 'ngx-carousels';

@NgModule({
  ...
  imports: [..., CarouselModule],
  ...
})
export class YourAppModule {
}
```

#### Usage
```html
<rotate-carousel height="300px" width="450px" depth="700px" period="2.5s" direction="reverse">
    <ng-template rotateCarouselItem>
        <div>Inner of first item</div>
    </ng-template>
    <ng-template rotateCarouselItem>
        <div>Inner of second item</div>
    </ng-template>
    ...
</rotate-carousel>
```

## License
[MIT licensed.](LICENSE)

## Todo
- Auto height
- Global configuration
- Tests