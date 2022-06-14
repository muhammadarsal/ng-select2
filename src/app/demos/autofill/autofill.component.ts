import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

@Component({
  selector: 'app-autofill',
  templateUrl: './autofill.component.html',
  styleUrls: ['./autofill.component.css']
})
export class AutofillComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  // @ts-ignore
  public options: Options;

  public formControl = new FormControl();
  public value: string;

  ngOnInit() {
    this.exampleData = [
      { id: '', text: '' },
      { id: 'AL', text: 'Alabama' },
      { id: 'AK', text: 'Alaska' },
      { id: 'AZ', text: 'Arizona' },
      { id: 'AR', text: 'Arkansas' },
      { id: 'CA', text: 'California' },
      { id: 'CO', text: 'Colorado' },
      { id: 'CT', text: 'Connecticut' },
      { id: 'DE', text: 'Delaware' },
      { id: 'DC', text: 'District of Columbia' },
      { id: 'FL', text: 'Florida' },
      { id: 'GA', text: 'Georgia' },
      { id: 'HI', text: 'Hawaii' },
      { id: 'ID', text: 'Idaho' },
      { id: 'IL', text: 'Illinois' },
      { id: 'IN', text: 'Indiana' },
      { id: 'IA', text: 'Iowa' },
      { id: 'KS', text: 'Kansas' },
      { id: 'KY', text: 'Kentucky' },
      { id: 'LA', text: 'Louisiana' },
      { id: 'ME', text: 'Maine' },
      { id: 'MD', text: 'Maryland' },
      { id: 'MA', text: 'Massachusetts' },
      { id: 'MI', text: 'Michigan' },
      { id: 'MN', text: 'Minnesota' },
      { id: 'MS', text: 'Mississippi' },
      { id: 'MO', text: 'Missouri' },
      { id: 'MT', text: 'Montana' },
      { id: 'NE', text: 'Nebraska' },
      { id: 'NV', text: 'Nevada' },
      { id: 'NH', text: 'New Hampshire' },
      { id: 'NJ', text: 'New Jersey' },
      { id: 'NM', text: 'New Mexico' },
      { id: 'NY', text: 'New York' },
      { id: 'NC', text: 'North Carolina' },
      { id: 'ND', text: 'North Dakota' },
      { id: 'OH', text: 'Ohio' },
      { id: 'OK', text: 'Oklahoma' },
      { id: 'OR', text: 'Oregon' },
      { id: 'PA', text: 'Pennsylvania' },
      { id: 'RI', text: 'Rhode Island' },
      { id: 'SC', text: 'South Carolina' },
      { id: 'SD', text: 'South Dakota' },
      { id: 'TN', text: 'Tennessee' },
      { id: 'TX', text: 'Texas' },
      { id: 'UT', text: 'Utah' },
      { id: 'VT', text: 'Vermont' },
      { id: 'VA', text: 'Virginia' },
      { id: 'WA', text: 'Washington' },
      { id: 'WV', text: 'West Virginia' },
      { id: 'WI', text: 'Wisconsin' },
      { id: 'WY', text: 'Wyoming' }
    ];

    this.options = {
      width: '300'
    };
  }
}
