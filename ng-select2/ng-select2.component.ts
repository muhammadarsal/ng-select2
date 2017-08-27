/// <reference types="select2" />
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  DoCheck,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  Renderer,
  OnInit,
  forwardRef,
  NgZone,
  Self
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Select2OptionData } from './ng-select2.interface';

declare var jQuery: any;

@Component({
  selector: 'ng-select2',
  templateUrl: './ng-select2.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgSelect2Component),
      multi: true
    }
  ]
})
export class NgSelect2Component implements AfterViewInit, OnChanges, OnDestroy, OnInit, DoCheck, ControlValueAccessor {
  @ViewChild('selector') selector: ElementRef;

  // data for select2 drop down
  @Input() data: Array<Select2OptionData>;

  // value for placeholder
  @Input() placeholder = '';

  @Input() dropdownParent = '';


  @Input() allowClear = false;

  // value for select2
  @Input() value: string | string[];

  // enable / disable default style for select2
  // @Input() cssImport = false;

  // width of select2 input
  @Input() width: string;

  // enable / disable select2
  @Input() disabled = false;

  // all additional options
  @Input() options: Select2Options;

  // emitter when value is changed
  @Output() valueChanged = new EventEmitter();

  private element: any = undefined;
  private check = false;
  private style = `CSS`;

  constructor(private renderer: Renderer, public zone: NgZone, public _element: ElementRef) {
  }

  ngDoCheck() {
    if (!this.element) {
      return;
    }
  }

  ngOnInit() {
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
  }

  ngOnChanges(changes: SimpleChanges) {
    
    if (!this.element) {
      return;
    }
    
    if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
      this.initPlugin();

      const newValue: string | string[] = this.value;
      this.setElementValue(newValue);
      this.valueChanged.emit({
        value: newValue,
        data: this.element.select2('data')
      });
      this.propagateChange(newValue);
    }
    
    if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {

      const newValue: string = changes['value'].currentValue;

      this.setElementValue(newValue);
      this.valueChanged.emit({
        value: newValue,
        data: this.element.select2('data')
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
  }

  ngAfterViewInit() {
    this.element = jQuery(this.selector.nativeElement);
    this.renderer.setElementAttribute(this.selector.nativeElement, 'data-placeholder', this.placeholder);
    this.renderer.setElementAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
    this.renderer.setElementAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
    // console.log(this.selector.nativeElement);

    this.initPlugin();

    if (typeof this.value !== 'undefined') {
      this.setElementValue(this.value);
    }

    this.element.on('select2:select select2:unselect', (e: any) => {
      // const newValue: string = (e.type === 'select2:unselect') ? '' : this.element.val();
      const newValue =  this.element.val();

      this.valueChanged.emit({
        value: newValue,
        data: this.element.select2('data')
      });
      this.propagateChange(newValue);
      this.setElementValue(newValue);
    });
  }

  ngOnDestroy() {
    this.element.off('select2:select');
  }

  private initPlugin() {
    if (!this.element.select2) {
      if (!this.check) {
        this.check = true;
        console.log('Please add Select2 library (js file) to the project. You can download it from https://github.com/select2/select2/tree/master/dist/js.');
      }

      return;
    }

    // If select2 already initialized remove him and remove all tags inside
    if (this.element.hasClass('select2-hidden-accessible') === true) {
      this.element.select2('destroy');
      this.renderer.setElementProperty(this.selector.nativeElement, 'innerHTML', '');
    }

    let options: Select2Options = {
      data: this.data,
      width: (this.width) ? this.width : 'resolve'
    };

    if (this.dropdownParent) {
      options = {
        data: this.data,
        width: (this.width) ? this.width : 'resolve',
        dropdownParent: jQuery('#' + this.dropdownParent)
      };
    }

    // this.options.placeholder = '::SELECT::';
    Object.assign(options, this.options);
    
    if (options.matcher) {
      jQuery.fn.select2.amd.require(['select2/compat/matcher'], (oldMatcher: any) => {
        options.matcher = oldMatcher(options.matcher);
        this.element.select2(options);

        if (typeof this.value !== 'undefined') {
          this.setElementValue(this.value);
        }
      });
    } else {
      this.element.select2(options);
    }
    
    if (this.disabled) {
      this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
    }
  }

  private setElementValue(newValue: string | string[]) {
    
    // this.zone.run(() => {
    
      if (Array.isArray(newValue)) {
    
        for (const option of this.selector.nativeElement.options) {
    
          if (newValue.indexOf(option.value) > -1) {
            this.renderer.setElementProperty(option, 'selected', 'true');
          }
        }
      }

      else {
        this.renderer.setElementProperty(this.selector.nativeElement, 'value', newValue);
      }
      
      if(this.element) {
        this.element.trigger('change.select2');
      } 
    // });
  } 


  writeValue(value: any) {
    
    if (value !== undefined) {
      this.value = value;
      this.setElementValue(value);
    }
  }

  propagateChange = (value: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
    this.valueChanged.subscribe(fn);
  }

  registerOnTouched() {
  }
}