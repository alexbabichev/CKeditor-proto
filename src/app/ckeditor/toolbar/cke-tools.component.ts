import { Component, Input, OnInit } from '@angular/core';

declare var window: any;


@Component({
  selector: 'cke-tools',
  templateUrl: './cke-tools.component.html'
})
export class CKEToolsComponent implements OnInit {

  @Input()
  cke: any;

  constructor() { }

  ngOnInit() { }

  click(command: string): void {
    console.log(command);
    this.cke.instance.execCommand(command);
  }

}
