import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { HealthrecordManagementService } from './../../services/healthrecord-management.service';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.css']
})

export class HealthRecordsComponent implements OnInit {

  // Declaring class variables
  @Input() myParentMessage: any;
  updateRecordsf1: FormGroup;
  updateRecordsf2: FormGroup;
  diagnosisInput = false;
  procedureInput = false;
  treatmentInput = false;
  submitBtn = true;
  showForm1 = true;
  recordToUpdate: any;
  participantType = 'Patient';
  newhealthRecord: any;
  viewAll = true;
  recordToView: any;
  currentPatientData: any;
  active = 'fade';
  showUpdateRecord = false;
  viewOne = false;
  fetchingData = true;
  noData = false;
  yesData = false;
  recordToDelete: any;

  parentMessage = {
    participantType: 'Patient',
    notFound: 'No Health Record Found'
  };
  healthRecords: any;

  constructor(
    private healthrecordManagementService: HealthrecordManagementService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.healthRecords = [
      {
        diagnosis : {description: 'what'},
        procedure: {description: 'what'},
        treatment: {descriptiochosenn: 'what'}
      }
    ];

    // Update record form1
    this.updateRecordsf1 = this.fb.group({
      changeDiagnosis: [''],
      changeProcedure: [''],
      changeTreatment: ['']
    });

    // update record form2
    this.updateRecordsf2 = this.fb.group({
      diagnosis: [''],
      procedure: [''],
      treatment: [''],
      owner: ['', [Validators.email]],
    });
  }

  async getHealthRecords() {
    this.fetchingData = true;
    this.noData = false;
    this.yesData = false;
    // Retrieve all health records of the current participant.
    let ret = await this.healthrecordManagementService.getHealthRecord();

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

  async getUpdateOptions() {
    const optionsToUpdate = [];
    // check if atleast one option chosen
    if (this.updateRecordsf1.value.changeDiagnosis) { optionsToUpdate.push('changeDiagnosis'); this.diagnosisInput = true; }
    if (this.updateRecordsf1.value.changeProcedure) { optionsToUpdate.push('changeProcedure'); this.procedureInput = true; }
    if (this.updateRecordsf1.value.changeTreatment) { optionsToUpdate.push('changeTreatment'); this.treatmentInput = true; }

    // Cover for no option choosen

    // Ideal situation
    if (optionsToUpdate.length > 0) {
      this.showForm1 = false;
      // console.log(this.recordToUpdate);
    }

  }


  async updateRecord() {
    // Validate the form
    if (!this.validateForm()) {
      // Handle form errors
    } else {
      console.log(this.newhealthRecord);
      const ret = await this.healthrecordManagementService.updateHealthRecord(this.newhealthRecord);
      console.log(ret);
    }

  }

  setRecordToDelete(id) {
    this.recordToDelete = id;
    console.log(id);
  }

  async deleteRecord() {
    // Delete the record
    const ret = await this.healthrecordManagementService.deleteHealthRecord({healthRecordId: this.recordToDelete});
    await this.getHealthRecords();
  }


  async validateForm() {
    if (this.participantType === 'Patient') {
      this.updateRecordsf2.value.owner = 'test@gmail.com';
    }

    // Creating update payload
    if (this.updateRecordsf2.valid) {
      this.newhealthRecord = {
        healthRecordId: this.recordToUpdate.healthRecordId,
        diagnosis: (this.updateRecordsf2.value.diagnosis !== '') ?
                    this.updateRecordsf2.value.diagnosis : this.recordToUpdate.diagnosis.description,
        procedure: (this.updateRecordsf2.value.procedure !== '') ?
                    this.updateRecordsf2.value.procedure : this.recordToUpdate.procedure.description,
        treatment: (this.updateRecordsf2.value.treatment !== '') ?
                    this.updateRecordsf2.value.treatment : this.recordToUpdate.treatment.description,
        owner: this.updateRecordsf2.value.owner
      };
      return true;
    }
    return false;
}



  setMyStyles(option) {
    // set the input style
    const styles = {
      'pointer-events': 'none'
    };

    if (option === 1 && !this.diagnosisInput) {return styles; }
    if (option === 2 && !this.procedureInput) {return styles; }
    if (option === 3 && !this.treatmentInput) {return styles; } else { return; }
  }


  setRecordToUpdate(record) {
    // Set record to be passed to update component
    this.recordToUpdate = record;
    // console.log(this.recordToUpdate);

    // Change page to update
    this.viewAll = false;
    this.showUpdateRecord = true;
  }


  setRecordToView(record) {
    // set record to be passed to view component
    this.recordToView = record;

    // change page to view one record
    this.viewAll = false;
    this.viewOne = true;
  }

  setViewToHome() {
    this.showUpdateRecord = false;
    this.viewOne = false;
    this.viewAll = true;
  }


  async afterdelete($event) {
    await this.getHealthRecords();
    this.showUpdateRecord = false;
    this.viewOne = false;
    this.viewAll = true;
  }

  ngOnInit() {
    // Get health record data
    this.getHealthRecords();
  }

}
