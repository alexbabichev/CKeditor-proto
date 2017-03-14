import { Component, OnInit } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';

declare var window: any;


@Component({
  selector: 'cke-custom-button',
  template: '<button (click)="click($event)">My new Button</button>'
})
export class Button2Component extends BaseButtonComponent {

  private name: string = 'newwidget';

  private now: Date = new Date();

  private template: string = `<span>The current date and time is: <em>${this.now}</em></span>`;

  constructor() {
    super();
    this.widget.name = this.name;
    this.widget.template = this.template;
    this.widget.edit = () => {
      // here will be modal window
      window.alert(this.now);
    };
  }

}
