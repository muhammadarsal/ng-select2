import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;

  public formControl = new FormControl();
  public value: string;

  ngOnInit() {
    this.exampleData = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];
  }
}
