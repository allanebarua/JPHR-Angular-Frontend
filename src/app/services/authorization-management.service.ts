import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationManagementService {

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

  public async manageAuthorization(authData) {
    // Call api to create participant
    // console.log(participantData);
    try {
      const result = await this.http.post(`${this.apiUrl}authorization_management`, authData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }


  public async getAuthorizations() {
    // Call api to create participant
    // console.log(participantData);
    try {
      const result = await this.http.get(`${this.apiUrl}authorization_management`, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
