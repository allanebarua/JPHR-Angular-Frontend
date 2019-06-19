import { HealthrecordManagementService } from './../../services/healthrecord-management.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-health-record',
  templateUrl: './view-health-record.component.html',
  styleUrls: ['./view-health-record.component.css']
})
export class ViewHealthRecordComponent implements OnInit {

  @Input() childMessage: any;
  viewRecord = true;
  dataToUpdateRecordComponent: any;
  dataToView = 'symptoms';
  createdBy: any;
  @Output() doneEvent = new EventEmitter<string>();


  constructor(
    private healthrecordManagementService: HealthrecordManagementService
  ) { }

  deleteRecord() {
    this.healthrecordManagementService.deleteHealthRecord({healthRecordId: this.childMessage.healthRecord.healthRecordId});
    this.doneEvent.emit('sucess');
  }

  updateRecord() {
    // Update the record
    this.viewRecord = false;
  }

  toggleView(view) {
    this.dataToView = view;
  }

  ngOnInit() {
    this.dataToUpdateRecordComponent = this.childMessage.healthRecord;
    const s = this.childMessage.healthRecord.createdBy;
    this.createdBy = {
      participant: s.slice(s.lastIndexOf('#') + 1),
      participantType: s.search('CareProvider') !== -1 ? 'CareProvider' : 'Patient',
    }
  }

}
