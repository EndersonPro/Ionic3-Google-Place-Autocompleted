import { NavController } from 'ionic-angular';
import { Component, Input, Output, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

const GOOGLE_API_URL = "https://maps.googleapis.com/maps/api/place/";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  placeholder = "Buscar"; /* Edit Text Placeholder */
  key = "GOOGLE_PLACE_KEY"; /* Your Google Place KEY */
  components = "country:co"; /* Segment country | this value can be empty */
  locals: any[]; /* Array for result locals  */

  constructor(public navCtrl: NavController, @Inject(Http) public http: Http) { }

  ionViewDidLoad() {

  }

  autocomplete(input: string) {
    return this.http.get(GOOGLE_API_URL + "autocomplete/json?input=" + input + "&key=" + this.key + "&components=" + this.components)
      .map(res => res.json());
  }

  getLocals(ev: any) {
    let val = ev.target.value;
    if (val && val.trim().length > 3) {
      this.autocomplete(val)
        .subscribe(res => {
          this.locals = res.predictions;
        });
    } else {
      this.locals = [];
    }
  }

  detail(item) {
    this.locals = [];
    console.log(item);
  }

}
