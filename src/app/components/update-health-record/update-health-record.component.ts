import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { HealthrecordManagementService } from './../../services/healthrecord-management.service';
import { AlertMessage } from './../../common/interfaces';


@Component({
  selector: 'app-update-health-record',
  templateUrl: './update-health-record.component.html',
  styleUrls: ['./update-health-record.component.css']
})
export class UpdateHealthRecordComponent implements OnInit {

  @Input() updateChildMessage: any;
  healthRecord: any;
  updateRecordForm: FormGroup;
  alertType = 'alert-info';
  submitBtn = true;
  page = 'symptoms';
  newhealthRecord: any;
  disabledPreviousBtn = 'not';
  inputDiagnosis = [];
  alertMessage: AlertMessage;

  @Output() doneEvent = new EventEmitter<string>();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private healthrecordManagementService: HealthrecordManagementService
  ) {

    // Defining Create Health record form
    this.updateRecordForm = this.fb.group({
      symptoms: [''],
      procedure: [''],
      result: [''],
      treatment: [''],
    });

    // Default Message
    this.alertMessage = {
      heading: 'Instructions: ',
      body: 'The current Symptoms and Treatment data have been prefilled.',
      style: 'alert-info'
    };
  }


  async updateRecord() {
    this.submitBtn = false;
    this.alertType = 'alert-info';
    // Validate submitted form.
    if (!(await this.validateForm())) {
      this.alertMessage.heading = 'Error: ';
      this.alertMessage.body = 'Please fill the required fields';
      this.alertMessage.style = 'alert-danger';
      this.submitBtn = true;
    } else {
      // Call service to grant access.
      this.alertMessage.heading = 'Running: ';
      this.alertMessage.body = 'Kindly wait...';
      this.alertMessage.style = 'alert-info';

      console.log(this.newhealthRecord);
      // Call create record service.
      let ret = await this.healthrecordManagementService.updateHealthRecord(this.newhealthRecord);
      this.updateRecordForm.reset();
      this.page = 'symptoms';
      this.submitBtn = true;

      if (ret) {
        this.alertMessage.heading = 'Success: ';
        this.alertMessage.body = 'Record was Updated successifully';
        this.alertMessage.style = 'alert-success';
        this.doneEvent.emit('sucess');
      } else {
        this.alertMessage.heading = 'Error: ';
        this.alertMessage.body = 'An error occured, Try again after sometime';
        this.alertMessage.style = 'alert-danger';
      }
    }
  }


  async validateForm() {
      if (this.updateRecordForm.value.symptoms === '') {this.updateRecordForm.value.symptoms = this.updateChildMessage.symptoms; }
      if (this.updateRecordForm.value.treatment === '') {this.updateRecordForm.value.treatment = this.updateChildMessage.treatment; }

      // sanitize symptoms
      let mySymptoms = this.updateRecordForm.value.symptoms;
      mySymptoms = mySymptoms.constructor === Array ? mySymptoms : this.updateRecordForm.value.symptoms.split('\n');
      for (let i = 0; i < mySymptoms.length; i++) {
        if (mySymptoms[i].trim() === '') {
          mySymptoms.splice(i,1);
          i--;
          continue;
        }
        mySymptoms[i] = mySymptoms[i].trim();
      }


      // sanitize treatments
      let myTreatments = this.updateRecordForm.value.treatment;
      myTreatments = myTreatments.constructor === Array ? myTreatments : this.updateRecordForm.value.treatment.split('\n');
      for (let i = 0; i < myTreatments.length; i++) {
        if (myTreatments[i].trim() === '') {
          myTreatments.splice(i,1);
          i--;
          continue;
        }
        myTreatments[i] = myTreatments[i].trim();
      }


      // sanitize procedure and result
      if (this.inputDiagnosis.length === 0 &&
        this.updateRecordForm.value.procedure.trim() !== '' &&
        this.updateRecordForm.value.result.trim() !== ''
        ) {

          this.inputDiagnosis.push(
            {
              $class: 'org.jphr.network.Diagnosis',
              procedure: this.updateRecordForm.value.procedure.trim(),
              result: this.updateRecordForm.value.result.trim()
            }
          );
      }

      if (this.inputDiagnosis.length > 0 &&
        this.updateRecordForm.value.procedure.trim() !== '' &&
        this.updateRecordForm.value.procedure.trim() !== this.inputDiagnosis[this.inputDiagnosis.length - 1].procedure &&
        this.updateRecordForm.value.result.trim() !== '' &&
        this.updateRecordForm.value.result.trim() !== this.inputDiagnosis[this.inputDiagnosis.length - 1].result) {

          this.inputDiagnosis.push(
            {
              $class: 'org.jphr.network.Diagnosis',
              procedure: this.updateRecordForm.value.procedure.trim(),
              result: this.updateRecordForm.value.result.trim()
            }
          );
      }

      if (this.inputDiagnosis.length === 0) {return false; }

      // new symptoms payload
      this.newhealthRecord = {
        symptoms: mySymptoms,
        treatment: myTreatments,
        diagnosis: this.inputDiagnosis,
        healthRecordId: this.updateChildMessage.healthRecordId
      };

      console.log(this.newhealthRecord);

      return true;
  }


  pageToShow(page) {
    // Change Message
    this.alertMessage.heading = 'Instructions: ';
    this.alertMessage.style = 'alert-info';

    if (page === 'symptoms') { this.alertMessage.body = 'Update the record as required'; }
    if (page === 'diagnosis') { this.alertMessage.body = 'Update the patient\'s diagnostic procedure and result'; }

    // Change page to show
    this.page = page;
  }


  addDiagnosis(procedure, result) {
    if(procedure.trim() !== '' && result.trim() !== '') {

      this.inputDiagnosis.push(
        {
          $class: 'org.jphr.network.Diagnosis',
          procedure: procedure.trim(),
          result: result.trim()
        }
      );
    }

    ( document.getElementById('pro') as HTMLInputElement).value = '';
    ( document.getElementById('res') as HTMLInputElement).value = '';
  }

  removeDiagnosis(index) {
    this.inputDiagnosis.splice(index, 1);
  }

  async loadData(milliseconds) {
    await this.sleep(milliseconds);
    ( document.getElementById('symptoms') as HTMLInputElement).value = this.updateChildMessage.symptoms.join('\n');
    ( document.getElementById('treatments') as HTMLInputElement).value = this.updateChildMessage.treatment.join('\n');
    this.inputDiagnosis = this.updateChildMessage.diagnosis;
  }

  sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  ngOnInit() {
    this.loadData(300);
  }
}
