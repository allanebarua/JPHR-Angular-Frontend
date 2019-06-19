import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationRequestService {

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


  /**
   *
   * @param authData grant access data
   */
  public async grantByRequest(authData) {
    try {
      const result = await this.http.post(`${this.apiUrl}grant_from_request`, authData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }


  public async getAuthorizationRequests() {
    try {
      const result = await this.http.get(`${this.apiUrl}authorization_request`, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  /**
   *
   * @param authData authorization request id
   */
  public async deleteRequest(authData) {
    try {
      const result = await this.http.post(`${this.apiUrl}authorization_request_delete`, authData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }


  /**
   *
   * @param authData authorization request id
   */
  public async declineRequest(authData) {
    try {
      const result = await this.http.put(`${this.apiUrl}authorization_request`, authData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }


  /**
   *
   * @param authData grant access data
   */
  public async createAuthRequest(authData) {
    try {
      const result = await this.http.post(`${this.apiUrl}authorization_request`, authData, this.options).toPromise();
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }

}
