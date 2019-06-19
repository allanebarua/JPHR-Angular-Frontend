import { ParticipantsService } from './../../services/participants.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-my-providers',
  templateUrl: './my-providers.component.html',
  styleUrls: ['./my-providers.component.css']
})
export class MyProvidersComponent implements OnInit {

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
    let ret = await this.participantsService.getProviders();

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
