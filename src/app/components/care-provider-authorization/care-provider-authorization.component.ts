import { AuthorizationManagementService } from './../../services/authorization-management.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-care-provider-authorization',
  templateUrl: './care-provider-authorization.component.html',
  styleUrls: ['./care-provider-authorization.component.css']
})
export class CareProviderAuthorizationComponent implements OnInit {

  currentAuthData: any;
  fetchingData = true;
  noData = false;
  yesData = false;
  authList = true;
  dataToUpdate: any;
  noAuthMessage = {
    notFound: 'No Authorization Data'
  }

  constructor(
    private authorizationManagementService: AuthorizationManagementService
  ) { }


  async getAuthorizations() {

    this.fetchingData = true;
    this.noData = false;
    this.yesData = false;
    // Retrieve all health records of the current participant.
    const ret = await this.authorizationManagementService.getAuthorizations();
    console.log(ret);
    if (ret) {
      this.currentAuthData = ret;
      if (this.currentAuthData.length === 0) {
        this.fetchingData = false;
        this.yesData = false;
        this.noData = true;
      }
      else {
        this.fetchingData = false;
        this.noData = false;
        this.yesData = true;
      }
    }
    else {
      this.fetchingData = false;
      this.yesData = false;
      this.noData = true;
    }
  }

  requestMoreRights(record, owner) {
    this.dataToUpdate = {
      authorization: record,
      authID: owner
    };
    this.authList = false;
  }

  receiveMessage($event) {
    this.authList = true;
  }


  ngOnInit() {
    // Get auth data
    this.getAuthorizations();
  }

}
