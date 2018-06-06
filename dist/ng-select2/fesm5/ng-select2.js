import { __values } from 'tslib';
import { forwardRef, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgSelect2Component = /** @class */ (function () {
    // private style = `CSS`;
    function NgSelect2Component(renderer, zone, _element) {
        this.renderer = renderer;
        this.zone = zone;
        this._element = _element;
        // value for placeholder
        this.placeholder = '';
        this.dropdownParent = '';
        this.allowClear = false;
        // enable / disable select2
        this.disabled = false;
        // emitter when value is changed
        this.valueChanged = new EventEmitter();
        this.element = undefined;
        this.check = false;
        this.propagateChange = function (value) { };
    }
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (!this.element) {
            return;
        }
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // if (this.cssImport) {
        //   const head = document.getElementsByTagName('head')[0];
        //   const link: any = head.children[head.children.length - 1];
        //   if (!link.version) {
        //     const newLink = this.renderer.createElement(head, 'style');
        //     this.renderer.setElementProperty(newLink, 'type', 'text/css');
        //     this.renderer.setElementProperty(newLink, 'version', 'select2');
        //     this.renderer.setElementProperty(newLink, 'innerHTML', this.style);
        //   }
        // }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgSelect2Component.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.element) {
            return;
        }
        if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();
            var /** @type {?} */ newValue = this.value;
            this.setElementValue(newValue);
            this.propagateChange(newValue);
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            var /** @type {?} */ newValue = changes['value'].currentValue;
            this.setElementValue(newValue);
            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data'),
            });
            this.propagateChange(newValue);
        }
        if (changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
            this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
        if (changes['placeholder'] && changes['placeholder'].previousValue !== changes['placeholder'].currentValue) {
            this.renderer.setElementAttribute(this.selector.nativeElement, 'data-placeholder', this.placeholder);
        }
        if (changes['dropdownParent'] && changes['dropdownParent'].previousValue !== changes['dropdownParent'].currentValue) {
            this.renderer.setElementAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        }
        if (changes['allowClear'] && changes['allowClear'].previousValue !== changes['allowClear'].currentValue) {
            this.renderer.setElementAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        }
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.element = jQuery(this.selector.nativeElement);
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-placeholder', this.placeholder);
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        // console.log(this.selector.nativeElement);
        this.initPlugin();
        if (typeof this.value !== 'undefined') {
            this.setElementValue(this.value);
        }
        this.element.on('select2:select select2:unselect', function (e) {
            // const newValue: string = (e.type === 'select2:unselect') ? '' : this.element.val();
            var /** @type {?} */ newValue = _this.element.val();
            _this.valueChanged.emit({
                value: newValue,
                data: _this.element.select2('data'),
            });
            _this.propagateChange(newValue);
            _this.setElementValue(newValue);
        });
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.element.off('select2:select');
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.initPlugin = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.element.select2) {
            if (!this.check) {
                this.check = true;
                console.log('Please add Select2 library (js file) to the project.' +
                    'You can download it from https://github.com/select2/select2/tree/master/dist/js.');
            }
            return;
        }
        // If select2 already initialized remove him and remove all tags inside
        if (this.element.hasClass('select2-hidden-accessible') === true) {
            this.element.select2('destroy');
            this.renderer.setElementProperty(this.selector.nativeElement, 'innerHTML', '');
        }
        var /** @type {?} */ options = {
            data: this.data,
            width: (this.width) ? this.width : 'resolve',
        };
        if (this.dropdownParent) {
            options = {
                data: this.data,
                width: (this.width) ? this.width : 'resolve',
                dropdownParent: jQuery('#' + this.dropdownParent),
            };
        }
        // this.options.placeholder = '::SELECT::';
        Object.assign(options, this.options);
        if (options.matcher) {
            jQuery.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
                options.matcher = oldMatcher(options.matcher);
                _this.element.select2(options);
                if (typeof _this.value !== 'undefined') {
                    _this.setElementValue(_this.value);
                }
            });
        }
        else {
            this.element.select2(options);
        }
        this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    NgSelect2Component.prototype.setElementValue = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        // this.zone.run(() => {
        if (Array.isArray(newValue)) {
            try {
                for (var _a = __values(this.selector.nativeElement.options), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var option = _b.value;
                    this.renderer.setElementProperty(option, 'selected', (newValue.indexOf(option.value) > -1));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            this.renderer.setElementProperty(this.selector.nativeElement, 'value', newValue);
        }
        if (this.element) {
            this.element.trigger('change.select2');
        }
        // });
        var e_1, _c;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgSelect2Component.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== undefined) {
            this.value = value;
            this.setElementValue(value);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgSelect2Component.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
        this.valueChanged.subscribe(fn);
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.registerOnTouched = /**
     * @return {?}
     */
    function () {
    };
    NgSelect2Component.decorators = [
        { type: Component, args: [{
                    selector: 'ng-select2',
                    template: "<select #selector>\n  <ng-content select=\"option, optgroup\">\n  </ng-content>\n</select>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgSelect2Component; }),
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    NgSelect2Component.ctorParameters = function () { return [
        { type: Renderer, },
        { type: NgZone, },
        { type: ElementRef, },
    ]; };
    NgSelect2Component.propDecorators = {
        "selector": [{ type: ViewChild, args: ['selector',] },],
        "data": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "dropdownParent": [{ type: Input },],
        "allowClear": [{ type: Input },],
        "value": [{ type: Input },],
        "width": [{ type: Input },],
        "disabled": [{ type: Input },],
        "options": [{ type: Input },],
        "valueChanged": [{ type: Output },],
    };
    return NgSelect2Component;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgSelect2Module = /** @class */ (function () {
    function NgSelect2Module() {
    }
    NgSelect2Module.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [NgSelect2Component],
                    exports: [NgSelect2Component]
                },] },
    ];
    return NgSelect2Module;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgSelect2Component, NgSelect2Module };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0Mi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctc2VsZWN0Mi9saWIvbmctc2VsZWN0Mi5jb21wb25lbnQudHMiLCJuZzovL25nLXNlbGVjdDIvbGliL25nLXNlbGVjdDIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwic2VsZWN0MlwiIC8+XG5pbXBvcnQge1xuICBmb3J3YXJkUmVmLFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJ3NlbGVjdDInO1xuaW1wb3J0IHsgU2VsZWN0Mk9wdGlvbkRhdGEgfSBmcm9tICcuL25nLXNlbGVjdDIuaW50ZXJmYWNlJztcblxuZGVjbGFyZSB2YXIgalF1ZXJ5OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXNlbGVjdDInLFxuICB0ZW1wbGF0ZTogYDxzZWxlY3QgI3NlbGVjdG9yPlxyXG4gIDxuZy1jb250ZW50IHNlbGVjdD1cIm9wdGlvbiwgb3B0Z3JvdXBcIj5cclxuICA8L25nLWNvbnRlbnQ+XHJcbjwvc2VsZWN0PlxyXG5gLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdDJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdTZWxlY3QyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAVmlld0NoaWxkKCdzZWxlY3RvcicpIHNlbGVjdG9yOiBFbGVtZW50UmVmO1xuXG4gIC8vIGRhdGEgZm9yIHNlbGVjdDIgZHJvcCBkb3duXG4gIEBJbnB1dCgpIGRhdGE6IEFycmF5PFNlbGVjdDJPcHRpb25EYXRhPjtcblxuICAvLyB2YWx1ZSBmb3IgcGxhY2Vob2xkZXJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICBASW5wdXQoKSBkcm9wZG93blBhcmVudCA9ICcnO1xuXG5cbiAgQElucHV0KCkgYWxsb3dDbGVhciA9IGZhbHNlO1xuXG4gIC8vIHZhbHVlIGZvciBzZWxlY3QyXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAvLyBlbmFibGUgLyBkaXNhYmxlIGRlZmF1bHQgc3R5bGUgZm9yIHNlbGVjdDJcbiAgLy8gQElucHV0KCkgY3NzSW1wb3J0ID0gZmFsc2U7XG5cbiAgLy8gd2lkdGggb2Ygc2VsZWN0MiBpbnB1dFxuICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xuXG4gIC8vIGVuYWJsZSAvIGRpc2FibGUgc2VsZWN0MlxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8vIGFsbCBhZGRpdGlvbmFsIG9wdGlvbnNcbiAgQElucHV0KCkgb3B0aW9uczogT3B0aW9ucztcblxuICAvLyBlbWl0dGVyIHdoZW4gdmFsdWUgaXMgY2hhbmdlZFxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgZWxlbWVudDogYW55ID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIGNoZWNrID0gZmFsc2U7XG4gIC8vIHByaXZhdGUgc3R5bGUgPSBgQ1NTYDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlciwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHVibGljIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBpZiAodGhpcy5jc3NJbXBvcnQpIHtcbiAgICAvLyAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIC8vICAgY29uc3QgbGluazogYW55ID0gaGVhZC5jaGlsZHJlbltoZWFkLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuXG4gICAgLy8gICBpZiAoIWxpbmsudmVyc2lvbikge1xuICAgIC8vICAgICBjb25zdCBuZXdMaW5rID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KGhlYWQsICdzdHlsZScpO1xuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShuZXdMaW5rLCAndHlwZScsICd0ZXh0L2NzcycpO1xuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShuZXdMaW5rLCAndmVyc2lvbicsICdzZWxlY3QyJyk7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KG5ld0xpbmssICdpbm5lckhUTUwnLCB0aGlzLnN0eWxlKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cbiAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydkYXRhJ10gJiYgSlNPTi5zdHJpbmdpZnkoY2hhbmdlc1snZGF0YSddLnByZXZpb3VzVmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShjaGFuZ2VzWydkYXRhJ10uY3VycmVudFZhbHVlKSkge1xuICAgICAgdGhpcy5pbml0UGx1Z2luKCk7XG5cbiAgICAgIGNvbnN0IG5ld1ZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3ZhbHVlJ10gJiYgY2hhbmdlc1sndmFsdWUnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZSkge1xuXG4gICAgICBjb25zdCBuZXdWYWx1ZTogc3RyaW5nID0gY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkLmVtaXQoe1xuICAgICAgICB2YWx1ZTogbmV3VmFsdWUsXG4gICAgICAgIGRhdGE6IHRoaXMuZWxlbWVudC5zZWxlY3QyKCdkYXRhJyksXG4gICAgICB9KTtcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snZGlzYWJsZWQnXSAmJiBjaGFuZ2VzWydkaXNhYmxlZCddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIHRoaXMuZGlzYWJsZWQpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydwbGFjZWhvbGRlciddICYmIGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLXBsYWNlaG9sZGVyJywgdGhpcy5wbGFjZWhvbGRlcik7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ2Ryb3Bkb3duUGFyZW50J10gJiYgY2hhbmdlc1snZHJvcGRvd25QYXJlbnQnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydkcm9wZG93blBhcmVudCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtZHJvcGRvd25QYXJlbnQnLCB0aGlzLmRyb3Bkb3duUGFyZW50KTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snYWxsb3dDbGVhciddICYmIGNoYW5nZXNbJ2FsbG93Q2xlYXInXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydhbGxvd0NsZWFyJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1hbGxvdy1jbGVhcicsIHRoaXMuYWxsb3dDbGVhci50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0galF1ZXJ5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtcGxhY2Vob2xkZXInLCB0aGlzLnBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1kcm9wZG93blBhcmVudCcsIHRoaXMuZHJvcGRvd25QYXJlbnQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWFsbG93LWNsZWFyJywgdGhpcy5hbGxvd0NsZWFyLnRvU3RyaW5nKCkpO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCk7XG5cbiAgICB0aGlzLmluaXRQbHVnaW4oKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5vbignc2VsZWN0MjpzZWxlY3Qgc2VsZWN0Mjp1bnNlbGVjdCcsIChlOiBhbnkpID0+IHtcbiAgICAgIC8vIGNvbnN0IG5ld1ZhbHVlOiBzdHJpbmcgPSAoZS50eXBlID09PSAnc2VsZWN0Mjp1bnNlbGVjdCcpID8gJycgOiB0aGlzLmVsZW1lbnQudmFsKCk7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZWxlbWVudC52YWwoKTtcblxuICAgICAgdGhpcy52YWx1ZUNoYW5nZWQuZW1pdCh7XG4gICAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgZGF0YTogdGhpcy5lbGVtZW50LnNlbGVjdDIoJ2RhdGEnKSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobmV3VmFsdWUpO1xuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUobmV3VmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5lbGVtZW50Lm9mZignc2VsZWN0MjpzZWxlY3QnKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFBsdWdpbigpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudC5zZWxlY3QyKSB7XG4gICAgICBpZiAoIXRoaXMuY2hlY2spIHtcbiAgICAgICAgdGhpcy5jaGVjayA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQbGVhc2UgYWRkIFNlbGVjdDIgbGlicmFyeSAoanMgZmlsZSkgdG8gdGhlIHByb2plY3QuJyArXG4gICAgICAgICAnWW91IGNhbiBkb3dubG9hZCBpdCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zZWxlY3QyL3NlbGVjdDIvdHJlZS9tYXN0ZXIvZGlzdC9qcy4nKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHNlbGVjdDIgYWxyZWFkeSBpbml0aWFsaXplZCByZW1vdmUgaGltIGFuZCByZW1vdmUgYWxsIHRhZ3MgaW5zaWRlXG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNDbGFzcygnc2VsZWN0Mi1oaWRkZW4tYWNjZXNzaWJsZScpID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MignZGVzdHJveScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgJycpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zOiBPcHRpb25zID0ge1xuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgd2lkdGg6ICh0aGlzLndpZHRoKSA/IHRoaXMud2lkdGggOiAncmVzb2x2ZScsXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmRyb3Bkb3duUGFyZW50KSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgIHdpZHRoOiAodGhpcy53aWR0aCkgPyB0aGlzLndpZHRoIDogJ3Jlc29sdmUnLFxuICAgICAgICBkcm9wZG93blBhcmVudDogalF1ZXJ5KCcjJyArIHRoaXMuZHJvcGRvd25QYXJlbnQpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXIgPSAnOjpTRUxFQ1Q6Oic7XG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMubWF0Y2hlcikge1xuICAgICAgalF1ZXJ5LmZuLnNlbGVjdDIuYW1kLnJlcXVpcmUoWydzZWxlY3QyL2NvbXBhdC9tYXRjaGVyJ10sIChvbGRNYXRjaGVyOiBhbnkpID0+IHtcbiAgICAgICAgb3B0aW9ucy5tYXRjaGVyID0gb2xkTWF0Y2hlcihvcHRpb25zLm1hdGNoZXIpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MihvcHRpb25zKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMudmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MihvcHRpb25zKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIHRoaXMuZGlzYWJsZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFbGVtZW50VmFsdWUobmV3VmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG5cbiAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IHtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSkge1xuXG4gICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQub3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShvcHRpb24sICdzZWxlY3RlZCcsIChuZXdWYWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPiAtMSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcignY2hhbmdlLnNlbGVjdDInKTtcbiAgICB9XG4gICAgLy8gfSk7XG4gIH1cblxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcm9wYWdhdGVDaGFuZ2UgPSAodmFsdWU6IGFueSkgPT4geyB9O1xuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gICAgdGhpcy52YWx1ZUNoYW5nZWQuc3Vic2NyaWJlKGZuKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKCkge1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdTZWxlY3QyQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1zZWxlY3QyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTmdTZWxlY3QyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05nU2VsZWN0MkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTZWxlY3QyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX192YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBK0VFLDRCQUFvQixRQUFrQixFQUFTLElBQVksRUFBUyxRQUFvQjtRQUFwRSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVk7OzJCQTdCakUsRUFBRTs4QkFFQyxFQUFFOzBCQUdOLEtBQUs7O3dCQVlQLEtBQUs7OzRCQU1BLElBQUksWUFBWSxFQUFFO3VCQUVwQixTQUFTO3FCQUNoQixLQUFLOytCQWdMSCxVQUFDLEtBQVUsS0FBUTtLQTVLcEM7Ozs7SUFFRCxzQ0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPO1NBQ1I7S0FDRjs7OztJQUVELHFDQUFROzs7SUFBUjs7Ozs7Ozs7Ozs7S0FZQzs7Ozs7SUFFRCx3Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDckgsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWxCLHFCQUFNLFFBQVEsR0FBc0IsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFP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