import { Component, OnInit } from '@angular/core';
import {CommonService} from "../common.service";
import {ChartDataSets, ChartOptions} from "chart.js";
import {Color, Label} from "ng2-charts";

@Component({
  selector: 'app-dragon',
  templateUrl: './dragon.component.html',
  styleUrls: ['./dragon.component.css']
})
export class DragonComponent implements OnInit {
  isLoaded = false;
  f = 0
  c = 0
  t = {}
  hum = 0
  data: any;

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
    yAxes: [
      {
        id: 'y-axis-0',
        position: 'left',
        ticks: {
          steps : 8,
          stepValue : 10,
          max : 130,
          min: 60
        }

      },
      {
        id: 'y-axis-1',
        position: 'right',
        gridLines: {
          color: 'rgba(45,170,255,0.82)',
        },
        ticks: {
          fontColor: 'rgba(45,170,255,0.82)',
          steps : 5,
          stepValue : 10,
          max : 50,
          min: 10
        }
      }
    ]}
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private service: CommonService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.service.getData().subscribe(res => {
      this.data = res;





    this.c = Math.round(res[0].temperature);
    this.f = Math.round(9.0 / 5.0 * this.c + 32);
    this.hum = Math.round(res[0].humidity);
    this.t = res[0].time;
    console.log(res);

      let tempList = []
      let timeList = []
      let humList = []
      for (let obj of this.data) {
        tempList.push(9.0 / 5.0 * obj.temperature + 32);
        timeList.push(obj.time);
        humList.push(obj.humidity);

      }
      console.log(this.data)

      this.lineChartData = [
        { data: tempList, label: 'Basking Area' },
        { data: humList, label: 'Humidity', yAxisID: 'y-axis-1' },

      ];

      this.lineChartLabels = timeList;



    this.isLoaded = true;
  })};

}
