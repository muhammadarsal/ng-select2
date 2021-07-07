import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ngSelect2';
import { Options } from 'select2';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  public options: Options;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.exampleData = this.service.getTemplateList();
    this.options = {
      width: '300',
      templateResult: this.templateResult,
      templateSelection: this.templateSelection
    };
  }

  // function for result template
  public templateResult = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    let image = '<span class="image"></span>';

    if (state.additional.image) {
      image = '<span class="image"><img src="' + state.additional.image + '"</span>';
    }

    return jQuery('<span><b>' + state.additional.winner + '.</b> ' + image + ' ' + state.text + '</span>');
  }

  // function for selection template
  public templateSelection = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    return jQuery('<span><b>' + state.additional.winner + '.</b> ' + state.text + '</span>');
  }

}
