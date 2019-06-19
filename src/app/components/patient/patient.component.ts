import { Component, OnInit } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { IdentityManagementService } from '../../services/identity-management.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  pageToshow = 'health';
  healthClicked = true;
  summaryClicked = false;
  authClicked = false;
  notClicked = false;
  recordClicked = false;
  providersClicked = false;
  parentMessage: any;
  patient: any;

  constructor(
    public persistenceService: PersistenceService,
    private identityManagementService: IdentityManagementService,
    private router: Router
  ) {

    this.patient = this.persistenceService.get('user', StorageType.SESSION);
    console.log('my user', this.patient);

    // Set parent message
    this.parentMessage = {
      participantType: 'Patient',
      owner: 'userEmail'
    };
  }

  setPage(page) {
    // Set page to show
    this.pageToshow = page;

    // set button click background
    this.healthClicked = this.summaryClicked = this.authClicked = this.notClicked = this.recordClicked = this.providersClicked =  false;
    if (page === 'health') {this.healthClicked = true; }
    if (page === 'summary') {this.summaryClicked = true; }
    if (page === 'authorization') {this.authClicked = true; }
    if (page === 'notification') {this.notClicked = true; }
    if (page === 'reports') {this.recordClicked = true; }
    if (page === 'providers') {this.providersClicked = true; }
  }

  async logout() {
    const res = await this.identityManagementService.logoutParticipant({});
    this.persistenceService.removeAll(StorageType.SESSION);
    if (res) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
