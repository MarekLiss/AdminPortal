import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-primary-transaction',
  templateUrl: './primary-transaction.component.html',
  styleUrls: ['./primary-transaction.component.css']
})

export class PrimaryTransactionComponent implements OnInit {
  
  
  depositDates = [];
  username: string;
  primaryTransactionList: Object[];
  amounts: Object[];
  chart = [];

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.params.forEach((params: Params) => {
      this.username = params['username'];
    });

    this.getPrimaryTransactionList();
  }

  getPrimaryTransactionList() {
    this.userService.getPrimaryTransactionList(this.username).subscribe(
      res => {
        console.log(JSON.parse(JSON.stringify(res))._body);
        this.primaryTransactionList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
        this.amounts = JSON.parse(res['_body']).map(res => res.amount);
        let dates = JSON.parse(res['_body']).map(res => res.date);
        dates.forEach((date) => {this.depositDates.push(new Date(date).toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}));
            this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.depositDates,
            datasets: [
              {
                data: this.amounts,
                borderColor: '#3cba9f',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        });
        });
      },
      error => console.log(error)
    );
  }

  ngOnInit() {

  }

}
