import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class CommonService {

	constructor(private httpClient: HttpClient) {
	}

	getDataHour() {
		return this.httpClient.get('http://localhost:8081/api/getDataHour');
	}

	getRecentReading() {
		return this.httpClient.get('http://localhost:8081/api/getRecentReading');
	}


	getDataSixHours() {
		return this.httpClient.get('http://localhost:8081/api/getDataSixHours');
	}

	getDataTwelveHours() {
		return this.httpClient.get('http://localhost:8081/api/getDataTwelveHours');
	}

	getData24Hours() {
		return this.httpClient.get('http://localhost:8081/api/getData24Hours');
	}

	getData3Days() {
		return this.httpClient.get('http://localhost:8081/api/getData3Days');
	}

	truncate() {
		return this.httpClient.delete('http://localhost:8081/api/truncate');
	}
}
