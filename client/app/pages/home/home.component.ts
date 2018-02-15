import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
  }

  calcMeanPoints(knoledge): string {
    var sumValues = Object.entries(knoledge).slice(1, 26).reduce(function(sum, value) {
      sum[1] = parseInt(sum[1]) + parseInt(value[1]) + '';
      return sum;
    });
    var mean = parseInt(sumValues[1]) / 25.0;
    var stars = "";
    for (var i = 0; i < 5; i++) {
      if (mean <= i)
        stars += '<i class="fa fa-star-o" aria-hidden="true"></i> ';
      else
        stars += '<i class="fa fa-star" aria-hidden="true"></i> ';
    }
    return stars;
  }

  getStars(rate) {
    let rating = '';
    for (let i = 0; i < 5; i++) {
      if (i < rate)
        rating += '<span class="icon"><i class="fa fa-star"></i></span>';
      else
        rating += '<span class="icon"><i class="fa fa-star-o"></i></span>';
    }
    return rating;
  }

}
