import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary-record-list-view',
  templateUrl: './summary-record-list-view.component.html',
  styleUrls: ['./summary-record-list-view.component.css']
})
export class SummaryRecordListViewComponent implements OnInit {

  @Input() summaryRecord: any;
  healthRecords: any;
  parentMessage = {
    participantType: 'Patient',
    notFound: 'No Summary Health Record Found'
  };
  recordToView: any;
  recordToUpdate: any;
  view = 'list-view';

  constructor() { }

  async getSummaryMedicalRecords() {
    this.healthRecords = [
      {
        healthRecord : {
          bloodGroup: 'BLOOD GROUP A+',
          allergies: ['treat1jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', 'treat2', 'treat3'],
          otherInfo: [
            {
              about: 'header1',
              body: 'body1'
            },
          ],
        },
        accessRights: ['Read', 'Delete', 'Update'],
        owner: {
          name: 'allan',
          age: 10,
          phone: '0780987887e',
          email: 'allanebarua@gmail.com'
        }
      },
      {
        healthRecord : {
          bloodGroup: 'BLOOD GROUP A+',
          allergies: ['treat1jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', 'treat2', 'treat3'],
          otherInfo: [
            {
              about: 'header1',
              body: 'body1'
            },
          ],
        },
        accessRights: ['Read', 'Delete', 'Update'],
        owner: {
          name: 'allan',
          age: 10,
          phone: '0780987887e',
          email: 'allanebarua@gmail.com'
        }
      },
      {
        healthRecord : {
          bloodGroup: 'BLOOD GROUP A+',
          allergies: ['treat1jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', 'treat2', 'treat3'],
          otherInfo: [
            {
              about: 'header1',
              body: 'body1'
            },
          ],
        },
        accessRights: ['Read', 'Delete', 'Update'],
        owner: {
          name: 'allan',
          age: 10,
          phone: '0780987887e',
          email: 'allanebarua@gmail.com'
        }
      },
    ];

    for (let healthRecord of this.healthRecords) {
      if (!healthRecord.accessRights.includes('Update')) {healthRecord.update = 'btn-disable'; }
    }

  }


  setRecordToUpdate(record) {
    this.recordToUpdate = record;
    this.view = 'update-record';
  }

  setRecordToView(record) {
    this.recordToView = record;
    this.view = 'detailed-view';
  }

  ngOnInit() {
    this.getSummaryMedicalRecords();
  }

}
