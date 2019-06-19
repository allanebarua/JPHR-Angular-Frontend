import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HealthrecordManagementService {
  private apiUrl = 'http://localhost:5000/api/';
  private headers: any;
  private options: any;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.options = {
      headers: this.headers,
      withCredentials: true
    };
  }

  public async createHealthRecord(healthRecordData) {
    // Call api to create healthRecord
    // console.log(healthRecordData);
    try {
      const result = await this.http.post(`${this.apiUrl}health_record_management`, healthRecordData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }


  public async getHealthRecord() {
    // Call api to get healthrecords
    try {
      const result = await this.http.get(`${this.apiUrl}health_record_management`, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async updateHealthRecord(healthRecordData) {
    // Call api to create healthRecord
    // console.log(healthRecordData);
    try {
      const result = await this.http.put(`${this.apiUrl}health_record_management`, healthRecordData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async deleteHealthRecord(healthRecordData) {
    // Call api to create healthRecord
    // console.log(healthRecordData);
    try {
      const result = await this.http.post(`${this.apiUrl}delete_health_record`, healthRecordData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

