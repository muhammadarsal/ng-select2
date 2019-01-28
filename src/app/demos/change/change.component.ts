import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Select2OptionData } from 'ngSelect2';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  public value: string;
  public placeholder = 'placeholder';

  constructor(private service: DataService) { }

  ngOnInit() {
    this.exampleData = this.service.getChangeList();
  }

  public changeValue() {
    this.value = 'car2';
  }

  public changeData() {
    this.exampleData = this.service.getChangeListAlternative();
  }

  public changePlaceholder() {
    this.placeholder = 'placeholder2';
  }
}
