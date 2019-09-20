import {Component, OnInit} from '@angular/core';
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
	hotF = 0
	coldF = 0
	hotC = 0
	coldC = 0
	t = {}
	hotHum = 0
	coldHum = 0
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
					// gridLines: {
					// 	color: 'rgba(255,255,255,0.2)',
					// },
					ticks: {
						steps: 8,
						stepValue: 10,
						max: 120,
						min: 60,
						fontColor: "white"
					},
					scaleLabel: {
						display: true,
						labelString: '°F',
						fontColor: 'white'
					}

				}
			],
			xAxes: [
				{
					ticks: {
						fontColor: 'white'
					}
				}
			]
		},
		legend: {
			display: true,
			reverse: true,
			labels: {
				fontColor: 'white'
			}
		}
	};
	public lineChartColors: Color[] = [
		{ // grey
			backgroundColor: 'rgba(0,130,255,.8)',
			borderColor: 'rgb(0,136,177)',
			pointBackgroundColor: 'rgb(255,255,255)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
		{ // red
			backgroundColor: 'rgba(255,0,0,.5)',
			borderColor: 'red',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},


	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [];


	//  HUMIDITY VVV
	public humidityLineChartData: ChartDataSets[];
	public humidityLineChartLabels: Label[];
	public humidityLineChartOptions: any = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					id: 'y-axis-0',
					position: 'left',
					// gridLines: {
					// 	color: 'rgba(255,255,255,0.2)',
					// },
					ticks: {
						fontColor: 'white',
						steps: 5,
						stepValue: 10,
						max: 70,
						min: 10
					},
					scaleLabel: {
						display: true,
						labelString: '%',
						fontColor: 'white'
					}

				}
			],
			xAxes: [
				{
					ticks: {
						fontColor: 'white'
					}
				}
			]
		},
		legend: {
			labels: {
				fontColor: 'white'
			}
		}

	};
	public humidityLineChartColors: Color[] = [
		{ // red
			backgroundColor: 'rgba(255,0,0,.5)',
			borderColor: 'red',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
		{ // grey
			backgroundColor: 'rgba(0,130,255,.8)',
			borderColor: 'rgb(0,136,177)',
			pointBackgroundColor: 'rgb(255,255,255)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},


	];
	public humidityLineChartLegend = true
	public humidityLineChartType = 'line';
	public humidityLineChartPlugins = [];


	constructor(private service: CommonService) {
	}

	ngOnInit() {
		this.getCurrentReading();
		this.getDataTwelveHours();
		// this.getDataSixHours();
		// this.truncate();
	}

	getDataHour() {
		this.service.getDataHour().subscribe(res => {
			this.data = res;
			console.log(res);

			let timeList = [];
			let hotTempList = [];
			let hotHumList = [];
			let coldTempList = [];
			let coldHumList = [];

			this.data = this.data.reverse()
			for (var i = 0; i < this.data.length; i++) {
				let date = new Date(this.data[i].time);
				if (date.getMinutes() % 5 === 0) {

					if (!this.isAnomaly(this.data[i])) {
						let time = new Date(this.data[i].time);

						timeList.push(time.toLocaleTimeString(navigator.language, {
							hour: '2-digit',
							minute: '2-digit'
						}));

						hotTempList.push((9.0 / 5.0 * this.data[i].hotTemperature + 32).toFixed(2));
						hotHumList.push((this.data[i].hotHumidity).toFixed(2));

						coldTempList.push((9.0 / 5.0 * this.data[i].coldTemperature + 32).toFixed(2));
						coldHumList.push((this.data[i].coldHumidity).toFixed(2));
					} else {
						try {
							let time = new Date(this.data[i + 1].time);

							timeList.push(time.toLocaleTimeString(navigator.language, {
								hour: '2-digit',
								minute: '2-digit'
							}));

							hotTempList.push((9.0 / 5.0 * this.data[i + 1].hotTemperature + 32).toFixed(2));
							hotHumList.push((this.data[i + 1].hotHumidity).toFixed(2));

							coldTempList.push((9.0 / 5.0 * this.data[i + 1].coldTemperature + 32).toFixed(2));
							coldHumList.push((this.data[i + 1].coldHumidity).toFixed(2));
						} catch (error) {
							console.error(error);
						}
					}
				}

			}
			console.log(this.data)


			this.lineChartData = [
				{data: coldTempList, label: 'Cool Area'},
				{data: hotTempList, label: 'Basking Area'},
			];

			this.humidityLineChartData = [
				{data: hotHumList, label: 'Basking Area'},
				{data: coldHumList, label: 'Cool Area'},
			];


			this.humidityLineChartLabels = timeList;
			this.lineChartLabels = timeList;


			this.isLoaded = true;
		});
	}

	getDataSixHours() {
		this.service.getDataSixHours().subscribe(res => {


			this.data = res;
			console.log(this.data)


			let timeList = [];
			let hotTempList = [];
			let hotHumList = [];
			let coldTempList = [];
			let coldHumList = [];


			this.data = this.data.reverse();
			console.log(this.data.length);
			for (var i = 0; i < this.data.length; i++) {
				let date = new Date(this.data[i].time);
				if (date.getMinutes() % 30 === 0) {
					if (!this.isAnomaly(this.data[i])) {
						let time = new Date(this.data[i].time);

						timeList.push(time.toLocaleTimeString(navigator.language, {
							hour: '2-digit',
							minute: '2-digit'
						}));

						hotTempList.push((9.0 / 5.0 * this.data[i].hotTemperature + 32).toFixed(2));
						hotHumList.push((this.data[i].hotHumidity).toFixed(2));

						coldTempList.push((9.0 / 5.0 * this.data[i].coldTemperature + 32).toFixed(2));
						coldHumList.push((this.data[i].coldHumidity).toFixed(2));
					} else {
						try {
							let time = new Date(this.data[i + 1].time);

							timeList.push(time.toLocaleTimeString(navigator.language, {
								hour: '2-digit',
								minute: '2-digit'
							}));

							hotTempList.push((9.0 / 5.0 * this.data[i + 1].hotTemperature + 32).toFixed(2));
							hotHumList.push((this.data[i + 1].hotHumidity).toFixed(2));

							coldTempList.push((9.0 / 5.0 * this.data[i + 1].coldTemperature + 32).toFixed(2));
							coldHumList.push((this.data[i + 1].coldHumidity).toFixed(2));
						} catch (error) {
							console.error(error);
						}
					}

				}

			}

			this.lineChartData = [
				{data: coldTempList, label: 'Cool Area'},
				{data: hotTempList, label: 'Basking Area'},

			];

			this.humidityLineChartData = [
				{data: hotHumList, label: 'Basking Area'},
				{data: coldHumList, label: 'Cool Area'},
			];


			this.humidityLineChartLabels = timeList;
			this.lineChartLabels = timeList;
			this.isLoaded = true;

		});
	}

	getDataTwelveHours() {
		this.service.getDataTwelveHours().subscribe(res => {


			this.data = res;
			console.log(this.data)


			let timeList = [];
			let hotTempList = [];
			let hotHumList = [];
			let coldTempList = [];
			let coldHumList = [];


			this.data = this.data.reverse();
			console.log(this.data.length);
			for (var i = 0; i < this.data.length; i++) {
				let date = new Date(this.data[i].time);
				if (date.getMinutes() === 0) {

					if (!this.isAnomaly(this.data[i])) {
						let time = new Date(this.data[i].time);

						timeList.push(time.toLocaleTimeString(navigator.language, {
							hour: '2-digit',
							minute: '2-digit'
						}));

						hotTempList.push((9.0 / 5.0 * this.data[i].hotTemperature + 32).toFixed(2));
						hotHumList.push((this.data[i].hotHumidity).toFixed(2));

						coldTempList.push((9.0 / 5.0 * this.data[i].coldTemperature + 32).toFixed(2));
						coldHumList.push((this.data[i].coldHumidity).toFixed(2));
					} else {
						try {
							let time = new Date(this.data[i + 1].time);

							timeList.push(time.toLocaleTimeString(navigator.language, {
								hour: '2-digit',
								minute: '2-digit'
							}));

							hotTempList.push((9.0 / 5.0 * this.data[i + 1].hotTemperature + 32).toFixed(2));
							hotHumList.push((this.data[i + 1].hotHumidity).toFixed(2));

							coldTempList.push((9.0 / 5.0 * this.data[i + 1].coldTemperature + 32).toFixed(2));
							coldHumList.push((this.data[i + 1].coldHumidity).toFixed(2));
						} catch (error) {
							console.error(error);
						}
					}

				}

			}

			this.lineChartData = [
				{data: coldTempList, label: 'Cool Area'},
				{data: hotTempList, label: 'Basking Area'},
			];

			this.humidityLineChartData = [
				{data: hotHumList, label: 'Basking Area'},
				{data: coldHumList, label: 'Cool Area'},
			];


			this.humidityLineChartLabels = timeList;
			this.lineChartLabels = timeList;
			this.isLoaded = true;

		});
	}

	getData24Hours() {
		this.service.getData24Hours().subscribe(res => {


			this.data = res;
			console.log(this.data)


			let timeList = [];
			let hotTempList = [];
			let hotHumList = [];
			let coldTempList = [];
			let coldHumList = [];


			this.data = this.data.reverse();
			console.log(this.data.length);
			let everyOther = true;
			for (var i = 0; i < this.data.length; i++) {
				let date = new Date(this.data[i].time);
				if (date.getMinutes() === 0) {
					if (everyOther) {
						if (!this.isAnomaly(this.data[i])) {
							let time = new Date(this.data[i].time);

							timeList.push(time.toLocaleTimeString(navigator.language, {
								hour: '2-digit',
								minute: '2-digit'
							}));

							hotTempList.push((9.0 / 5.0 * this.data[i].hotTemperature + 32).toFixed(2));
							hotHumList.push((this.data[i].hotHumidity).toFixed(2));

							coldTempList.push((9.0 / 5.0 * this.data[i].coldTemperature + 32).toFixed(2));
							coldHumList.push((this.data[i].coldHumidity).toFixed(2));
						} else {
							try {
								let time = new Date(this.data[i + 1].time);

								timeList.push(time.toLocaleTimeString(navigator.language, {
									hour: '2-digit',
									minute: '2-digit'
								}));

								hotTempList.push((9.0 / 5.0 * this.data[i + 1].hotTemperature + 32).toFixed(2));
								hotHumList.push((this.data[i + 1].hotHumidity).toFixed(2));

								coldTempList.push((9.0 / 5.0 * this.data[i + 1].coldTemperature + 32).toFixed(2));
								coldHumList.push((this.data[i + 1].coldHumidity).toFixed(2));
							} catch (error) {
								console.error(error);
							}
						}
						everyOther = false
					} else {
						everyOther = true;
					}

				}

			}

			this.lineChartData = [
				{data: coldTempList, label: 'Cool Area'},
				{data: hotTempList, label: 'Basking Area'},
			];

			this.humidityLineChartData = [
				{data: hotHumList, label: 'Basking Area'},
				{data: coldHumList, label: 'Cool Area'},
			];


			this.humidityLineChartLabels = timeList;
			this.lineChartLabels = timeList;
			this.isLoaded = true;

		});
	}


	getData3Days() {
		this.service.getData3Days().subscribe(res => {


			this.data = res;
			console.log(this.data)


			let timeList = [];
			let hotTempList = [];
			let hotHumList = [];
			let coldTempList = [];
			let coldHumList = [];


			this.data = this.data.reverse();
			console.log(this.data.length);
			let every3 = 3;
			for (var i = 0; i < this.data.length; i++) {
				let date = new Date(this.data[i].time);
				if (date.getMinutes() === 0) {
					if (every3 === 3) {
						if (!this.isAnomaly(this.data[i])) {
							let time = new Date(this.data[i].time);

							timeList.push(time.toLocaleTimeString(navigator.language, {
								hour: '2-digit',
								minute: '2-digit'
							}));

							hotTempList.push((9.0 / 5.0 * this.data[i].hotTemperature + 32).toFixed(2));
							hotHumList.push((this.data[i].hotHumidity).toFixed(2));

							coldTempList.push((9.0 / 5.0 * this.data[i].coldTemperature + 32).toFixed(2));
							coldHumList.push((this.data[i].coldHumidity).toFixed(2));
						} else {
							try {
								let time = new Date(this.data[i + 1].time);

								timeList.push(time.toLocaleTimeString(navigator.language, {
									hour: '2-digit',
									minute: '2-digit'
								}));

								hotTempList.push((9.0 / 5.0 * this.data[i + 1].hotTemperature + 32).toFixed(2));
								hotHumList.push((this.data[i + 1].hotHumidity).toFixed(2));

								coldTempList.push((9.0 / 5.0 * this.data[i + 1].coldTemperature + 32).toFixed(2));
								coldHumList.push((this.data[i + 1].coldHumidity).toFixed(2));
							} catch (error) {
								console.error(error);
							}
						}
						every3 = 1
					} else {
						every3 += 1;
					}

				}

			}

			this.lineChartData = [
				{data: coldTempList, label: 'Cool Area'},
				{data: hotTempList, label: 'Basking Area'},
			];

			this.humidityLineChartData = [
				{data: hotHumList, label: 'Basking Area'},
				{data: coldHumList, label: 'Cool Area'},
			];


			this.humidityLineChartLabels = timeList;
			this.lineChartLabels = timeList;
			this.isLoaded = true;

		});
	}

	getCurrentReading() {
		this.service.getRecentReading().subscribe(res => {
			console.log(res)

			if (!this.isAnomaly(res[0])) {
				let time = new Date(res[0].time);

				this.hotC = res[0].hotTemperature;
				this.hotF = parseFloat((9.0 / 5.0 * this.hotC + 32).toFixed(0));
				this.hotHum = parseFloat((res[0].hotHumidity).toFixed(0));

				this.coldC = res[0].coldTemperature;
				this.coldF = parseFloat((9.0 / 5.0 * this.coldC + 32).toFixed(0));
				this.coldHum = parseFloat((res[0].coldHumidity).toFixed(0));

				this.t = time.toLocaleTimeString()
			} else {
				let time = new Date(res[1].time);

				this.hotC = res[1].hotTemperature;
				this.hotF = parseFloat((9.0 / 5.0 * this.hotC + 32).toFixed(0));
				this.hotHum = parseFloat((res[1].hotHumidity).toFixed(0));

				this.coldC = res[1].coldTemperature;
				this.coldF = parseFloat((9.0 / 5.0 * this.coldC + 32).toFixed(0));
				this.coldHum = parseFloat((res[1].coldHumidity).toFixed(0));

				this.t = time.toLocaleTimeString()

			}

		});
	}

	isAnomaly(data) {
		let flag = data.coldHumidity < 10 || data.hotHumidity < 10 || data.hotHumidity > 70 || data.coldHumidity > 70
		if(flag){
			console.log("ANOMALOUS DATA:");
			console.log(data);
		}

		return flag
	}

	truncate() {
		this.service.truncate().subscribe(res => {
			console.log(res)
		});
	}

}
