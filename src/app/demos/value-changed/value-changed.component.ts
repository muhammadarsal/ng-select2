import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-value-changed',
  templateUrl: './value-changed.component.html',
  styleUrls: ['./value-changed.component.css']
})
export class ValueChangedComponent implements OnInit {
  public test = 'value-changed-1';
  public exampleData: Array<Select2OptionData>;

  ngOnInit() {
    this.exampleData = [
      {
        id: 'value-changed-1',
        text: 'Value changed 1'
      },
      {
        id: 'value-changed-2',
        disabled: true,
        text: 'Value changed 2'
      },
      {
        id: 'value-changed-3',
        text: 'Value changed 3'
      },
      {
        id: 'value-changed-4',
        text: 'Value changed 4'
      }
    ];
  }

  public valueChanged(event: string) {
    console.log('value changed: ' + event);
  }

  public modelChanged(event: string) {
    console.log('model changed: ' + event);
  }
}
