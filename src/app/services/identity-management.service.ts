import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdentityManagementService {

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

  public async createParticipant(participantData) {
    // Call api to create participant
    // console.log(participantData);
    try {
      const result = await this.http.post(`${this.apiUrl}signup`, participantData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async loginParticipant(loginData) {
    // Call api to login participant
    try {
      const result = await this.http.post(`${this.apiUrl}login`, loginData, this.options).toPromise();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async logoutParticipant(loginData) {
    // Call api to login participant
    try {
      const result = await this.http.post(`${this.apiUrl}logout`, loginData, this.options).toPromise();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
