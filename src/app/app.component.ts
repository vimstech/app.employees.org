import { Component } from '@angular/core';

@Component({
  selector: 'org-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;
  constructor() {
    this.title = 'SmartQuest';
  }
}
