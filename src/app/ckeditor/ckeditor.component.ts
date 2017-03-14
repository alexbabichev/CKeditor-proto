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

  @Input()
  set value(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  get value(): string {
    return this._value;
  };

  @Output() change = new EventEmitter();
  @Output() ready = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @ViewChild('host') host;

  private config: any = {
    removePlugins: 'elementspath',
    extraPlugins: 'widget',
    resize_enabled: false,
    toolbar: [
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
      { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] }
    ]
  }

  private _value: string = '';
  private instance: any;
  private zone: NgZone;

  constructor(zone: NgZone) {
    this.zone = zone;
  }


  ngAfterViewInit() {
    this.ckeditorInit(this.config);
  }

  updateValue(value: string) {
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

  ckeditorInit(config: any): void {
    if (typeof CKEDITOR == 'undefined') {
      console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
    }

    this.instance = CKEDITOR.replace(this.host.nativeElement, config);

    this.instance.on('instanceReady', (evt: any) => {
      this.ready.emit(evt);
    });

    this.instance.on('change', () => {
      let value = this.instance.getData();
      this.onTouched();
      this.updateValue(value);
    });

    this.instance.on('blur', (evt: any) => {
      this.blur.emit(evt);
    });

    this.instance.on('focus', (evt: any) => {
      this.focus.emit(evt);
    });

  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value: string) {
    this._value = value;
    if (this.instance)
      this.instance.setData(value);
  }
  onChange(_) { }
  onTouched() { }
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }
}
