import { AuthorizationRequestService } from './../../services/authorization-request.service';
import { RequestAuthorizationComponent } from './../request-authorization/request-authorization.component';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-authorization-request-view',
  templateUrl: './authorization-request-view.component.html',
  styleUrls: ['./authorization-request-view.component.css']
})
export class AuthorizationRequestViewComponent implements OnInit {

  @Input() myParentMessage: any;
  authRequestData: any;
  runningAuthRequests = [];
  fetchingData = true;
  noData = false;
  yesData = false;
  idToDecline: string;
  idToDelete: string;
  notifierMessage: string;
  showNotifier = false;

  constructor(
    private authorizationRequestService: AuthorizationRequestService
  ) { }


  async filterChanged(filter, value) {

    if (filter === 'all') {
      // turn all the other filters on.
      ( document.getElementById('all') as HTMLInputElement).checked = value;
      ( document.getElementById('pending') as HTMLInputElement).checked = value;
      ( document.getElementById('declined') as HTMLInputElement).checked = value;
      ( document.getElementById('granted') as HTMLInputElement).checked = value;
    }

    const trueFilters = await this.revieveFilters();
    if (trueFilters.length !== 3) { ( document.getElementById('all') as HTMLInputElement).checked = false; }
    if(this.authRequestData) {
      await this.populateRunningRequests();
    }
  }


  async revieveFilters() {
    // Check all filters that are true.
    const trueFilters = [];
    if (( document.getElementById('pending') as HTMLInputElement).checked) {trueFilters.push('pending'); }
    if (( document.getElementById('declined') as HTMLInputElement).checked) {trueFilters.push('declined'); }
    if (( document.getElementById('granted') as HTMLInputElement).checked) {trueFilters.push('granted'); }

    return trueFilters;
  }

  async populateRunningRequests() {

    // simulate fetching of records
    this.fetchingData = true;
    this.noData = false;
    this.yesData = false;

    // reinitalizing running requests.
    this.runningAuthRequests = [];

    // Check all filters that are true.
    const trueFilters = [];
    if (( document.getElementById('pending') as HTMLInputElement).checked) {trueFilters.push('pending'); }
    if (( document.getElementById('declined') as HTMLInputElement).checked) {trueFilters.push('declined'); }
    if (( document.getElementById('granted') as HTMLInputElement).checked) {trueFilters.push('granted'); }

    console.log(trueFilters);

    // select only records that are required by the user.
    for (const authreq of this.authRequestData) {
      if (trueFilters.includes(authreq.state)) { this.runningAuthRequests.push(authreq); }
    }

    console.log(this.runningAuthRequests);

    if (this.runningAuthRequests.length > 0 ) {
      this.yesData = true;
    } else {
      this.noData = true;
    }
    this.fetchingData = false;
  }


  async getAuthorizationRequest() {

    this.fetchingData = true;
    this.noData = false;
    this.yesData = false;

    const ret = await this.authorizationRequestService.getAuthorizationRequests();
    console.log(ret)
    /* const ret = [
      {
        requestId: 1,
        patient: 'Allan@gmail.com',
        provider: 'steve@gmail.com',
        accessRights: [
          'Read', 'Delete', 'Update'
        ],
        type: 'More Access',
        state: 'pending'
      },

      {
        requestId: 1,
        patient: 'Allan@gmail.com',
        provider: 'steve@gmail.com',
        accessRights: [
          'Read', 'Delete'
        ],
        type: 'New Access',
        state: 'granted'
      },

      {
        requestId: 1,
        patient: 'Allan@gmail.com',
        provider: 'steve@gmail.com',
        accessRights: [
          'Read', 'Delete', 'Update', 'Create'
        ],
        type: 'New Access',
        state: 'declined'
      },

      {
        requestId: 1,
        patient: 'Allan@gmail.com',
        provider: 'steve@gmail.com',
        accessRights: [
          'Read'
        ],
        type: 'More Access',
        state: 'pending'
      }
    ]; */
    if (ret) {
      this.authRequestData = ret;
      await this.populateRunningRequests();
    }

    else {
      this.fetchingData = false;
      this.yesData = false;
      this.noData = true;
    }
  }

  setRecordToDecline(id) {
    // set the record to decline.
    this.idToDecline = id;
  }


  setRecordToDelete(id) {
    // set the record to decline.
    this.idToDelete = id;
  }

  async declineAccess() {
    // Call api to decline request.
    this.notifierMessage = 'Declining Access Request';
    this.showNotifier = true;
    console.error(this.idToDecline);
    const payload = {
      id: this.idToDecline,
      state: 'declined'
    }
    const ret = await this.authorizationRequestService.declineRequest(payload);
    this.showNotifier = false;
  }

  async grantAccess(authRequest) {
    this.notifierMessage = 'Granting Access';
    this.showNotifier = true;
    // Grant payload
    const payload = {
      grantAccess : {
        action: 'Grant',
        authBlock: [
          {
            $class: 'org.jphr.network.Authorization',
            careProviderId: authRequest.provider,
            accessRights: authRequest.accessRights
          }
        ]
      },
      updateData: {
        id: authRequest.requestId,
        state: 'granted'
      }
    };

    // Call api to grant
    const ret = await this.authorizationRequestService.grantByRequest(payload);
    console.log(ret);
    this.showNotifier = false;
  }


  async deleteAccessRequest() {
    // call Api to delete the request.
    this.notifierMessage = 'Deleting Access Request';
    this.showNotifier = true;
    const ret = await this.authorizationRequestService.deleteRequest({id: this.idToDelete});
    this.showNotifier = false;
  }


  async onLoad() {
    await this.filterChanged('all', true);
  }

  ngOnInit() {
    this.getAuthorizationRequest().then(
      () => {
        this.onLoad();
      }
    );
  }

}
