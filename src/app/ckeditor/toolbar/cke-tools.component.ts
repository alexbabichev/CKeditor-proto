import { Component, Input, AfterContentInit, NgZone } from '@angular/core';

declare var window: any;
declare var CKEDITOR: any;

export class Button {
  id: string;
  style: any = {};
  active: boolean = false;
  constructor(id: string) {
    this.id = id;
  }
}

@Component({
  selector: 'cke-tools',
  templateUrl: './cke-tools.component.html'
})
export class CKEToolsComponent implements AfterContentInit {

  @Input()
  cke: any;

  @Input()
  config: Array<string> = ['bold', 'italic', 'underline', 'strike'];

  private buttons: Button[] = [];

  constructor(private zone: NgZone) {
    for (let id of this.config) {
      this.buttons.push(new Button(id));
    }
  }

  ngAfterContentInit() {

    let editor = this.cke.instance;

    this.cke.ready.subscribe(() => {
      let editor = this.cke.instance;

      this.buttons.forEach((button: Button) => {
        button.style = new CKEDITOR.style(editor.config['coreStyles_' + button.id]);
      });

      editor.on('selectionChange', () => {
        this.buttons.forEach((button: Button) => {
          button.active = button.style.checkActive(editor.elementPath(), editor);
          this.zone.run(() => {});
        });
      });

    });
  }

  click(command: string): void {
    this.cke.instance.execCommand(command);
  }

}
