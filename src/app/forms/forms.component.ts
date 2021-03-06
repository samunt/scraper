// tslint:disable-next-line:import-spacing
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import {
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
// import { parse } from 'node-html-parser';
import parse from "html-dom-parser";
import {
  Observable
} from "rxjs";
@Component({
  selector: "app-forms-page",
  templateUrl: "./forms.component.html",
  styleUrls: ["./forms.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormsComponent implements OnInit {

  public userDetailsForm: FormGroup;
  public switch: boolean = false;
  public finalArrayForDisplay: any[];
  public tobaccoUse: string = "N";
  public provinceTable = [
    {
      province: "Albert",
      value: "0",
    },
    {
      province: "Saskatchewan",
      value: "1",
    },
    {
      province: "NWT",
      value: "3",
    },
    {
      province: "Yukon",
      value: "4",
    },
    {
      province: "Nunavit",
      value: "5",
    },
    {
      province: "Manitoba",
      value: "6",
    },
    {
      province: "Ontario",
      value: "7",
    },
    {
      province: "Quebec",
      value: "8",
    },
    {
      province: "NS",
      value: "9",
    },
    {
      province: "NB",
      value: "10",
    },
    {
      province: "PEI",
      value: "11",
    },
    {
      province: "Newfoundland",
      value: "12",
    },
    {
      province: "All Provinces",
      value: "13",
    },
  ];
  public coverageTypeTable = [
    {
      type: "1 Year Term",
      val: "00",
    },
    {
      type: "10 Year Term",
      val: "02",
    },
    {
      type: "15 Year Term",
      val: "03",
    },
    {
      type: "20 Year Term",
      val: "04",
    },
    {
      type: "25 Year Term",
      val: "05",
    },
    {
      type: "30 Year Term",
      val: "06",
    },
    {
      type: "35 Year Term",
      val: "07",
    },
    {
      type: "40 Year Term",
      val: "08",
    },
    {
      type: "Level term to 65",
      val: "09",
    },
    {
      type: "Level term to 70",
      val: "010",
    },
    {
      type: "Unique Term",
      val: "012",
    },
    {
      type: "OptiTerm",
      val: "1",
    },
    {
      type: "Traditional Term 100",
      val: "20",
    },
    {
      type: "T100 20 Pay",
      val: "21",
    },
    {
      type: "Unique Term 100",
      val: "22",
    },
    {
      type: "Whole life/ life pay",
      val: "30",
    },
    {
      type: "Whole life/ life pay to 65",
      val: "31",
    },
    {
      type: "Whole life/ 25 pay",
      val: "32",
    },
    {
      type: "Whole life/ 20 pay",
      val: "33",
    },
    {
      type: "Whole life/ 15 pay",
      val: "34",
    },
    {
      type: "Unique Whole Life",
      val: "39",
    },
    {
      type: "Living Benefits",
      val: "5",
    },
    {
      type: "Single person funeral plan",
      val: "80",
    },
  ];
  public smokerLevelTable = [
    {
      frequency: "Never",
      value: "100",
    },
    {
      frequency: "within 12 months",
      value: "0",
    },
    {
      frequency: "More than 1 years ago",
      value: "1",
    },
    {
      frequency: "More than 2 years ago",
      value: "2",
    },
    {
      frequency: "More than 3 years ago",
      value: "3",
    },
    {
      frequency: "More than 4 years ago",
      value: "5",
    },
    {
      frequency: "More than 5 years ago",
      value: "5",
    },
    {
      frequency: "More than 6 years ago",
      value: "6",
    },
    {
      frequency: "More than 10 years ago",
      value: "10",
    },
    {
      frequency: "More than 15 years ago",
      value: "15",
    },
    {
      frequency: "More than 25 years ago",
      value: "25",
    },
  ];
  public underwritingRisk = [
    {
      risk: "Elite",
      value: 1,
    },
    {
      risk: "Preferred",
      value: 2,
    },
    {
      risk: "Regular",
      value: 8,
    },
    {
      risk: "Simplified",
      value: 16,
    },
    {
      risk: "Guaranteed",
      value: 32,
    },
  ];
  constructor(private fb: FormBuilder,
              public httpClient: HttpClient) {}

  public ngOnInit() {
    this.createForms();
  }

  public createForms() {
    // user details form validations
    this.userDetailsForm = this.fb.group({
      birthDay: new FormControl("01", [Validators.required]),
      birthMonth: new FormControl("01", [Validators.required]),
      birthYear: new FormControl("1980", [Validators.required]),
      coverageType: new FormControl(this.coverageTypeTable[0].val, [Validators.required]),
      gender: new FormControl("Male", [Validators.required]),
      premium: new FormControl(250000, [Validators.required]),
      smoker: new FormControl("N", [Validators.required]),
      smokerChew: new FormControl("100", []),
      smokerCigar: new FormControl("100", []),
      smokerCigarette: new FormControl("100", []),
      smokerCigarillo: new FormControl("100", []),
      smokerPipe: new FormControl("100", []),
      smokerSnuff: new FormControl("100", []),
      marijuana: new FormControl("100", []),
      prescriptionMarijuana: new FormControl("100", []),
      province: new FormControl(this.provinceTable[12].value, [Validators.required]), // Ontario is 13
      tobaccoUse: new FormControl("N", [Validators.required]),
      underwritingRisk: new FormControl("1", [Validators.required]),
    });
  }

  public tobaccoUseFunc($event: Event) {
    // @ts-ignore
    this.tobaccoUse = $event.target.value;
  }

  public switchSurveyForTable() {
    this.switch = !this.switch;
  }

  public findMoney(value) {
    const findDollar = new RegExp("\\$\\d+(?:(\\d+))?", "g");
    const val = value.match(findDollar);
    alert(val);
  }

  public chunkArray(myArray, chunkSize) {
    const arrayLength = myArray.length;
    const tempArray = [];
    for (let index = 0; index < arrayLength; index += chunkSize) {
      const myChunk = myArray.slice(index, index + chunkSize);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }
    return tempArray;
  }

  public winQuoteFunction(value) {
    let post: Observable < any > ;
    const destinationUrl = "https://www.winquote.net/compete.pl";
    const birthDay = value.birthDay;
    const birthMonth = value.birthMonth;
    const birthYear = value.birthYear;
    const coverageType = value.coverageType;
    const gender = value.gender;
    const premium = value.premium;
    const smokerChew = value.smokerChew;
    const smokerCigar = value.smokerCigar;
    const smokerCigarello = value.smokerCigarillo;
    const smokerCigarette = value.smokerCigarette;
    const smokerPipe = value.smokerPipe;
    const smokerSnuff = value.smokerSnuff;
    const marijuana = value.marijuana;
    const prescriptionMarijuana = value.prescriptionMarijuana;
    const province = value.province;
    const tobaccoUse = value.tobaccoUse;
    const underwritingRisk = value.underwritingRisk;

    const monthUrl = "month=" + birthMonth + "&";
    const dayUrl = "day=" + birthDay + "&";
    const yearUrl = "year=" + birthYear + "&";
    const genderUrl = "First+Client+Gender=" + gender + "&";
    const tobaccoUrl = "First+Client+Tobacco+Use=" + tobaccoUse + "&";
    const smokerCigaretteUrl = "fp_smoker_cigarette=" + smokerCigarette + "&";
    const smokerSnuffUrl = "fp_smoker_snuff=" + smokerSnuff + "&";
    const smokerPipeUrl = "fp_smoker_snuff=" + smokerPipe + "&";
    const smokerCigarUrl = "fp_smoker_cigar=" + smokerCigar + "&";
    const smokerCigarelloUrl = "fp_smoker_cigarello=" + smokerCigarello + "&";
    const smokerChewUrl = "fp_smoker_chew=" + smokerChew + "&";
    const smokerMarijuanaUrl = "fp_smoker_marijuana=" + marijuana + "&";
    const prescriptionMarijuanaUrl = "fp_smoker_prescribe=" + prescriptionMarijuana + "&";
    const provinceUrl = "Province=" + province + "&";
    const premiumUrl = "First+Client+Premium=" + premium + "&Payment+Mode=0&";
    const coverageTypeUrl = "First+Client+Coverage+Type=" + coverageType + "&";
    const underwritingRiskUrl = "First+Client+Risk=" + underwritingRisk + "&";
    const middleOfUrl = "First+Client+Plan+Type+OT=0&First+Client+Plan+Type+LB=0&" ;
    const endOfUrl = "type=single&co_code=ca1122573208&co_name=WinQuote&report_type=rank&version_code=ca%3Ase%3A1.3&lang_code=en";
    const constructedBody = monthUrl + dayUrl + yearUrl + genderUrl + tobaccoUrl + smokerCigaretteUrl + smokerCigarUrl + smokerPipeUrl + smokerSnuffUrl + smokerCigarelloUrl + smokerChewUrl + smokerMarijuanaUrl + prescriptionMarijuanaUrl + provinceUrl + premiumUrl + coverageTypeUrl + middleOfUrl + underwritingRiskUrl + endOfUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        contentType: "text/html",
      }),
      mode: "cors",
    };
    post = this.httpClient.post(destinationUrl, constructedBody, httpOptions);
    post.subscribe(
      (response) => {
        return;
      }, (error) => {
        const root = parse(error.error.text, {
          normalizeWhitespace: true,
          withStartIndices: true
        });
        // this huge line is where the table exists in the parsed HTML. It's very deep
        const table = root[1].children[2].children[7].children[1].children[1].children[9].children[4].children[3].children[1].children;
        let tableDataDollarValue = [];
        const tableDataWithoutDollarValue = [];
        // go into table
        table.forEach((el) => {
          // go into row
          if (el.name === "tr") {
            // iterate thru rows
            el.children.forEach((elChildren) => {
              if (elChildren.children !== undefined) {
                // if !== undefined it means that there is the vendor name and insurance type in the cells
                // push values into an array we will later merge with corresponding dollar value array
                tableDataWithoutDollarValue.push(elChildren.children[0].data);
              }
              // go into <td>, which is generated to hold the dollar value of the quote
              // note that the <tr>s that dont have <td>s hold text that describes the vendor name
              if (elChildren.name === "td") {
                elChildren.children.forEach((deepChild) => {
                  if (deepChild.children !== undefined) {
                    // does cell have a string in in the html which will have a dollar value
                    elChildren = deepChild.children[0].type === "text" ? deepChild.children[0].data : undefined;
                    tableDataDollarValue.push(elChildren);
                  }
                });
              }
            });
          }
        });
        // remove the non-relevant data from start of the array
        tableDataDollarValue.forEach((val, index, object) => {
          if (!val.match("\\$\\d+(?:(\\d+))?")) {
            object.splice(index, 1);
          }
        });
        // remove the irrelevant pieces of the non dollar table values
        tableDataWithoutDollarValue.splice(0, 7);
        // remove undefined values
        const filteredTableArray = tableDataWithoutDollarValue.filter((val) => {
          return val !== undefined;
        });
        // remove empty strings and other useless things
        let filteredTableArray2 = filteredTableArray.filter((val) => {
          return val.length > 2;
        });
        // chunk the rows of non dollar values together
        filteredTableArray2 = this.chunkArray(filteredTableArray2, 3);
        // chunk the individual rows of dollar values together
        tableDataDollarValue = this.chunkArray(tableDataDollarValue, 2);
        // merge chunked data from 2 arrays together
        this.finalArrayForDisplay = tableDataDollarValue.map((e, i) => e.concat(filteredTableArray2[i]));
        this.switchSurveyForTable();
        console.log("final array", this.finalArrayForDisplay);
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
