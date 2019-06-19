import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  @Input() childMessage: any;
  constructor() { }

  ngOnInit() {
  }

}
