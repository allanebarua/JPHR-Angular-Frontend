import { AuthorizationManagementService } from './../../services/authorization-management.service';
import { AlertMessage } from './../../common/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-authorization',
  templateUrl: './update-authorization.component.html',
  styleUrls: ['./update-authorization.component.css']
})
export class UpdateAuthorizationComponent implements OnInit {
  @Input() childMessage: any;
  updateAccessForm: FormGroup;
  authData: any;
  submitBtn = true;
  alertMessage: AlertMessage;
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authorizationManagementService: AuthorizationManagementService
  ) {

    // Define signup form.
    // Defining the signup form
    this.updateAccessForm = this.fb.group({
      owner: [''],
      read: [''],
      create: [''],
      update: [''],
      delete: [''],
      provider: ['']
    });

    // Default Message.
    this.alertMessage = {
      heading: 'Instructions: ',
      body: 'check all access rights to grant to the care provider indicated',
      style: 'alert-info'
    };
  }


  async updateAccessRights(read, create, update, delet) {

    console.log(read, create, update, delet);
    this.submitBtn = false;
    // Validate form
    if (!(await this.validateForm(read, create, update, delet))) {
      this.alertMessage.heading = 'Error: ';
      this.alertMessage.body = 'An authorization should have atleast one access right.';;
      this.alertMessage.style = 'alert-danger';
      this.submitBtn = true;
    } else {

      // Create auth payload
      await this.createAuthPayload(read, create, update, delet);
      console.log(this.authData);
      // Call service to grant access.
      this.alertMessage.heading = 'Running: ';
      this.alertMessage.body = 'KIndly wait...';
      const ret = await this.authorizationManagementService.manageAuthorization(this.authData);

      if (ret) {
        this.alertMessage.heading = 'Instructions: ';
        this.alertMessage.body = 'Request sent successfully';
        this.alertMessage.style = 'alert-success';
        this.messageEvent.emit(true);
      } else {
        this.alertMessage.heading = 'Error: ';
        this.alertMessage.body = 'Error while submitting, try again later';
        this.alertMessage.style = 'alert-danger';
      }
      this.updateAccessForm.reset();
      this.submitBtn = true;
      console.log(ret);
    }
  }


  async validateForm(read, create, update, delet) {
    return read || create || create || update || delet;
  }


  async createAuthPayload(read, create, update, delet) {

    this.authData = {
      action: 'UpdateAccessRights',
      authBlock: [
        {
          $class: 'org.jphr.network.Authorization',
          careProviderId: this.childMessage.authorization.careProviderId,
          accessRights: []
        }
      ]
    };
    if (read) { this.authData.authBlock[0].accessRights.push('Read'); }
    if (create) { this.authData.authBlock[0].accessRights.push('Create'); }
    if (update) { this.authData.authBlock[0].accessRights.push('Update'); }
    if (delet) { this.authData.authBlock[0].accessRights.push('Delete'); }
  }

  async loadData() {
    await this.sleep();
    ( document.getElementById('owner') as HTMLInputElement).value = this.childMessage.authID;
    ( document.getElementById('provider') as HTMLInputElement).value = this.childMessage.authorization.careProviderId;
    ( document.getElementById('inlineCheckbox1') as HTMLInputElement).checked =
        this.childMessage.authorization.accessRights.includes('Read') ? true : false;

    ( document.getElementById('inlineCheckbox2') as HTMLInputElement).checked =
        this.childMessage.authorization.accessRights.includes('Create') ? true : false;

    ( document.getElementById('inlineCheckbox3') as HTMLInputElement).checked =
        this.childMessage.authorization.accessRights.includes('Update') ? true : false;

    ( document.getElementById('inlineCheckbox4') as HTMLInputElement).checked =
        this.childMessage.authorization.accessRights.includes('Delete') ? true : false;
  }

  sleep() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }


  ngOnInit() {
    this.loadData();
  }


}
