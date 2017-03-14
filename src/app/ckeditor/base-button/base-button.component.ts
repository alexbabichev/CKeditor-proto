import { Component, Input, AfterContentInit } from '@angular/core';

export class Widget {
  name: string = 'basewidget';
  label: string = `${this.name} label`;
  template: string = `<div class="${this.name}">${this.name}</div>`;
  init(): void { };
  edit(): void { };
  upcast(element: any): void {
    return element.name === 'div' && element.hasClass(this.name);
  };
}

declare var CKEDITOR: any;

@Component({
  selector: 'cke-base-button',
  template: '<button (click)="click($event)">Base Button</button>'
})
export class BaseButtonComponent implements AfterContentInit {

  @Input()
  cke: any;

  widget = new Widget();

  constructor() { }


  ngAfterContentInit(): void {
    this.createWidget(this.widget);
    this.cke.ready.subscribe(() => {
      CKEDITOR.plugins.registered[this.widget.name].init(this.cke.instance);
    });
  }

  init(): void {
    
  }

  click(): void {
    this.cke.instance.execCommand(this.widget.name);
  }

  createWidget(widget: Widget): void {
    CKEDITOR.plugins.add(widget.name, {
      requires: 'widget',
      init: function (editor) {
        editor.widgets.add(widget.name, widget);
        if (editor.contextMenu) {
          editor.addMenuGroup('widgetGroup');
          editor.addMenuItem('widgetItem', {
            label: widget.label,
            //icon: this.path + 'icons/abbr.png',
            command: widget.name,
            group: 'widgetGroup'
          });
          editor.contextMenu.addListener(element => {
            if (element.hasClass('cke_widget_' + widget.name)) {
              return { widgetItem: CKEDITOR.TRISTATE_OFF };
            }
          });
        }
      }
    });
  }

}
