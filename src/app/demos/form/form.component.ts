import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;

  public formControl = new FormControl();
  public value: string;

  ngOnInit() {
    this.exampleData = [
      {
        id: 'cool-guy',
        text: 'Cool guy'
      }
    ];
  }

  public submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
