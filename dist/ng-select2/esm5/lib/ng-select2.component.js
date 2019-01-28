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
            this.element.data('select2').$container.find('.select2-selection__placeholder').text(this.placeholder);
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
            placeholder: this.placeholder
        };
        if (this.dropdownParent) {
            options = {
                data: this.data,
                width: (this.width) ? this.width : 'resolve',
                dropdownParent: jQuery('#' + this.dropdownParent),
            };
        }
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
                    template: "<select #selector>\n  <ng-content select=\"option, optgroup\">\n  </ng-content>\n</select>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0Mi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1zZWxlY3QyLyIsInNvdXJjZXMiOlsibGliL25nLXNlbGVjdDIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFDTCxVQUFVLEVBRVYsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxFQUNOLFFBQVEsRUFFUixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU16RTtJQTRDRSx5QkFBeUI7SUFFekIsNEJBQW9CLFFBQWtCLEVBQVMsSUFBWSxFQUFTLFFBQW9CO1FBQXBFLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBWTs7UUExQi9FLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRWpCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLGVBQVUsR0FBRyxLQUFLLENBQUM7O1FBU25CLGFBQVEsR0FBRyxLQUFLLENBQUM7O1FBTWhCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxZQUFPLEdBQVEsU0FBUyxDQUFDO1FBQ3pCLFVBQUssR0FBRyxLQUFLLENBQUM7UUErS3RCLG9CQUFlLEdBQUcsVUFBQyxLQUFVLElBQU8sQ0FBQyxDQUFDO0lBM0t0QyxDQUFDOzs7O0lBRUQsc0NBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTztTQUNSO0lBQ0gsQ0FBQzs7OztJQUVELHFDQUFROzs7SUFBUjtRQUNFLHdCQUF3QjtRQUN4QiwyREFBMkQ7UUFDM0QsK0RBQStEO1FBRS9ELHlCQUF5QjtRQUN6QixrRUFBa0U7UUFDbEUscUVBQXFFO1FBQ3JFLHVFQUF1RTtRQUN2RSwwRUFBMEU7UUFDMUUsTUFBTTtRQUNOLElBQUk7SUFDTixDQUFDOzs7OztJQUVELHdDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNySCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7O2dCQUVaLFFBQVEsR0FBc0IsSUFBSSxDQUFDLEtBQUs7WUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFOztnQkFFbEYsUUFBUSxHQUFXLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZO1lBRXRELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLEtBQUssRUFBRSxRQUFRO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDbkMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoQztRQUVELElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksRUFBRTtZQUNqRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUY7UUFFRCxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDMUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDeEc7UUFFRCxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDbkgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUc7UUFFRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDdkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDaEg7SUFDSCxDQUFDOzs7O0lBRUQsNENBQWU7OztJQUFmO1FBQUEsaUJBdUJDO1FBdEJDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0csNENBQTRDO1FBRTVDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQixJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxXQUFXLEVBQUU7WUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEM7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxVQUFDLENBQU07OztnQkFFbEQsUUFBUSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBRW5DLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNyQixLQUFLLEVBQUUsUUFBUTtnQkFDZixJQUFJLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2FBQ25DLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCx3Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFTyx1Q0FBVTs7O0lBQWxCO1FBQUEsaUJBK0NDO1FBOUNDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzREFBc0Q7b0JBQ2hFLGtGQUFrRixDQUFDLENBQUM7YUFDdkY7WUFFRCxPQUFPO1NBQ1I7UUFFRCx1RUFBdUU7UUFDdkUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoRjs7WUFFRyxPQUFPLEdBQVk7WUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQzVDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QjtRQUVELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixPQUFPLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFDNUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUNsRCxDQUFDO1NBQ0g7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ25CLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLFVBQUMsVUFBZTtnQkFDeEUsT0FBTyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFOUIsSUFBSSxPQUFPLEtBQUksQ0FBQyxLQUFLLEtBQUssV0FBVyxFQUFFO29CQUNyQyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRixDQUFDOzs7OztJQUVPLDRDQUFlOzs7O0lBQXZCLFVBQXdCLFFBQTJCO1FBRWpELHdCQUF3Qjs7UUFFeEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFOztnQkFFM0IsS0FBcUIsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTtvQkFBckQsSUFBTSxNQUFNLFdBQUE7b0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3Rjs7Ozs7Ozs7O1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2xGO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDeEM7UUFDRCxNQUFNO0lBQ1IsQ0FBQzs7Ozs7SUFHRCx1Q0FBVTs7OztJQUFWLFVBQVcsS0FBVTtRQUVuQixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7Ozs7O0lBSUQsNkNBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELDhDQUFpQjs7O0lBQWpCO0lBQ0EsQ0FBQzs7Z0JBbE9GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsd0dBQTBDO29CQUMxQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQzs0QkFDakQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7Ozs7Z0JBdkJDLFFBQVE7Z0JBTFIsTUFBTTtnQkFITixVQUFVOzs7MkJBaUNULFNBQVMsU0FBQyxVQUFVO3VCQUdwQixLQUFLOzhCQUdMLEtBQUs7aUNBRUwsS0FBSzs2QkFHTCxLQUFLO3dCQUdMLEtBQUs7d0JBR0wsS0FBSzsyQkFHTCxLQUFLOzBCQUdMLEtBQUs7K0JBR0wsTUFBTTs7SUEyTFQseUJBQUM7Q0FBQSxBQW5PRCxJQW1PQztTQXROWSxrQkFBa0I7OztJQUM3QixzQ0FBNEM7O0lBRzVDLGtDQUF3Qzs7SUFHeEMseUNBQTBCOztJQUUxQiw0Q0FBNkI7O0lBRzdCLHdDQUE0Qjs7SUFHNUIsbUNBQWtDOztJQUdsQyxtQ0FBdUI7O0lBR3ZCLHNDQUEwQjs7SUFHMUIscUNBQTBCOztJQUcxQiwwQ0FBNEM7O0lBRTVDLHFDQUFpQzs7SUFDakMsbUNBQXNCOztJQStLdEIsNkNBQXNDOztJQTVLMUIsc0NBQTBCOztJQUFFLGtDQUFtQjs7SUFBRSxzQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInNlbGVjdDJcIiAvPlxuaW1wb3J0IHtcbiAgZm9yd2FyZFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdzZWxlY3QyJztcbmltcG9ydCB7IFNlbGVjdDJPcHRpb25EYXRhIH0gZnJvbSAnLi9uZy1zZWxlY3QyLmludGVyZmFjZSc7XG5cbmRlY2xhcmUgdmFyIGpRdWVyeTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zZWxlY3QyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25nLXNlbGVjdDIuY29tcG9uZW50Lmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdDJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdTZWxlY3QyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAVmlld0NoaWxkKCdzZWxlY3RvcicpIHNlbGVjdG9yOiBFbGVtZW50UmVmO1xuXG4gIC8vIGRhdGEgZm9yIHNlbGVjdDIgZHJvcCBkb3duXG4gIEBJbnB1dCgpIGRhdGE6IEFycmF5PFNlbGVjdDJPcHRpb25EYXRhPjtcblxuICAvLyB2YWx1ZSBmb3IgcGxhY2Vob2xkZXJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICBASW5wdXQoKSBkcm9wZG93blBhcmVudCA9ICcnO1xuXG5cbiAgQElucHV0KCkgYWxsb3dDbGVhciA9IGZhbHNlO1xuXG4gIC8vIHZhbHVlIGZvciBzZWxlY3QyXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAvLyB3aWR0aCBvZiBzZWxlY3QyIGlucHV0XG4gIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XG5cbiAgLy8gZW5hYmxlIC8gZGlzYWJsZSBzZWxlY3QyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgLy8gYWxsIGFkZGl0aW9uYWwgb3B0aW9uc1xuICBASW5wdXQoKSBvcHRpb25zOiBPcHRpb25zO1xuXG4gIC8vIGVtaXR0ZXIgd2hlbiB2YWx1ZSBpcyBjaGFuZ2VkXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBlbGVtZW50OiBhbnkgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgY2hlY2sgPSBmYWxzZTtcbiAgLy8gcHJpdmF0ZSBzdHlsZSA9IGBDU1NgO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLCBwdWJsaWMgem9uZTogTmdab25lLCBwdWJsaWMgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIGlmICh0aGlzLmNzc0ltcG9ydCkge1xuICAgIC8vICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgLy8gICBjb25zdCBsaW5rOiBhbnkgPSBoZWFkLmNoaWxkcmVuW2hlYWQuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG5cbiAgICAvLyAgIGlmICghbGluay52ZXJzaW9uKSB7XG4gICAgLy8gICAgIGNvbnN0IG5ld0xpbmsgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoaGVhZCwgJ3N0eWxlJyk7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KG5ld0xpbmssICd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KG5ld0xpbmssICd2ZXJzaW9uJywgJ3NlbGVjdDInKTtcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ2lubmVySFRNTCcsIHRoaXMuc3R5bGUpO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblxuICAgIGlmICghdGhpcy5lbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ2RhdGEnXSAmJiBKU09OLnN0cmluZ2lmeShjaGFuZ2VzWydkYXRhJ10ucHJldmlvdXNWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KGNoYW5nZXNbJ2RhdGEnXS5jdXJyZW50VmFsdWUpKSB7XG4gICAgICB0aGlzLmluaXRQbHVnaW4oKTtcblxuICAgICAgY29uc3QgbmV3VmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1sndmFsdWUnXSAmJiBjaGFuZ2VzWyd2YWx1ZSddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlKSB7XG5cbiAgICAgIGNvbnN0IG5ld1ZhbHVlOiBzdHJpbmcgPSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUobmV3VmFsdWUpO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZWQuZW1pdCh7XG4gICAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgZGF0YTogdGhpcy5lbGVtZW50LnNlbGVjdDIoJ2RhdGEnKSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobmV3VmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydkaXNhYmxlZCddICYmIGNoYW5nZXNbJ2Rpc2FibGVkJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1snZGlzYWJsZWQnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgdGhpcy5kaXNhYmxlZCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10gJiYgY2hhbmdlc1sncGxhY2Vob2xkZXInXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydwbGFjZWhvbGRlciddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5lbGVtZW50LmRhdGEoJ3NlbGVjdDInKS4kY29udGFpbmVyLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fcGxhY2Vob2xkZXInKS50ZXh0KHRoaXMucGxhY2Vob2xkZXIpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydkcm9wZG93blBhcmVudCddICYmIGNoYW5nZXNbJ2Ryb3Bkb3duUGFyZW50J10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1snZHJvcGRvd25QYXJlbnQnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWRyb3Bkb3duUGFyZW50JywgdGhpcy5kcm9wZG93blBhcmVudCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ2FsbG93Q2xlYXInXSAmJiBjaGFuZ2VzWydhbGxvd0NsZWFyJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1snYWxsb3dDbGVhciddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtYWxsb3ctY2xlYXInLCB0aGlzLmFsbG93Q2xlYXIudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGpRdWVyeSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWRyb3Bkb3duUGFyZW50JywgdGhpcy5kcm9wZG93blBhcmVudCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtYWxsb3ctY2xlYXInLCB0aGlzLmFsbG93Q2xlYXIudG9TdHJpbmcoKSk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50KTtcblxuICAgIHRoaXMuaW5pdFBsdWdpbigpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50Lm9uKCdzZWxlY3QyOnNlbGVjdCBzZWxlY3QyOnVuc2VsZWN0JywgKGU6IGFueSkgPT4ge1xuICAgICAgLy8gY29uc3QgbmV3VmFsdWU6IHN0cmluZyA9IChlLnR5cGUgPT09ICdzZWxlY3QyOnVuc2VsZWN0JykgPyAnJyA6IHRoaXMuZWxlbWVudC52YWwoKTtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5lbGVtZW50LnZhbCgpO1xuXG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBkYXRhOiB0aGlzLmVsZW1lbnQuc2VsZWN0MignZGF0YScpLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmVsZW1lbnQub2ZmKCdzZWxlY3QyOnNlbGVjdCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0UGx1Z2luKCkge1xuICAgIGlmICghdGhpcy5lbGVtZW50LnNlbGVjdDIpIHtcbiAgICAgIGlmICghdGhpcy5jaGVjaykge1xuICAgICAgICB0aGlzLmNoZWNrID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2coJ1BsZWFzZSBhZGQgU2VsZWN0MiBsaWJyYXJ5IChqcyBmaWxlKSB0byB0aGUgcHJvamVjdC4nICtcbiAgICAgICAgICAnWW91IGNhbiBkb3dubG9hZCBpdCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zZWxlY3QyL3NlbGVjdDIvdHJlZS9tYXN0ZXIvZGlzdC9qcy4nKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHNlbGVjdDIgYWxyZWFkeSBpbml0aWFsaXplZCByZW1vdmUgaGltIGFuZCByZW1vdmUgYWxsIHRhZ3MgaW5zaWRlXG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNDbGFzcygnc2VsZWN0Mi1oaWRkZW4tYWNjZXNzaWJsZScpID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MignZGVzdHJveScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgJycpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zOiBPcHRpb25zID0ge1xuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgd2lkdGg6ICh0aGlzLndpZHRoKSA/IHRoaXMud2lkdGggOiAncmVzb2x2ZScsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlclxuICAgIH07XG5cbiAgICBpZiAodGhpcy5kcm9wZG93blBhcmVudCkge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICB3aWR0aDogKHRoaXMud2lkdGgpID8gdGhpcy53aWR0aCA6ICdyZXNvbHZlJyxcbiAgICAgICAgZHJvcGRvd25QYXJlbnQ6IGpRdWVyeSgnIycgKyB0aGlzLmRyb3Bkb3duUGFyZW50KSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMubWF0Y2hlcikge1xuICAgICAgalF1ZXJ5LmZuLnNlbGVjdDIuYW1kLnJlcXVpcmUoWydzZWxlY3QyL2NvbXBhdC9tYXRjaGVyJ10sIChvbGRNYXRjaGVyOiBhbnkpID0+IHtcbiAgICAgICAgb3B0aW9ucy5tYXRjaGVyID0gb2xkTWF0Y2hlcihvcHRpb25zLm1hdGNoZXIpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MihvcHRpb25zKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMudmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MihvcHRpb25zKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIHRoaXMuZGlzYWJsZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFbGVtZW50VmFsdWUobmV3VmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG5cbiAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IHtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSkge1xuXG4gICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQub3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShvcHRpb24sICdzZWxlY3RlZCcsIChuZXdWYWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPiAtMSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcignY2hhbmdlLnNlbGVjdDInKTtcbiAgICB9XG4gICAgLy8gfSk7XG4gIH1cblxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcm9wYWdhdGVDaGFuZ2UgPSAodmFsdWU6IGFueSkgPT4geyB9O1xuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gICAgdGhpcy52YWx1ZUNoYW5nZWQuc3Vic2NyaWJlKGZuKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKCkge1xuICB9XG59XG4iXX0=