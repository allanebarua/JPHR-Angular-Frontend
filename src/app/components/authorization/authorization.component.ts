import { AuthorizationManagementService } from './../../services/authorization-management.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  grantAccessForm: FormGroup;
  authData: any;
  currentAuthData: any;
  grantsubmitted = true;
  message: any;
  authList = true;
  alertType = 'alert-info';
  dataToUpdate: any;
  submitBtn = true;
  revokeThis: any;
  fetchingData = true;
  noData = false;
  yesData = false;
  showNotifier = false;

  // Set parent message
  parentMessage = {
    participantType: 'Patient',
    owner: 'userEmail'
  };

  noAuthMessage = {
    notFound: 'No Authorization Data'
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authorizationManagementService: AuthorizationManagementService
  ) {

    // Define signup form.
    // Defining the signup form
    this.grantAccessForm = this.fb.group({
      subject: ['', [Validators.required, Validators.email]],
      read: [''],
      create: [''],
      update: [''],
      delete: [''],
    });

    // Default Message.
    this.message = {
      heading: 'Instructions: ',
      body: "Enter the care provider's email as subject."
    }

    // revokeThis!
    this.revokeThis = {
      accessRights: [],
      careProviderId: 'e'
    };
  }


  async grantAccess() {

    this.submitBtn = false;
    // Validate form
    if (!(await this.validateForm())) {
      this.message.heading = 'Error: ';
      this.message.body = 'Please fill all the required fields correctly.';
      this.alertType = 'alert-danger';
      this.submitBtn = true;
    } else {

      // Create auth payload
      if(!(await this.createAuthPayload())) {
        this.message.heading = 'Error: ';
        this.message.body = 'An authorization should have atleast one access right.';
        this.alertType = 'alert-danger';
        this.submitBtn = true;
      } else {
        // Call service to grant access.
        this.message.heading = 'Running: ';
        this.message.body = 'KIndly wait...';
        const ret = await this.authorizationManagementService.manageAuthorization(this.authData);
        if (ret) {
          this.grantAccessForm.reset();
          this.message.heading = 'Success: ';
          this.message.body = 'Access to medical records granted';
          this.alertType = 'alert-success';
          this.submitBtn = true;
        } else {
          this.grantAccessForm.reset();
          this.message.heading = 'Error: ';
          this.message.body = 'Error while submitting';
          this.alertType = 'alert-danger';
          this.submitBtn = true;
        }
        console.log(ret);
      }

    }
  }


  async setnotificationStyle() {
    const myClasses = {
      alert: true,
      'alert-info': this.message.heading !== 'Error',
      'alert-danger': this.message.heading === 'Error',
      'alert-dismissible': true
    };
    return myClasses;
  }

  setViewToHome() {
    this.authList = true;
  }


  async validateForm() {
    return (this.grantAccessForm.valid);
  }


  async createAuthPayload() {

    this.authData = {
      action: 'Grant',
      authBlock: [
        {
          $class: 'org.jphr.network.Authorization',
          careProviderId: this.grantAccessForm.value.subject,
          accessRights: []
        }
      ]
    };
    if (this.grantAccessForm.value.read) { this.authData.authBlock[0].accessRights.push('Read'); }
    if (this.grantAccessForm.value.create) { this.authData.authBlock[0].accessRights.push('Create'); }
    if (this.grantAccessForm.value.update) { this.authData.authBlock[0].accessRights.push('Update'); }
    if (this.grantAccessForm.value.delete) { this.authData.authBlock[0].accessRights.push('Delete'); }
    return (this.authData.authBlock[0].accessRights.length > 0);
  }


  async getAuthorizations() {

    this.fetchingData = true;
    this.noData = false;
    this.yesData = false;
    // Retrieve all health records of the current participant.
    const ret = await this.authorizationManagementService.getAuthorizations();
    console.log(ret);
    if (ret) {
      this.currentAuthData = ret[0];

      if (this.currentAuthData.authorization.length === 0) {
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


  updateAccessRights(record, owner) {
    this.dataToUpdate = {
      authorization: record,
      authID: owner
    };
    this.authList = false;
  }


  async revokeAccessRights(authdata) {
    this.showNotifier = true;
    // Revoke access right here
    const payload = {
      action: 'Revoke',
      authBlock: [
        {
          $class: 'org.jphr.network.Authorization',
          careProviderId: authdata,
          accessRights: []
        }
      ]
    };

    let ret = await this.authorizationManagementService.manageAuthorization(payload);
    this.showNotifier = false;
    console.log(ret);

  }


  setRevokeThis(authdata) {
    this.revokeThis = authdata;
    console.log(this.revokeThis);
  }


  receiveMessage($event) {
    this.authList = $event;
  }


  ngOnInit() {
    // Get auth data
    this.getAuthorizations();
  }
}
