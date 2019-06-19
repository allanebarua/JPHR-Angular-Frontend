import { AlertMessage } from './../../common/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { HealthrecordManagementService } from './../../services/healthrecord-management.service';


@Component({
  selector: 'app-create-health-record',
  templateUrl: './create-health-record.component.html',
  styleUrls: ['./create-health-record.component.css']
})
export class CreateHealthRecordComponent implements OnInit {

  // Class variable declaration
  @Input() childMessage: any;
  healthRecord: any;
  createRecordForm: FormGroup;
  noDataMessage = 'No Health Records to Display';
  message: any;
  alertType = 'alert-info';
  submitBtn = true;
  newhealthRecord: any;
  page = 'owner';
  disabledPreviousBtn = 'not';
  inputDiagnosis = [];
  alertMessage: AlertMessage;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private healthrecordManagementService: HealthrecordManagementService
  ) {

    // Defining Create Health record form
    this.createRecordForm = this.fb.group({
      symptoms: ['', [Validators.required]],
      procedure: [''],
      result: [''],
      treatment: ['', [Validators.required]],
      owner: ['', [Validators.email]],
    });

    // Default Message.
    this.message = {
      heading: 'Instructions: ',
      body: 'Press enter after every medical treatment'
    };
  }


  async createRecord() {
    this.submitBtn = false;
    this.alertType = 'alert-info';
    // Validate submitted form.
    if (!(await this.validateForm())) {
      this.alertMessage.heading = 'Error: ';
      this.alertMessage.body = 'Please fill the required fields correctly';
      this.alertMessage.style = 'alert-danger';
      this.submitBtn = true;
    } else {
      // Call service to grant access.
      this.alertMessage.heading = 'Running: ';
      this.alertMessage.body = 'Kindly wait...';
      this.alertMessage.style = 'alert-info';

      console.log(this.newhealthRecord);
      // Call create record service.
      let ret = await this.healthrecordManagementService.createHealthRecord(this.newhealthRecord);
      this.createRecordForm.reset();
      this.inputDiagnosis = [];
      this.page = this.childMessage.participantType === 'Patient' ? 'symptoms' : 'owner';
      this.submitBtn = true;

      if (ret) {
        this.alertMessage.heading = 'Success: ';
        this.alertMessage.body = 'Record was created successifully';
        this.alertMessage.style = 'alert-success';
      } else {
        this.alertMessage.heading = 'Error: ';
        this.alertMessage.body = 'An error occured, Try again after sometime';
        this.alertMessage.style = 'alert-danger';
      }
    }
  }


  async validateForm() {
      if (this.childMessage.participantType === 'Patient') {
        this.createRecordForm.value.owner = 'test@gmail.com';
      }

      if (this.createRecordForm.valid) {
        // sanitize symptoms
        const mySymptoms = this.createRecordForm.value.symptoms.split('\n');
        for (let i = 0; i < mySymptoms.length; i++) {
          if (mySymptoms[i].trim() === '') {
            mySymptoms.splice(i,1);
            i--;
            continue;
          }
          mySymptoms[i] = mySymptoms[i].trim();
        }

        // sanitize treatments
        const myTreatments = this.createRecordForm.value.treatment.split('\n');
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
          this.createRecordForm.value.procedure.trim() !== '' &&
          this.createRecordForm.value.result.trim() !== ''
          ) {

            this.inputDiagnosis.push(
              {
                $class: 'org.jphr.network.Diagnosis',
                procedure: this.createRecordForm.value.procedure.trim(),
                result: this.createRecordForm.value.result.trim()
              }
            );
        }

        if (this.inputDiagnosis.length > 0 &&
          this.createRecordForm.value.procedure.trim() !== '' &&
          this.createRecordForm.value.procedure.trim() !== this.inputDiagnosis[this.inputDiagnosis.length - 1].procedure &&
          this.createRecordForm.value.result.trim() !== '' &&
          this.createRecordForm.value.result.trim() !== this.inputDiagnosis[this.inputDiagnosis.length - 1].result) {

            this.inputDiagnosis.push(
              {
                $class: 'org.jphr.network.Diagnosis',
                procedure: this.createRecordForm.value.procedure.trim(),
                result: this.createRecordForm.value.result.trim()
              }
            );
        }

        if (this.inputDiagnosis.length === 0) {return false; }

        // new symptoms payload
        this.newhealthRecord = {
          symptoms: mySymptoms,
          treatment: myTreatments,
          owner: this.createRecordForm.value.owner,
          diagnosis: this.inputDiagnosis,
        };
        return true;
      }
      return false;
  }


  getFormValidationErrors() {
    Object.keys(this.createRecordForm.controls).forEach(key => {

    const controlErrors: ValidationErrors = this.createRecordForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
  }


  pageToShow(page) {
    // Change Message
    this.alertMessage.heading = 'Instructions: ';
    this.alertMessage.style = 'alert-info';

    if (page === 'owner') { this.alertMessage.body = 'Enter the patient\'s email as owner'; }
    if (page === 'symptoms') { this.alertMessage.body = 'Press enter after every physical symptom'; }
    if (page === 'diagnosis') { this.alertMessage.body = 'Enter the patient\'s diagnostic procedure and result'; }
    if (page === 'treatment') { this.alertMessage.body = 'Press enter after every medical treatment'; }

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

  ngOnInit() {
    if (this.childMessage.participantType === 'Patient') {
      // Set Default Message
      this.alertMessage = {
        heading: 'Instructions: ',
        body: 'Press enter after every symptom',
        style: 'alert-info'
      };

      // Make the owner part visible
      this.page = 'symptoms';

      // add disable on symptom previous btn.
      this.disabledPreviousBtn = 'disabledPreviousBtn';
    } else {
      // Default Message
      this.alertMessage = {
        heading: 'Instruction: ',
        body: 'Enter the patient\'s email as owner',
        style: 'alert-info'
      };

      this.page = 'owner';
    }
  }
}
