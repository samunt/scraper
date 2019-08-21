// tslint:disable-next-line:import-spacing
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { parse } from 'node-html-parser';
import parse from 'html-dom-parser';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-forms-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {

  public userDetailsForm: FormGroup;
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

  public findMoney(value) {
    const findDollar = new RegExp('\\$\\d+(?:(\\d+))?', 'g');
    const val = value.match(findDollar);
    alert(val);
  }

  public winQuoteFunction(value) {
    let post: Observable<any>;
    const destinationUrl = 'https://www.winquote.net/compete.pl';
    const premium = value.premium;
    const beginBody = 'month=01&day=15&year=1981&First+Client+Gender=1&First+Client+Tobacco+Use=N&fp_smoker_cigarette=100&fp_smoker_cigar=100&fp_smoker_pipe=100&fp_smoker_snuff=100&fp_smoker_cigarello=100&fp_smoker_chew=100&fp_smoker_marijuana=100&fp_smoker_prescribe=100&Province=13&First+Client+Premium=';
    const endOfBody = '&Payment+Mode=0&First+Client+Coverage+Type=04&First+Client+Plan+Type+OT=0&First+Client+Plan+Type+LB=0&First+Client+Risk=1&type=single&co_code=ca1122573208&co_name=WinQuote&report_type=rank&version_code=ca%3Ase%3A1.3&lang_code=en';;
    const constructedBody = beginBody + premium + endOfBody;
    const httpOptions = {
      headers: new HttpHeaders({
        contentType: 'text/html',
      }),
      mode: "cors",
    };
    post = this.httpClient.post(destinationUrl, constructedBody, httpOptions);
    post.subscribe(
      (response) => {
        console.log('WINQUOTEresp', response);
      }, (error) => {
        console.log('WINQUOTEerr', error);
        const root = parse(error.error.text, {normalizeWhitespace: true, withStartIndices: true});
        const table = root[1].children[2].children[7].children[1].children[1].children[9].children[4].children[3].children[1].children;
        console.log('table', table);
        const tableCellValues = [];
        const temp2 = [];
        // go into table
        table.forEach((el) => {
          // go into row
          if (el.name === 'tr') {
            el.children.forEach((elChildren) => {
              // go into cell
              if (elChildren.name === 'td') {
                elChildren.children.forEach((deepChild) => {
                  if (deepChild.children !== undefined) {
                    temp2.push(deepChild);
                    // does cell have a string in in the html
                    elChildren = deepChild.children[0].type === 'text' ? deepChild.children[0].data : undefined;
                    tableCellValues.push(elChildren);
                  }
                });
              }
            });
          }
        });
        console.log('cell array', tableCellValues);
        console.log('temp', temp2);
      },
    );
  }


  // public kinetixFunction(value) {
  //   let kinetixResp;
  //   const findDollar = new RegExp('\\$\\d+(?:(\\d+))?', 'g');
  //   const premium = value.premium;
  //   let post: Observable<any>;
  //   const httpBody = 'AID=term_life_step_one&quoter=life&quote_ref_id=KL190813-6M3HJ&session_id=53616c7465645f5f6cea3028ef90bce027a16db6ff1a837b45beba5bb8f3ac642c2d52a118df2515&State=1&Health=P&partner_Health=P&coverage_type=term&modify=&province=ON&theme_city+value=&theme_province=&postal_code=M3H4M3&joint=single&premium=';
  //   const endOfBody = '&term_single=1C&term_joint=1C&savers_email=jondoe%40gmail.com&birth_month=04&birth_day=05&birth_year=1990&gender=M&smoker=N&cigarette=0&cigar=0&cigarello=0&pipe=0&chew=0&nicotine=0&marijuana=0&smoke_work=0&smoke_home=0&partner_birth_month=&partner_birth_day=&partner_birth_year=&partner_cigarette=0&partner_cigar=0&partner_cigarello=0&partner_pipe=0&partner_chew=0&partner_nicotine=0&partner_marijuana=0&partner_smoke_work=0&partner_smoke_home=0';
  //   const constructedBody = httpBody + premium + endOfBody;
  //   const destinationUrl = 'https://partners.kanetix.ca/life-insurance';
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       contentType: 'text/html',
  //     }),
  //     mode: "cors",
  //   };
  //   console.log('build 9999', value);
  //   post = this.httpClient.post(destinationUrl, constructedBody, httpOptions);
  //   post.subscribe(
  //     (response) => {
  //        console.log('response body', response);
  //   }, (err) => {
  //        kinetixResp = err.error.text;
  //        console.log('error', err);
  //        kinetixResp = kinetixResp.match(findDollar);
  //        console.log('DOLLAR VAL', kinetixResp);
  //        alert('Lowest quote for Empire on Kinetix for premium ' + premium.toString() + ' is ' + kinetixResp[0]);
  //   });
  //   this.winQuoteFunction(null);
  // }
}
