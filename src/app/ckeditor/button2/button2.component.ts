import { Component, OnInit } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';

declare var window: any;


@Component({
  selector: 'cke-custom-button',
  template: '<button (click)="click($event)">My new Button</button>'
})
export class Button2Component extends BaseButtonComponent {

  name: string = 'newwidget';

  now = new Date();

  template = '<span class="simplebox">' +
  'The current date and time is: <em>' + this.now.toString() + '</em>' +
  '</span>';

  constructor() {
    super();
    // can be made more beauty
    this.widget.template = this.template;
    this.widget.init = () => {
      // here will be modal window
      window.alert('edit me');
    };
  }

}
