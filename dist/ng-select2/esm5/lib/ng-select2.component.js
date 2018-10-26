/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/// <reference types="select2" />
import { forwardRef, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
            /** @type {?} */
            var newValue = this.value;
            this.setElementValue(newValue);
            this.propagateChange(newValue);
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            /** @type {?} */
            var newValue = changes['value'].currentValue;
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
            /** @type {?} */
            var newValue = _this.element.val();
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
        /** @type {?} */
        var options = {
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
        var e_1, _a;
        if (Array.isArray(newValue)) {
            try {
                for (var _b = tslib_1.__values(this.selector.nativeElement.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var option = _c.value;
                    this.renderer.setElementProperty(option, 'selected', (newValue.indexOf(option.value) > -1));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
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
                    template: "<select #selector>\r\n  <ng-content select=\"option, optgroup\">\r\n  </ng-content>\r\n</select>\r\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgSelect2Component; }),
                            multi: true,
                        },
                    ]
                }] }
    ];
    /** @nocollapse */
    NgSelect2Component.ctorParameters = function () { return [
        { type: Renderer },
        { type: NgZone },
        { type: ElementRef }
    ]; };
    NgSelect2Component.propDecorators = {
        selector: [{ type: ViewChild, args: ['selector',] }],
        data: [{ type: Input }],
        placeholder: [{ type: Input }],
        dropdownParent: [{ type: Input }],
        allowClear: [{ type: Input }],
        value: [{ type: Input }],
        width: [{ type: Input }],
        disabled: [{ type: Input }],
        options: [{ type: Input }],
        valueChanged: [{ type: Output }]
    };
    return NgSelect2Component;
}());
export { NgSelect2Component };
if (false) {
    /** @type {?} */
    NgSelect2Component.prototype.selector;
    /** @type {?} */
    NgSelect2Component.prototype.data;
    /** @type {?} */
    NgSelect2Component.prototype.placeholder;
    /** @type {?} */
    NgSelect2Component.prototype.dropdownParent;
    /** @type {?} */
    NgSelect2Component.prototype.allowClear;
    /** @type {?} */
    NgSelect2Component.prototype.value;
    /** @type {?} */
    NgSelect2Component.prototype.width;
    /** @type {?} */
    NgSelect2Component.prototype.disabled;
    /** @type {?} */
    NgSelect2Component.prototype.options;
    /** @type {?} */
    NgSelect2Component.prototype.valueChanged;
    /** @type {?} */
    NgSelect2Component.prototype.element;
    /** @type {?} */
    NgSelect2Component.prototype.check;
    /** @type {?} */
    NgSelect2Component.prototype.propagateChange;
    /** @type {?} */
    NgSelect2Component.prototype.renderer;
    /** @type {?} */
    NgSelect2Component.prototype.zone;
    /** @type {?} */
    NgSelect2Component.prototype._element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0Mi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1zZWxlY3QyLyIsInNvdXJjZXMiOlsibGliL25nLXNlbGVjdDIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFDTCxVQUFVLEVBRVYsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxFQUNOLFFBQVEsRUFFUixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU16RTtJQTRDRSx5QkFBeUI7SUFFekIsNEJBQW9CLFFBQWtCLEVBQVMsSUFBWSxFQUFTLFFBQW9CO1FBQXBFLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBWTs7UUExQi9FLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRWpCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLGVBQVUsR0FBRyxLQUFLLENBQUM7O1FBU25CLGFBQVEsR0FBRyxLQUFLLENBQUM7O1FBTWhCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxZQUFPLEdBQVEsU0FBUyxDQUFDO1FBQ3pCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFnTHRCLG9CQUFlLEdBQUcsVUFBQyxLQUFVLElBQU8sQ0FBQyxDQUFDO0lBNUt0QyxDQUFDOzs7O0lBRUQsc0NBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTztTQUNSO0lBQ0gsQ0FBQzs7OztJQUVELHFDQUFROzs7SUFBUjtRQUNFLHdCQUF3QjtRQUN4QiwyREFBMkQ7UUFDM0QsK0RBQStEO1FBRS9ELHlCQUF5QjtRQUN6QixrRUFBa0U7UUFD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U0FBQyxVQUFVO3VCQUdwQixLQUFLOzhCQUdMLEtBQUs7aUNBRUwsS0FBSzs2QkFHTCxLQUFLO3dCQUdMLEtBQUs7d0JBR0wsS0FBSzsyQkFHTCxLQUFLOzBCQUdMLEtBQUs7K0JBR0wsTUFBTTs7SUE0TFQseUJBQUM7Q0FBQSxBQXBPRCxJQW9PQztTQXZOWSxrQkFBa0I7OztJQUM3QixzQ0FBNEM7O0lBRzVDLGtDQUF3Qzs7SUFHeEMseUNBQTBCOztJQUUxQiw0Q0FBNkI7O0lBRzdCLHdDQUE0Qjs7SUFHNUIsbUNBQWtDOztJQUdsQyxtQ0FBdUI7O0lBR3ZCLHNDQUEwQjs7SUFHMUIscUNBQTBCOztJQUcxQiwwQ0FBNEM7O0lBRTVDLHFDQUFpQzs7SUFDakMsbUNBQXNCOztJQWdMdEIsNkNBQXNDOztJQTdLMUIsc0NBQTBCOztJQUFFLGtDQUFtQjs7SUFBRSxzQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInNlbGVjdDJcIiAvPlxyXG5pbXBvcnQge1xyXG4gIGZvcndhcmRSZWYsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb21wb25lbnQsXHJcbiAgRG9DaGVjayxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdzZWxlY3QyJztcclxuaW1wb3J0IHsgU2VsZWN0Mk9wdGlvbkRhdGEgfSBmcm9tICcuL25nLXNlbGVjdDIuaW50ZXJmYWNlJztcclxuXHJcbmRlY2xhcmUgdmFyIGpRdWVyeTogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1zZWxlY3QyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmctc2VsZWN0Mi5jb21wb25lbnQuaHRtbCcsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0MkNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdTZWxlY3QyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIEBWaWV3Q2hpbGQoJ3NlbGVjdG9yJykgc2VsZWN0b3I6IEVsZW1lbnRSZWY7XHJcblxyXG4gIC8vIGRhdGEgZm9yIHNlbGVjdDIgZHJvcCBkb3duXHJcbiAgQElucHV0KCkgZGF0YTogQXJyYXk8U2VsZWN0Mk9wdGlvbkRhdGE+O1xyXG5cclxuICAvLyB2YWx1ZSBmb3IgcGxhY2Vob2xkZXJcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xyXG5cclxuICBASW5wdXQoKSBkcm9wZG93blBhcmVudCA9ICcnO1xyXG5cclxuXHJcbiAgQElucHV0KCkgYWxsb3dDbGVhciA9IGZhbHNlO1xyXG5cclxuICAvLyB2YWx1ZSBmb3Igc2VsZWN0MlxyXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuXHJcbiAgLy8gd2lkdGggb2Ygc2VsZWN0MiBpbnB1dFxyXG4gIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XHJcblxyXG4gIC8vIGVuYWJsZSAvIGRpc2FibGUgc2VsZWN0MlxyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIGFsbCBhZGRpdGlvbmFsIG9wdGlvbnNcclxuICBASW5wdXQoKSBvcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvLyBlbWl0dGVyIHdoZW4gdmFsdWUgaXMgY2hhbmdlZFxyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgZWxlbWVudDogYW55ID0gdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgY2hlY2sgPSBmYWxzZTtcclxuICAvLyBwcml2YXRlIHN0eWxlID0gYENTU2A7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLCBwdWJsaWMgem9uZTogTmdab25lLCBwdWJsaWMgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIGlmICghdGhpcy5lbGVtZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gaWYgKHRoaXMuY3NzSW1wb3J0KSB7XHJcbiAgICAvLyAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG4gICAgLy8gICBjb25zdCBsaW5rOiBhbnkgPSBoZWFkLmNoaWxkcmVuW2hlYWQuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgLy8gICBpZiAoIWxpbmsudmVyc2lvbikge1xyXG4gICAgLy8gICAgIGNvbnN0IG5ld0xpbmsgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoaGVhZCwgJ3N0eWxlJyk7XHJcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ3R5cGUnLCAndGV4dC9jc3MnKTtcclxuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShuZXdMaW5rLCAndmVyc2lvbicsICdzZWxlY3QyJyk7XHJcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ2lubmVySFRNTCcsIHRoaXMuc3R5bGUpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWydkYXRhJ10gJiYgSlNPTi5zdHJpbmdpZnkoY2hhbmdlc1snZGF0YSddLnByZXZpb3VzVmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShjaGFuZ2VzWydkYXRhJ10uY3VycmVudFZhbHVlKSkge1xyXG4gICAgICB0aGlzLmluaXRQbHVnaW4oKTtcclxuXHJcbiAgICAgIGNvbnN0IG5ld1ZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSA9IHRoaXMudmFsdWU7XHJcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobmV3VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddICYmIGNoYW5nZXNbJ3ZhbHVlJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpIHtcclxuXHJcbiAgICAgIGNvbnN0IG5ld1ZhbHVlOiBzdHJpbmcgPSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZTtcclxuXHJcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgICAgdGhpcy52YWx1ZUNoYW5nZWQuZW1pdCh7XHJcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxyXG4gICAgICAgIGRhdGE6IHRoaXMuZWxlbWVudC5zZWxlY3QyKCdkYXRhJyksXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShuZXdWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10gJiYgY2hhbmdlc1snZGlzYWJsZWQnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydkaXNhYmxlZCddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIHRoaXMuZGlzYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWydwbGFjZWhvbGRlciddICYmIGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtcGxhY2Vob2xkZXInLCB0aGlzLnBsYWNlaG9sZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1snZHJvcGRvd25QYXJlbnQnXSAmJiBjaGFuZ2VzWydkcm9wZG93blBhcmVudCddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ2Ryb3Bkb3duUGFyZW50J10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWRyb3Bkb3duUGFyZW50JywgdGhpcy5kcm9wZG93blBhcmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ2FsbG93Q2xlYXInXSAmJiBjaGFuZ2VzWydhbGxvd0NsZWFyJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1snYWxsb3dDbGVhciddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1hbGxvdy1jbGVhcicsIHRoaXMuYWxsb3dDbGVhci50b1N0cmluZygpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGpRdWVyeSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtcGxhY2Vob2xkZXInLCB0aGlzLnBsYWNlaG9sZGVyKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWRyb3Bkb3duUGFyZW50JywgdGhpcy5kcm9wZG93blBhcmVudCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1hbGxvdy1jbGVhcicsIHRoaXMuYWxsb3dDbGVhci50b1N0cmluZygpKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCk7XHJcblxyXG4gICAgdGhpcy5pbml0UGx1Z2luKCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsZW1lbnQub24oJ3NlbGVjdDI6c2VsZWN0IHNlbGVjdDI6dW5zZWxlY3QnLCAoZTogYW55KSA9PiB7XHJcbiAgICAgIC8vIGNvbnN0IG5ld1ZhbHVlOiBzdHJpbmcgPSAoZS50eXBlID09PSAnc2VsZWN0Mjp1bnNlbGVjdCcpID8gJycgOiB0aGlzLmVsZW1lbnQudmFsKCk7XHJcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5lbGVtZW50LnZhbCgpO1xyXG5cclxuICAgICAgdGhpcy52YWx1ZUNoYW5nZWQuZW1pdCh7XHJcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxyXG4gICAgICAgIGRhdGE6IHRoaXMuZWxlbWVudC5zZWxlY3QyKCdkYXRhJyksXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShuZXdWYWx1ZSk7XHJcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQub2ZmKCdzZWxlY3QyOnNlbGVjdCcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0UGx1Z2luKCkge1xyXG4gICAgaWYgKCF0aGlzLmVsZW1lbnQuc2VsZWN0Mikge1xyXG4gICAgICBpZiAoIXRoaXMuY2hlY2spIHtcclxuICAgICAgICB0aGlzLmNoZWNrID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZygnUGxlYXNlIGFkZCBTZWxlY3QyIGxpYnJhcnkgKGpzIGZpbGUpIHRvIHRoZSBwcm9qZWN0LicgK1xyXG4gICAgICAgICAgJ1lvdSBjYW4gZG93bmxvYWQgaXQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2VsZWN0Mi9zZWxlY3QyL3RyZWUvbWFzdGVyL2Rpc3QvanMuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBzZWxlY3QyIGFscmVhZHkgaW5pdGlhbGl6ZWQgcmVtb3ZlIGhpbSBhbmQgcmVtb3ZlIGFsbCB0YWdzIGluc2lkZVxyXG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNDbGFzcygnc2VsZWN0Mi1oaWRkZW4tYWNjZXNzaWJsZScpID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKCdkZXN0cm95Jyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb3B0aW9uczogT3B0aW9ucyA9IHtcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICB3aWR0aDogKHRoaXMud2lkdGgpID8gdGhpcy53aWR0aCA6ICdyZXNvbHZlJyxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuZHJvcGRvd25QYXJlbnQpIHtcclxuICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgICAgd2lkdGg6ICh0aGlzLndpZHRoKSA/IHRoaXMud2lkdGggOiAncmVzb2x2ZScsXHJcbiAgICAgICAgZHJvcGRvd25QYXJlbnQ6IGpRdWVyeSgnIycgKyB0aGlzLmRyb3Bkb3duUGFyZW50KSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXIgPSAnOjpTRUxFQ1Q6Oic7XHJcbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMubWF0Y2hlcikge1xyXG4gICAgICBqUXVlcnkuZm4uc2VsZWN0Mi5hbWQucmVxdWlyZShbJ3NlbGVjdDIvY29tcGF0L21hdGNoZXInXSwgKG9sZE1hdGNoZXI6IGFueSkgPT4ge1xyXG4gICAgICAgIG9wdGlvbnMubWF0Y2hlciA9IG9sZE1hdGNoZXIob3B0aW9ucy5tYXRjaGVyKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MihvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgdGhpcy5kaXNhYmxlZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcclxuXHJcbiAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpIHtcclxuXHJcbiAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudC5vcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkob3B0aW9uLCAnc2VsZWN0ZWQnLCAobmV3VmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTEpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBuZXdWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcignY2hhbmdlLnNlbGVjdDInKTtcclxuICAgIH1cclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG5cclxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvcGFnYXRlQ2hhbmdlID0gKHZhbHVlOiBhbnkpID0+IHsgfTtcclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG4gICAgdGhpcy52YWx1ZUNoYW5nZWQuc3Vic2NyaWJlKGZuKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKCkge1xyXG4gIH1cclxufVxyXG4iXX0=