import { Component, Input, AfterContentInit } from '@angular/core';

declare var CKEDITOR: any;

@Component({
  selector: 'cke-base-button',
  template: '<button (click)="click($event)">Base Button</button>'
})
export class BaseButtonComponent implements AfterContentInit {

  @Input() cke;

  name: string = 'basewidget';

  widget = {
    template: `<div class="${this.name}">basewidget</div>`,
    label: 'basewidget label',
    upcast: function (element) {
      return element.name == 'div' && element.hasClass(this.name);
    },
    init: () => { },
    edit: () => { }
  };

  constructor() { }


  ngAfterContentInit() {
    this.createWidget();
    this.cke.ready.subscribe(v => {
      // console.info('instance ready', this.cke.instance);
      CKEDITOR.plugins.registered[this.name].init(this.cke.instance);
    });
  }

  click(): void {
    this.cke.instance.execCommand(this.name);
  }

  createWidget(): void {
    let widgetname: string = this.name;
    let widget = this.widget;
    CKEDITOR.plugins.add(widgetname, {
      requires: 'widget',
      init: function (editor) {
        editor.widgets.add(widgetname, widget);
        if (editor.contextMenu) {
          editor.addMenuGroup('widgetGroup');
          editor.addMenuItem('widgetItem', {
            label: widget.label,
            //icon: this.path + 'icons/abbr.png',
            //command: 'insertTimestamp',
            group: 'widgetGroup'
          });
          editor.contextMenu.addListener(element => {
            if (element.hasClass('cke_widget_' + widgetname)) {
              return { widgetItem: CKEDITOR.TRISTATE_OFF };
            }
          });
        }
      }
    });
  }

}
