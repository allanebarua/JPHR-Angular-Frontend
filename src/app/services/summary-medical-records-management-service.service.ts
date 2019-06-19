import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SummaryMedicalRecordsManagementServiceService {

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

  public async createRecord(summaryHealthRecordData) {
    // Call api to create healthRecord
    // console.log(summaryHealthRecordData);
    try {
      const result = await this.http.post(`${this.apiUrl}summary_record_management`, summaryHealthRecordData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }


  public async getRecord() {
    // Call api to get healthrecords
    try {
      const result = await this.http.get(`${this.apiUrl}summary_record_management`, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }


  public async getOneRecord(recordId) {
    // Call api to get healthrecords
    try {
      const result = await this.http.post(`${this.apiUrl}get_one_record`, recordId, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async updateRecord(summaryHealthRecordData) {
    // Call api to create healthRecord
    // console.log(summaryHealthRecordData);
    try {
      const result = await this.http.put(`${this.apiUrl}summary_record_management`, summaryHealthRecordData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

