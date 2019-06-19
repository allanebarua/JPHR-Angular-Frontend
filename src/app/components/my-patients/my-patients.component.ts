import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from './../../services/participants.service';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css']
})
export class MyPatientsComponent implements OnInit {

  fetchingData = true;
  noData = false;
  yesData = false;
  providers: any;

  constructor(
    private participantsService: ParticipantsService
  ) { }


  async getProviderRecords() {
    this.fetchingData = true;
    this.noData = false;
    this.yesData = false;
    // Retrieve all health records of the current participant.
    let ret = await this.participantsService.getPatients();

    console.log(ret);
    if (ret) {
      this.providers = ret;

      if (this.providers.length > 0 ) {
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

  ngOnInit() {
    this.getProviderRecords();
  }

}
