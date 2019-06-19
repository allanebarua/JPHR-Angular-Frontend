import { Component, OnInit, Input } from '@angular/core';
import { SummaryMedicalRecordsManagementServiceService } from './../../services/summary-medical-records-management-service.service';


@Component({
  selector: 'app-summary-record-detailed-view',
  templateUrl: './summary-record-detailed-view.component.html',
  styleUrls: ['./summary-record-detailed-view.component.css']
})
export class SummaryRecordDetailedViewComponent implements OnInit {

  @Input() summaryRecord: any;
  dataToView = 'primary';
  viewRecord = true;
  recordAvailable = true;
  constructor(
    private summaryMedicalRecordsManagementServiceService: SummaryMedicalRecordsManagementServiceService
  ) {

  }

  toggleView(view) {
    this.dataToView = view;
  }


  async getSummaryMedicalRecord() {

    this.recordAvailable = false;

    // Retrieve all health records of the current participant.
    let ret = await this.summaryMedicalRecordsManagementServiceService.getOneRecord(
      {id: this.summaryRecord.healthRecord.summaryMedicalRecordId}
    );

    if (ret) {
      this.summaryRecord.healthRecord = ret;
    }
    console.log(ret);
    this.recordAvailable = true;
  }


  setViewToHome(event) {
    this.viewRecord = true;
  }


  updateRecord() {
    this.viewRecord = false;
  }


  ngOnInit() {
    console.log(this.summaryRecord);
  }

}
