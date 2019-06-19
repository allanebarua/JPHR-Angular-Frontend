import { Component, OnInit } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { IdentityManagementService } from '../../services/identity-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-care-provider',
  templateUrl: './care-provider.component.html',
  styleUrls: ['./care-provider.component.css']
})
export class CareProviderComponent implements OnInit {
  parentMessage: any;
  pageToshow = 'health';
  healthClicked = true;
  summaryClicked = false;
  authClicked = false;
  notClicked = false;
  patientsClicked = false;
  careProvider: any;

  constructor(
    public persistenceService: PersistenceService,
    private identityManagementService: IdentityManagementService,
    private router: Router
  ) {

    this.careProvider = this.persistenceService.get('user', StorageType.SESSION);
    // Message to be sent to the health records component
    this.parentMessage = {
      participantType: 'CareProvider',
      owner: 'userEmail'
    };
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


  setPage(page) {
    // Set page to show
    this.pageToshow = page;

    // set button click background
    this.healthClicked = this.summaryClicked = this.authClicked = this.notClicked = this.patientsClicked = false;
    if (page === 'health') {this.healthClicked = true; }
    if (page === 'summary') {this.summaryClicked = true; }
    if (page === 'authorization') {this.authClicked = true; }
    if (page === 'notification') {this.notClicked = true; }
    if (page === 'patients') {this.patientsClicked = true; }
  }
}
