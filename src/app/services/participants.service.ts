import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

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


  public async getProviders() {
    // Call api to get healthrecords
    try {
      const result = await this.http.get(`${this.apiUrl}get_providers`, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }


  public async getPatients() {
    // Call api to get healthrecords
    try {
      const result = await this.http.get(`${this.apiUrl}get_patients`, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
