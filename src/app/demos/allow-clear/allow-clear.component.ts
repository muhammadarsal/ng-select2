import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

@Component({
  selector: 'app-allow-clear',
  templateUrl: './allow-clear.component.html',
  styleUrls: ['./allow-clear.component.css']
})
export class AllowClearComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  public options: Options;

  ngOnInit() {
    this.exampleData = [
      {
        id: 'opt1',
        text: 'Options 1'
      },
      {
        id: 'opt2',
        text: 'Options 2'
      },
      {
        id: 'opt3',
        text: 'Options 3'
      },
      {
        id: 'opt4',
        text: 'Options 4'
      }
    ];

    this.options = {
      width: '300'
    };
  }
}
