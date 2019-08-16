// tslint:disable-next-line:import-spacing
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-forms-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {

  public userDetailsForm: FormGroup;
  private resp: Object;


  constructor(private fb: FormBuilder, public httpClient: HttpClient) {}

  public ngOnInit() {
    this.createForms();
  }

  public createForms() {
    // user details form validations
    this.userDetailsForm = this.fb.group({
      premium: [250000, Validators.required ],
    });
  }

  public onSubmitUserDetails(value) {
    let kinetixResp;
    let post: Observable<any>;
    const httpBody = 'AID=term_life_step_one&quoter=life&quote_ref_id=KL190813-6M3HJ&session_id=53616c7465645f5f6cea3028ef90bce027a16db6ff1a837b45beba5bb8f3ac642c2d52a118df2515&State=1&Health=P&partner_Health=P&coverage_type=term&modify=&province=ON&theme_city+value=&theme_province=&postal_code=M3H4M3&joint=single&premium=250000&term_single=1C&term_joint=1C&savers_email=jondoe%40gmail.com&birth_month=04&birth_day=05&birth_year=1990&gender=M&smoker=N&cigarette=0&cigar=0&cigarello=0&pipe=0&chew=0&nicotine=0&marijuana=0&smoke_work=0&smoke_home=0&partner_birth_month=&partner_birth_day=&partner_birth_year=&partner_cigarette=0&partner_cigar=0&partner_cigarello=0&partner_pipe=0&partner_chew=0&partner_nicotine=0&partner_marijuana=0&partner_smoke_work=0&partner_smoke_home=0';
    const destinationUrl = 'https://partners.kanetix.ca/life-insurance';
    const httpOptions = {
      headers: new HttpHeaders({
        contentType: 'text/html',
      }),
      mode: "cors",
    };
    console.log('built666');
    post = this.httpClient.post(destinationUrl, httpBody, httpOptions);
    post.subscribe(
      (response) => {
         console.log('response body', response);
    }, (err) => {
         console.log('ERROR TEXT',err);
    });

  }

}
