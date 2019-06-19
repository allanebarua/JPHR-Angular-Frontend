import { SummaryMedicalRecordsManagementServiceService } from './../../services/summary-medical-records-management-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertMessage } from './../../common/interfaces';
import { FormBuilder, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-summary-record',
  templateUrl: './update-summary-record.component.html',
  styleUrls: ['./update-summary-record.component.css']
})
export class UpdateSummaryRecordComponent implements OnInit {
  @Input() childMessage: any;
  updateRecordForm: FormGroup;
  payload: any;
  alertMessage: AlertMessage;
  allergies: string[];
  submitBtn = true;
  otherInfo = [];
  A: string;
  B: string;
  AB: string;
  O: string;

  @Output() doneEvent = new EventEmitter<string>();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private summaryMedicalRecordsManagementServiceService: SummaryMedicalRecordsManagementServiceService
  ) {

    // Defining Update Health record form
    this.updateRecordForm = this.fb.group({
      bloodGroup: [''],
      allergies: [''],
      about: [''],
      body: [''],
    });

    // Instanciate alert message
    this.alertMessage = {
      heading: 'Instructions: ',
      body: 'Carefully update the record where applicable: You can delete and Add A record Here',
      style: 'alert-info'
    };

    // Instanciate allergies array
    this.allergies = [];
  }


  async updateRecord() {
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
      const ret = this.summaryMedicalRecordsManagementServiceService.updateRecord(this.payload);
      this.updateRecordForm.reset();
      this.otherInfo = [];
      this.allergies = [];
      this.submitBtn = true;

      if (ret) {
        // successiful.
        this.alertMessage.heading = 'Success: ';
        this.alertMessage.body = 'Record Created sucessifuly';
        this.alertMessage.style = 'alert-success';

        // Go to parent table
        this.doneEvent.emit('sucess');
      } else {
        // Error during AP1 call
        this.alertMessage.heading = 'Error: ';
        this.alertMessage.body = 'An unexpected error occured, kindly try again';
        this.alertMessage.style = 'alert-danger';
      }
    }

  }

  async validateForm() {
    if (this.updateRecordForm.value.bloodGroup === '') {this.updateRecordForm.value.bloodGroup = this.childMessage.bloodGroup; }
    if (this.updateRecordForm.valid) {
      // sanitize allergies
      if (this.updateRecordForm.value.allergies.trim() !== '' &&
          this.updateRecordForm.value.allergies.trim() !== this.allergies[this.allergies.length - 1]) {
        this.allergies.push(this.updateRecordForm.value.allergies.trim());
      }

      // sanitize otherinfo
      if (this.updateRecordForm.value.about.trim() !== '' &&
        this.updateRecordForm.value.body.trim() !== '' &&
        this.otherInfo.length === 0) {

        this.otherInfo.push(
          {
            about: this.updateRecordForm.value.about.trim(),
            body: this.updateRecordForm.value.body.trim().replace(/\n/g, ',')
          }
        );
      }

      if ( this.otherInfo.length > 0 &&
        this.updateRecordForm.value.about.trim() !== this.otherInfo[this.otherInfo.length - 1].about &&
        this.updateRecordForm.value.body.trim().replace(/\n/g, ',') !== this.otherInfo[this.otherInfo.length - 1].body) {
            this.otherInfo.push(
              {
                about: this.updateRecordForm.value.about.trim(),
                body: this.updateRecordForm.value.body.trim().replace(/\n/g, ',')
              }
            );
        }

      for (let i=0; i< this.otherInfo.length; i++) {
        if (this.otherInfo[i].about.trim() === '') {
          this.otherInfo.splice(i, 1);
          i--;
          continue;
        }
        this.otherInfo[i].$class = 'org.jphr.network.OtherInfo';
      }

      // new summary records payload
      this.payload = {
        bloodGroup: this.updateRecordForm.value.bloodGroup,
        allergies: this.allergies,
        otherInfo: this.otherInfo,
        healthRecordId: this.childMessage.summaryMedicalRecordId,
        emergencyContacts: this.childMessage.emergencyContacts
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

  async loadData() {
    await this.sleep();
    if (this.childMessage.bloodGroup === 'Blood Group A') {this.A = 'selected';}
    if (this.childMessage.bloodGroup === 'Blood Group B') {this.B = 'selected';}
    if (this.childMessage.bloodGroup === 'Blood Group AB') {this.AB = 'selected';}
    if (this.childMessage.bloodGroup === 'Blood Group O') {this.O = 'selected';}

    this.allergies = this.childMessage.allergies;
    this.otherInfo = this.childMessage.otherInfo;
  }

  sleep() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }

  ngOnInit() {
    this.loadData();
  }
}
