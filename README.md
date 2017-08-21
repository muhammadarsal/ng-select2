# Angular 4 wrapper component of jquery select2 (ng-select2)

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

For Angular version 4.x.x and up. Forked from [ng2-select2](https://www.npmjs.com/package/ng2-select2). Supports two-way data-binding.

## Prerequisites

For this plugin to work you need to add two javascript libraries to your project
- [Jquery](https://jquery.com/download/)
- [Select2](https://select2.github.io/)

First install jQuery and its types using npm

`npm i -S jquery`

`npm i -S @types/jquery`

Then install select2 using npm

`npm i -S select2`

`npm i -S @types/select2`

Now include their scrpits and styles in your `angularcli.json` file
```
"styles": [
  "styles.css",
  "../node_modules/select2/dist/css/select2.min.css"
],
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/select2/dist/js/select2.min.js"
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


## Options

### Inputs
* **data** `Array<Select2OptionData>`: Data used for generating select 2 - inferface definition
* **value** `string`: Default value for select 2
* **width** `string`: Set width for the input, default value is `resolve`
* **disabled** `boolean`: Disable select2, default value is `false`
* **options** `Select2Options`: Set options for select 2, [all available options](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/4869992bc079b88280b9ff91213528904109e8ae/select2/index.d.ts#L40) for select 2

### Outputs
* **valueChanged** `string`: Emitted when value changes in select2 drop-down