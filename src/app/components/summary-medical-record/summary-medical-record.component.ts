import { SummaryMedicalRecordsManagementServiceService } from './../../services/summary-medical-records-management-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { AlertMessage } from './../../common/interfaces';
import { FormBuilder, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-summary-medical-record',
  templateUrl: './summary-medical-record.component.html',
  styleUrls: ['./summary-medical-record.component.css']
})
export class SummaryMedicalRecordComponent implements OnInit {
  @Input() myParentMessage: any;
  createRecordForm: FormGroup;
  payload: any;
  alertMessage: AlertMessage;
  allergies: string[];
  submitBtn = true;
  otherInfo = [];
  fetchingData = true;
  noData = false;
  yesData = false;
  healthRecords: any;
  page: string;
  sumPage = 'first';
  emergencyContact: any;

  parentMessage = {
    notFound: 'No Summary Medical Records Found'
  };


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private summaryMedicalRecordsManagementServiceService: SummaryMedicalRecordsManagementServiceService
  ) {

    // Defining Update Health record form
    this.createRecordForm = this.fb.group({
      owner: ['', [Validators.email]],
      bloodGroup: ['', [Validators.required]],
      allergies: [''],
      about: [''],
      body: [''],
    });

    // Instanciate alert message
    this.alertMessage = {
      heading: 'Instructions: ',
      body: 'Carefully update the record where applicable',
      style: 'alert-info'
    };

    // Instanciate allergies array
    this.allergies = [];

    this.emergencyContact = [];
  }


  async createRecord() {
    this.submitBtn = false;
    // Validate the form data
    if (!(await this.validateForm())) {
      // Invalid form submitted
      this.alertMessage.heading = 'Error: ';
      this.alertMessage.body = 'Fill all the required fields';
      this.alertMessage.style = 'alert-danger';
      this.submitBtn = true;
    } else {
      // Instanciate alert message
      this.alertMessage.heading = 'Instructions: ';
      this.alertMessage.body = 'Update in progress kindly wait ... ';
      this.alertMessage.style = 'alert-info';

      // Call create record service.
      const ret = await this.summaryMedicalRecordsManagementServiceService.createRecord(this.payload);
      this.createRecordForm.reset();
      this.otherInfo = [];
      this.allergies = [];
      this.submitBtn = true;
      console.log(ret);

      if (ret) {
        // successiful.
        this.alertMessage.heading = 'Success: ';
        this.alertMessage.body = 'Record Created sucessifuly';
        this.alertMessage.style = 'alert-success';
      } else {
        // Error during AP1 call
        this.alertMessage.heading = 'Error: ';
        this.alertMessage.body = 'An unexpected error occured, kindly try again';
        this.alertMessage.style = 'alert-danger';
      }
    }

  }

  async validateForm() {
    if (this.myParentMessage.participantType === 'Patient') {
      this.createRecordForm.value.owner = 'test@gmail.com';
    }
    if (this.createRecordForm.valid && this.emergencyContact.length > 0) {

      // sanitize allergies
      if (this.createRecordForm.value.allergies.trim() !== '' &&
          this.createRecordForm.value.allergies.trim() !== this.allergies[this.allergies.length - 1]) {
        this.allergies.push(this.createRecordForm.value.allergies.trim());
      }

      // sanitize otherinfo
      if (this.createRecordForm.value.about.trim() !== '' &&
        this.createRecordForm.value.body.trim() !== '' &&
        this.otherInfo.length === 0) {

        this.otherInfo.push(
          {
            about: this.createRecordForm.value.about.trim(),
            body: this.createRecordForm.value.body.trim().replace(/\n/g, ',')
          }
        );
      }

      if ( this.otherInfo.length > 0 &&
        this.createRecordForm.value.about.trim() !== this.otherInfo[this.otherInfo.length - 1].about &&
        this.createRecordForm.value.body.trim().replace(/\n/g, ',') !== this.otherInfo[this.otherInfo.length - 1].body) {
            this.otherInfo.push(
              {
                about: this.createRecordForm.value.about.trim(),
                body: this.createRecordForm.value.body.trim().replace(/\n/g, ',')
              }
            );
        }

      for (let i=0; i< this.otherInfo.length; i++) {
        this.otherInfo[i].$class = 'org.jphr.network.OtherInfo';
      }

      // new summary recors payload
      this.payload = {
        bloodGroup: this.createRecordForm.value.bloodGroup,
        allergies: this.allergies,
        otherInfo: this.otherInfo,
        owner: this.createRecordForm.value.owner,
        emergencyContacts: this.emergencyContact
      };
      console.log(this.payload);
      return true;
    }
    return false;
  }


  addAllergy(allergy) {
    // console.log(this.allergies);
    if (allergy.trim() !== '') {
      this.allergies.push(allergy.trim());
    }
    ( document.getElementById('allergies') as HTMLInputElement).value = '';
  }

  removeAllergy(index) {
    this.allergies.splice(index, 1);
  }


  addOtherInfo(a, b) {
    if (a.trim() !== '' && b.trim() !== '') {
      // console.log(b);
      this.otherInfo.push(
        {
          about: a.trim(),
          body: b.trim().replace(/\n/g, ',')
        }
      );
      // console.log(this.otherInfo);
    }

    ( document.getElementById('body') as HTMLInputElement).value = '';
    ( document.getElementById('about') as HTMLInputElement).value = '';
  }


  removeOtherinfo(index) {
    this.otherInfo.splice(index, 1);
  }


  async getSummaryMedicalRecord() {

    this.fetchingData = true;
    this.noData = false;
    this.yesData = false;
    // Retrieve all health records of the current participant.
    let ret = await this.summaryMedicalRecordsManagementServiceService.getRecord();

    console.log(ret);
    if (ret) {
      this.healthRecords = ret;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.healthRecords.length; i++) {
        // setting the disable property
        if (!this.healthRecords[i].accessRights.includes('Read')) {this.healthRecords[i].read = 'btn-disable'; }
        if (!this.healthRecords[i].accessRights.includes('Delete')) {this.healthRecords[i].delete = 'btn-disable'; }
        if (!this.healthRecords[i].accessRights.includes('Update')) {this.healthRecords[i].update = 'btn-disable'; }
      }

      if (this.healthRecords.length > 0 ) {
        this.yesData = true;
      } else {
        this.noData = true;
      }
      this.fetchingData = false;
    }

    else {
      this.fetchingData = false;
      this.yesData = false;
      this.noData = true;
    }
  }

  pageToShow(page) {
    this.page = page;
  }

  toggleEntryForm(page) {
    this.sumPage = page;
  }

  addContactRecord(desg1, desg2, desg3, desg4, name, phone, email) {

    let myDesignation = '';
    for (let desg of [desg1, desg2, desg3, desg4]) {
      if (desg.selected) {
        myDesignation = desg.value;
        break;
      }
    }

    // sanity check
    if (
      name.trim() == '' || phone.trim() == '' || email.trim() == '' || myDesignation == ''
    ) {
      console.log('error');
    }
    else {
      this.emergencyContact.push(
        {
          $class: 'org.jphr.network.EmergencyContact',
          designation: myDesignation,
          phone: phone.trim(),
          name: name.trim(),
          email: email.trim()
        }
      );
    }
    console.log(this.emergencyContact);
    ( document.getElementById('phone') as HTMLInputElement).value = '';
    ( document.getElementById('name') as HTMLInputElement).value = '';
    ( document.getElementById('email') as HTMLInputElement).value = '';
  }

  ngOnInit() {
    this.getSummaryMedicalRecord();
    this.page = this.myParentMessage.participantType === 'CareProvider' ? 'owner' : 'mainRecord';
  }

}
