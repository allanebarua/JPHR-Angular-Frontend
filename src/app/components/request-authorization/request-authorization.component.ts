import { AuthorizationRequestService } from './../../services/authorization-request.service';
import { AlertMessage } from './../../common/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-request-authorization',
  templateUrl: './request-authorization.component.html',
  styleUrls: ['./request-authorization.component.css']
})
export class RequestAuthorizationComponent implements OnInit {

  requestAccessForm: FormGroup;
  authData: any;
  submitBtn = true;
  alertMessage: AlertMessage;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authorizationRequestService: AuthorizationRequestService
  ) {

    // Define signup form.
    // Defining the signup form
    this.requestAccessForm = this.fb.group({
      subject: ['', [Validators.required, Validators.email]],
      read: [''],
      create: [''],
      update: [''],
      delete: [''],
      reason: ['', [Validators.required]]
    });

    // Default Message.
    this.alertMessage = {
      heading: 'Instructions: ',
      body: 'Enter the patient\'s email as subject',
      style: 'alert-info'
    };
  }


  async requestAccess() {

    this.submitBtn = false;
    // Validate form
    if (!(await this.validateForm())) {
      this.alertMessage.heading = 'Error: ';
      this.alertMessage.body = 'Please fill all the required fields correctly.';
      this.alertMessage.style = 'alert-danger';
      this.submitBtn = true;
    } else {

      // Create auth payload
      if(!(await this.createAuthPayload())) {
        this.alertMessage.heading = 'Error: ';
        this.alertMessage.body = 'An authorization should have atleast one access right.';
        this.alertMessage.style = 'alert-danger';
        this.submitBtn = true;
      } else {
        // Call service to grant access.
        this.alertMessage.heading = 'Running: ';
        this.alertMessage.body = 'KIndly wait...';
        const ret = await this.authorizationRequestService.createAuthRequest(this.authData);
        if (ret) {
          this.alertMessage.heading = 'Instructions: ';
          this.alertMessage.body = 'Request sent successfully';
          this.alertMessage.style = 'alert-success';
        } else {
          this.alertMessage.heading = 'Error: ';
          this.alertMessage.body = 'Error while submitting, try again later';
          this.alertMessage.style = 'alert-danger';
        }
        this.requestAccessForm.reset();
        this.submitBtn = true;
        console.log(ret);
      }
    }
  }


  async validateForm() {
    return (this.requestAccessForm.valid);
  }


  async createAuthPayload() {

    // Satinize Reasons
    let reasons = this.requestAccessForm.value.reason.split('\n');
    let myreasons = []
    for (let reason of reasons) {
      if (reason.trim() === '') {
        continue;
      }
      myreasons.push(reason.trim());
    }

    this.authData = {
      patient: this.requestAccessForm.value.subject,
      accessRights: [],
      reason: myreasons,
      type: 'new access'
    };

    if (this.requestAccessForm.value.read) { this.authData.accessRights.push('Read'); }
    if (this.requestAccessForm.value.create) { this.authData.accessRights.push('Create'); }
    if (this.requestAccessForm.value.update) { this.authData.accessRights.push('Update'); }
    if (this.requestAccessForm.value.delete) { this.authData.accessRights.push('Delete'); }
    console.log(this.authData);
    return (this.authData.accessRights.length > 0);
  }


  ngOnInit() {
  }

}
