import { Component, OnInit } from '@angular/core';
import { Options } from 'select2';

@Component({
  selector: 'app-custom-array',
  templateUrl: './custom-array.component.html',
  styleUrls: ['./custom-array.component.css']
})
export class CustomArrayComponent implements OnInit {
  public exampleData: any[];
  public options: Options;

  ngOnInit() {
    this.exampleData = [
      {
        id: 'basic1',
        custom: { en: 'Label 1' }
      },
      {
        id: 'basic2',
        disabled: true,
        custom: { en: 'Label 2' }
      },
      {
        id: 'basic3',
        custom: { en: 'Label 3' }
      },
      {
        id: 'basic4',
        custom: { en: 'Label 4' }
      }
    ];

    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300',
      templateSelection: (object: any) => {
        return object && object.custom && object.custom.en;
      },
      templateResult: (object: any) => {
        return object && object.custom && object.custom.en;
      }
    };
  }
}
