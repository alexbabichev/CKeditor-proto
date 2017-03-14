import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  NgZone,
  forwardRef,
  QueryList,
  AfterViewInit,
  ContentChildren
} from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

declare var CKEDITOR: any;

@Component({
  selector: 'ckeditor',
  template: `<textarea #host></textarea>`,
  styleUrls: ['./ckeditor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CKEditorComponent),
      multi: true
    }
  ]
})
export class CKEditorComponent implements AfterViewInit {

  @Input() config;
  @Input() debounce;

  @Output() change = new EventEmitter();
  @Output() ready = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @ViewChild('host') host;

  @Output() test1 = new EventEmitter();


  _value = '';
  instance;
  debounceTimeout;
  zone;

  constructor(zone:NgZone) {
    this.zone = zone;
  }

  get value(): any { return this._value; };
  @Input() set value(v) {
    if (v !== this._value) {
      this._value = v;
      //this.onChange(v);
    }
  }

  /**
   * On component view init
   */
  ngAfterViewInit() {
    // Configuration
    this.ckeditorInit(this.config || {});

  }

  updateValue(value) {
    this.zone.run(() => {
      this.value = value;

      this.onChange(value);

      this.onTouched();
      this.change.emit(value);
    });
  }

  /**
   * CKEditor init
   */

  ckeditorInit(config) {
    if (typeof CKEDITOR == 'undefined') 
      console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');

      // config.extraPlugins = 'widget';

      console.log(config);

      CKEDITOR.addCss(
          '#widget:hover {' +
            'outline: 1px dotted red;' +
            'cursor: pointer' +
          '}'
        );

      this.instance = CKEDITOR.replace(this.host.nativeElement, config);
      
    // listen for instanceReady event
      this.instance.on('instanceReady', (evt) => {
        // send the evt to the EventEmitter
        this.ready.emit(evt);
      });

      // CKEditor change event
      this.instance.on('change', () => {
        this.onTouched();
        let value = this.instance.getData();

        // Debounce update
        if (this.debounce) {
          if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
          this.debounceTimeout = setTimeout(() => {
            this.updateValue(value);
            this.debounceTimeout = null;
          }, parseInt(this.debounce));

          // Live update
        }else {
          this.updateValue(value);
        }
      });

      // CKEditor blur event
      this.instance.on('blur', (evt) => {
        this.blur.emit(evt);
      });

      // CKEditor focus event
      this.instance.on('focus', (evt) => {
        this.focus.emit(evt);
      });

  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value) {
    this._value = value;
    if (this.instance)
      this.instance.setData(value);
  }
  onChange(_) {}
  onTouched() {}
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }

}
