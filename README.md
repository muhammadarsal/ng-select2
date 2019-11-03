# Angular 8 wrapper component of jquery select2 (ng-select2)

[![npm version](https://badge.fury.io/js/ng-select2.svg)](https://badge.fury.io/js/ng-select2)  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Actions Status](https://github.com/tealpartners/ng-select2/workflows/Node%20CI/badge.svg)](https://github.com/tealpartners/ng-select2/actions)

For Angular version 8.x.x and up. Forked from [ng2-select2](https://www.npmjs.com/package/ng2-select2). Supports two-way data-binding.

## Prerequisites

For this plugin to work you need to add two javascript libraries to your project
- [Jquery](https://jquery.com/download/)
- [Select2](https://select2.github.io/)

First install jQuery using npm

`npm i -S jquery`

Then install select2 using npm

`npm i -S select2`

Now include their scrpits and styles in your `angularcli.json` file
```
"styles": [
  "styles.css",
  "node_modules/select2/dist/css/select2.min.css"
],
"scripts": [
  "node_modules/jquery/dist/jquery.js",
  "node_modules/select2/dist/js/select2.min.js"
],
```

## Installation

Add package to your project `npm i -S ng-select2` (this will save package to your `dependencies` in `package.json`)


## Basic implementation

1) Add declaration to your `app.module.ts`
```
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    ....,
    NgSelect2Module
  ],
  ...
})
```

2) Add it to your template.

```
<ng-select2 [data]="exampleData"></ng-select2>
```

### Two-way data-binding
```
<ng-select2 
	[(ngModel)]="fruit"
	[data]="fruitList"
	[placeholder]="'Please select a fruit...'">		
</ng-select2>
```


## Options

### Inputs
* **data** `Array<Select2OptionData>`: Data used for generating select2 - inferface definition
* **value** `string`: Default value for select2
* **width** `string`: Set width for the input, default value is `resolve`
* **disabled** `boolean`: Disable select2, default value is `false`
* **placeholder** `string`: Placeholder for select2
* **options** `Options`: Set options for select2, [all available options](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/4869992bc079b88280b9ff91213528904109e8ae/select2/index.d.ts#L40) for select2

### Outputs
* **valueChanged** `string`: Emitted when value changes in select2 drop-down

# Demos for angular wrapper for Select2

You can view a live demo [here](https://tealpartners.github.io/ng-select2)

Every single demo is separate component. Bellow you can find links to components with descriptions.

#### [Demo](https://github.com/tealpartners/ng-select2/tree/master/src/app/demos/basic)
- basic demo with only data input
- disabled value in data array

#### [Demo](https://github.com/tealpartners/ng-select2/tree/master/src/app/demos/options) with options
- width option
- theme option
- multiple option
- closeOnSelect option

#### [Demo](https://github.com/tealpartners/ng-select2/tree/master/src/app/demos/template) with custom template demo
- custom template for drop down
- custom template for select2 input

#### [Demo](https://github.com/tealpartners/ng-select2/tree/master/src/app/demos/change) with data changing demo
- when you change value in drop down, new value is displayed on the screen
- you can change selected value
- you can change select2 data

#### [Demo](https://github.com/tealpartners/ng-select2/tree/master/src/app/demos/dynamic) with dynamic load demo
- data is loaded with 4 second delay
- selected value is loaded with 6 second delay

#### [Demo](https://github.com/tealpartners/ng-select2/tree/master/src/app/demos/multiple) with a multiple options
- multiple options
- default value
- tags

#### [Demo](https://github.com/tealpartners/ng-select2/tree/master/src/app/demos/value-changed) with value changed
- Demo with value changed output to console log


Demo forked from: https://github.com/NejcZdovc/ng2-select2-demo
