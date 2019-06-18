import * as tslib_1 from "tslib";
/// <reference types="select2" />
import { forwardRef, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
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
    NgSelect2Component_1 = NgSelect2Component;
    NgSelect2Component.prototype.ngDoCheck = function () {
        if (!this.element) {
            return;
        }
    };
    NgSelect2Component.prototype.ngOnInit = function () {
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
    NgSelect2Component.prototype.ngOnChanges = function (changes) {
        if (!this.element) {
            return;
        }
        if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();
            var newValue = this.value;
            this.setElementValue(newValue);
            this.propagateChange(newValue);
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            var newValue = changes['value'].currentValue;
            this.setElementValue(newValue);
            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data'),
            });
            this.propagateChange(newValue);
        }
        if (changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
            this.renderer.setProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
        if (changes['placeholder'] && changes['placeholder'].previousValue !== changes['placeholder'].currentValue) {
            this.element.data('select2').$container.find('.select2-selection__placeholder').text(this.placeholder);
        }
        if (changes['dropdownParent'] && changes['dropdownParent'].previousValue !== changes['dropdownParent'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        }
        if (changes['allowClear'] && changes['allowClear'].previousValue !== changes['allowClear'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        }
    };
    NgSelect2Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.element = jQuery(this.selector.nativeElement);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        // console.log(this.selector.nativeElement);
        this.initPlugin();
        if (typeof this.value !== 'undefined') {
            this.setElementValue(this.value);
        }
        this.element.on('select2:select select2:unselect', function (e) {
            // const newValue: string = (e.type === 'select2:unselect') ? '' : this.element.val();
            var newValue = _this.element.val();
            _this.valueChanged.emit({
                value: newValue,
                data: _this.element.select2('data'),
            });
            _this.propagateChange(newValue);
            _this.setElementValue(newValue);
        });
    };
    NgSelect2Component.prototype.ngOnDestroy = function () {
        this.element.off('select2:select');
    };
    NgSelect2Component.prototype.initPlugin = function () {
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
            this.renderer.setProperty(this.selector.nativeElement, 'innerHTML', '');
        }
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
        this.renderer.setProperty(this.selector.nativeElement, 'disabled', this.disabled);
    };
    NgSelect2Component.prototype.setElementValue = function (newValue) {
        // this.zone.run(() => {
        var e_1, _a;
        if (Array.isArray(newValue)) {
            try {
                for (var _b = tslib_1.__values(this.selector.nativeElement.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var option = _c.value;
                    this.renderer.setProperty(option, 'selected', (newValue.indexOf(option.value) > -1));
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
            this.renderer.setProperty(this.selector.nativeElement, 'value', newValue);
        }
        if (this.element) {
            this.element.trigger('change.select2');
        }
        // });
    };
    NgSelect2Component.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.value = value;
            this.setElementValue(value);
        }
    };
    NgSelect2Component.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
        this.valueChanged.subscribe(fn);
    };
    NgSelect2Component.prototype.registerOnTouched = function () {
    };
    var NgSelect2Component_1;
    tslib_1.__decorate([
        ViewChild('selector', { static: true }),
        tslib_1.__metadata("design:type", ElementRef)
    ], NgSelect2Component.prototype, "selector", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], NgSelect2Component.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "dropdownParent", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "allowClear", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "value", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], NgSelect2Component.prototype, "width", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "options", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "valueChanged", void 0);
    NgSelect2Component = NgSelect2Component_1 = tslib_1.__decorate([
        Component({
            selector: 'ng-select2',
            template: "<select #selector>\r\n  <ng-content select=\"option, optgroup\">\r\n  </ng-content>\r\n</select>\r\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return NgSelect2Component_1; }),
                    multi: true,
                },
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [Renderer2, NgZone, ElementRef])
    ], NgSelect2Component);
    return NgSelect2Component;
}());
export { NgSelect2Component };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0Mi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1zZWxlY3QyLyIsInNvdXJjZXMiOlsibGliL25nLXNlbGVjdDIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBaUM7QUFDakMsT0FBTyxFQUNMLFVBQVUsRUFFVix1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEVBQ04sU0FBUyxFQUVULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBbUJ6RTtJQStCRSx5QkFBeUI7SUFFekIsNEJBQW9CLFFBQW1CLEVBQVMsSUFBWSxFQUFTLFFBQW9CO1FBQXJFLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQTNCekYsd0JBQXdCO1FBQ2YsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFFakIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFHcEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVE1QiwyQkFBMkI7UUFDbEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUsxQixnQ0FBZ0M7UUFDdEIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXBDLFlBQU8sR0FBUSxTQUFTLENBQUM7UUFDekIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQStLdEIsb0JBQWUsR0FBRyxVQUFDLEtBQVUsSUFBTyxDQUFDLENBQUM7SUEzS3RDLENBQUM7MkJBbENVLGtCQUFrQjtJQW9DN0Isc0NBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU87U0FDUjtJQUNILENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQ0Usd0JBQXdCO1FBQ3hC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QkFBa0I7UUFiOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsZ0hBQTBDO1lBQzFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQztvQkFDakQsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7aURBa0M4QixTQUFTLEVBQWUsTUFBTSxFQUFtQixVQUFVO09BakM5RSxrQkFBa0IsQ0FzTjlCO0lBQUQseUJBQUM7Q0FBQSxBQXRORCxJQXNOQztTQXROWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInNlbGVjdDJcIiAvPlxyXG5pbXBvcnQge1xyXG4gIGZvcndhcmRSZWYsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb21wb25lbnQsXHJcbiAgRG9DaGVjayxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTZWxlY3QyT3B0aW9uRGF0YSB9IGZyb20gJy4vbmctc2VsZWN0Mi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnc2VsZWN0Mic7XHJcblxyXG5kZWNsYXJlIHZhciBqUXVlcnk6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctc2VsZWN0MicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25nLXNlbGVjdDIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdDJDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0MkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIERvQ2hlY2ssIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICBAVmlld0NoaWxkKCdzZWxlY3RvcicsIHsgc3RhdGljOiB0cnVlIH0pIHNlbGVjdG9yOiBFbGVtZW50UmVmO1xyXG5cclxuICAvLyBkYXRhIGZvciBzZWxlY3QyIGRyb3AgZG93blxyXG4gIEBJbnB1dCgpIGRhdGE6IEFycmF5PFNlbGVjdDJPcHRpb25EYXRhPjtcclxuXHJcbiAgLy8gdmFsdWUgZm9yIHBsYWNlaG9sZGVyXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcclxuXHJcbiAgQElucHV0KCkgZHJvcGRvd25QYXJlbnQgPSAnJztcclxuXHJcblxyXG4gIEBJbnB1dCgpIGFsbG93Q2xlYXIgPSBmYWxzZTtcclxuXHJcbiAgLy8gdmFsdWUgZm9yIHNlbGVjdDJcclxuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW107XHJcblxyXG4gIC8vIHdpZHRoIG9mIHNlbGVjdDIgaW5wdXRcclxuICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xyXG5cclxuICAvLyBlbmFibGUgLyBkaXNhYmxlIHNlbGVjdDJcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBhbGwgYWRkaXRpb25hbCBvcHRpb25zXHJcbiAgQElucHV0KCkgb3B0aW9uczogT3B0aW9ucztcclxuXHJcbiAgLy8gZW1pdHRlciB3aGVuIHZhbHVlIGlzIGNoYW5nZWRcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlIGVsZW1lbnQ6IGFueSA9IHVuZGVmaW5lZDtcclxuICBwcml2YXRlIGNoZWNrID0gZmFsc2U7XHJcbiAgLy8gcHJpdmF0ZSBzdHlsZSA9IGBDU1NgO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIHB1YmxpYyBfZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCkge1xyXG4gICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBpZiAodGhpcy5jc3NJbXBvcnQpIHtcclxuICAgIC8vICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcbiAgICAvLyAgIGNvbnN0IGxpbms6IGFueSA9IGhlYWQuY2hpbGRyZW5baGVhZC5jaGlsZHJlbi5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAvLyAgIGlmICghbGluay52ZXJzaW9uKSB7XHJcbiAgICAvLyAgICAgY29uc3QgbmV3TGluayA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChoZWFkLCAnc3R5bGUnKTtcclxuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShuZXdMaW5rLCAndHlwZScsICd0ZXh0L2NzcycpO1xyXG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KG5ld0xpbmssICd2ZXJzaW9uJywgJ3NlbGVjdDInKTtcclxuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShuZXdMaW5rLCAnaW5uZXJIVE1MJywgdGhpcy5zdHlsZSk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ2RhdGEnXSAmJiBKU09OLnN0cmluZ2lmeShjaGFuZ2VzWydkYXRhJ10ucHJldmlvdXNWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KGNoYW5nZXNbJ2RhdGEnXS5jdXJyZW50VmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuaW5pdFBsdWdpbigpO1xyXG5cclxuICAgICAgY29uc3QgbmV3VmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdID0gdGhpcy52YWx1ZTtcclxuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShuZXdWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3ZhbHVlJ10gJiYgY2hhbmdlc1sndmFsdWUnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZSkge1xyXG5cclxuICAgICAgY29uc3QgbmV3VmFsdWU6IHN0cmluZyA9IGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlO1xyXG5cclxuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgICB2YWx1ZTogbmV3VmFsdWUsXHJcbiAgICAgICAgZGF0YTogdGhpcy5lbGVtZW50LnNlbGVjdDIoJ2RhdGEnKSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1snZGlzYWJsZWQnXSAmJiBjaGFuZ2VzWydkaXNhYmxlZCddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCB0aGlzLmRpc2FibGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1sncGxhY2Vob2xkZXInXSAmJiBjaGFuZ2VzWydwbGFjZWhvbGRlciddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5kYXRhKCdzZWxlY3QyJykuJGNvbnRhaW5lci5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3BsYWNlaG9sZGVyJykudGV4dCh0aGlzLnBsYWNlaG9sZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1snZHJvcGRvd25QYXJlbnQnXSAmJiBjaGFuZ2VzWydkcm9wZG93blBhcmVudCddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ2Ryb3Bkb3duUGFyZW50J10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtZHJvcGRvd25QYXJlbnQnLCB0aGlzLmRyb3Bkb3duUGFyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1snYWxsb3dDbGVhciddICYmIGNoYW5nZXNbJ2FsbG93Q2xlYXInXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydhbGxvd0NsZWFyJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtYWxsb3ctY2xlYXInLCB0aGlzLmFsbG93Q2xlYXIudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBqUXVlcnkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50KTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtZHJvcGRvd25QYXJlbnQnLCB0aGlzLmRyb3Bkb3duUGFyZW50KTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtYWxsb3ctY2xlYXInLCB0aGlzLmFsbG93Q2xlYXIudG9TdHJpbmcoKSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQpO1xyXG5cclxuICAgIHRoaXMuaW5pdFBsdWdpbigpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtZW50Lm9uKCdzZWxlY3QyOnNlbGVjdCBzZWxlY3QyOnVuc2VsZWN0JywgKGU6IGFueSkgPT4ge1xyXG4gICAgICAvLyBjb25zdCBuZXdWYWx1ZTogc3RyaW5nID0gKGUudHlwZSA9PT0gJ3NlbGVjdDI6dW5zZWxlY3QnKSA/ICcnIDogdGhpcy5lbGVtZW50LnZhbCgpO1xyXG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZWxlbWVudC52YWwoKTtcclxuXHJcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcclxuICAgICAgICBkYXRhOiB0aGlzLmVsZW1lbnQuc2VsZWN0MignZGF0YScpLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobmV3VmFsdWUpO1xyXG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5lbGVtZW50Lm9mZignc2VsZWN0MjpzZWxlY3QnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFBsdWdpbigpIHtcclxuICAgIGlmICghdGhpcy5lbGVtZW50LnNlbGVjdDIpIHtcclxuICAgICAgaWYgKCF0aGlzLmNoZWNrKSB7XHJcbiAgICAgICAgdGhpcy5jaGVjayA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1BsZWFzZSBhZGQgU2VsZWN0MiBsaWJyYXJ5IChqcyBmaWxlKSB0byB0aGUgcHJvamVjdC4nICtcclxuICAgICAgICAgICdZb3UgY2FuIGRvd25sb2FkIGl0IGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3NlbGVjdDIvc2VsZWN0Mi90cmVlL21hc3Rlci9kaXN0L2pzLicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgc2VsZWN0MiBhbHJlYWR5IGluaXRpYWxpemVkIHJlbW92ZSBoaW0gYW5kIHJlbW92ZSBhbGwgdGFncyBpbnNpZGVcclxuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQ2xhc3MoJ3NlbGVjdDItaGlkZGVuLWFjY2Vzc2libGUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MignZGVzdHJveScpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb3B0aW9uczogT3B0aW9ucyA9IHtcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICB3aWR0aDogKHRoaXMud2lkdGgpID8gdGhpcy53aWR0aCA6ICdyZXNvbHZlJyxcclxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXJcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuZHJvcGRvd25QYXJlbnQpIHtcclxuICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgICAgd2lkdGg6ICh0aGlzLndpZHRoKSA/IHRoaXMud2lkdGggOiAncmVzb2x2ZScsXHJcbiAgICAgICAgZHJvcGRvd25QYXJlbnQ6IGpRdWVyeSgnIycgKyB0aGlzLmRyb3Bkb3duUGFyZW50KSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMubWF0Y2hlcikge1xyXG4gICAgICBqUXVlcnkuZm4uc2VsZWN0Mi5hbWQucmVxdWlyZShbJ3NlbGVjdDIvY29tcGF0L21hdGNoZXInXSwgKG9sZE1hdGNoZXI6IGFueSkgPT4ge1xyXG4gICAgICAgIG9wdGlvbnMubWF0Y2hlciA9IG9sZE1hdGNoZXIob3B0aW9ucy5tYXRjaGVyKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MihvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCB0aGlzLmRpc2FibGVkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG5cclxuICAgIC8vIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSkge1xyXG5cclxuICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50Lm9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KG9wdGlvbiwgJ3NlbGVjdGVkJywgKG5ld1ZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+IC0xKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBuZXdWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcignY2hhbmdlLnNlbGVjdDInKTtcclxuICAgIH1cclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG5cclxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvcGFnYXRlQ2hhbmdlID0gKHZhbHVlOiBhbnkpID0+IHsgfTtcclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG4gICAgdGhpcy52YWx1ZUNoYW5nZWQuc3Vic2NyaWJlKGZuKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKCkge1xyXG4gIH1cclxufVxyXG4iXX0=