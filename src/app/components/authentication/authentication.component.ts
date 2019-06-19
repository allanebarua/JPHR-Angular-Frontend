import { AlertMessage } from './../../common/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityManagementService } from '../../services/identity-management.service';
import { PersistenceService, StorageType } from 'angular-persistence';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  @Input() participantType: string;
  signUpForm: FormGroup;
  providerData: any;
  identityData: any;
  networkIdentity: any;
  loginForm: FormGroup;
  loginData: any;
  loggedin: boolean;
  participantData: any;
  memberDetailsEntry = true;
  alertmessage: AlertMessage;
  formToshow = 'signup';
  currentUserEmail = '';
  btnStyle1 = 'button-normal';
  btnStyle2 = 'button-clicked';
  submitBtn = true;
  submitBtn2 = true;
  myData: any;

  @Output() doneEvent = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private identityManagementService: IdentityManagementService,
    private persistenceService: PersistenceService
  ) {

    // Define signup form.
    // Defining the signup form
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      gender: ['Male', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      town: ['', [Validators.required]],
      box: ['', [Validators.required]],
      code: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      providerType: ['Phycisian']
    });

    // Defining login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: []
    });

    // Defining alert Message
    this.alertmessage = {
      heading: 'Instructions: ',
      body: 'Create new account or login with existing account',
      style: 'alert-info'
    };
  }


  toggleUserAction(action) {
    if (action === 'signup') {
      this.memberDetailsEntry = true;
      this.btnStyle1 = 'button-normal';
      this.btnStyle2 = 'button-clicked';
    }

    if (action === 'signin') {
      this.btnStyle1 = 'button-clicked';
      this.btnStyle2 = 'button-normal';
    }
    this.formToshow = action;
  }


  async signUp() {
    // Validate the data
    this.submitBtn = false;
    if (!this.signUpForm.valid) {
      this.alertmessage.heading = 'Error: ';
      this.alertmessage.body = 'Please fill all the required fields correctly';
      this.alertmessage.style = 'alert-danger';
      this.submitBtn = true;
    }

    else if(this.signUpForm.value.pass1 !== this.signUpForm.value.pass2) {
      this.alertmessage.heading = 'Error: ';
      this.alertmessage.body = 'Passwords do no match.';
      this.alertmessage.style = 'alert-danger';
      this.submitBtn = true;
    }

    else {

      this.alertmessage.heading = 'Message: ';
      this.alertmessage.body = 'Please wait as the account is being created ...';
      this.alertmessage.style = 'alert-info';

      this.participantData = {
        participantType: this.participantType,
        title: 'Mr',
        firstName: this.signUpForm.value.firstName,
        middleName: '',
        lastName: this.signUpForm.value.lastName,
        gender: this.signUpForm.value.gender,
        email: this.signUpForm.value.email,
        phone: [this.signUpForm.value.phone],
        box: this.signUpForm.value.box,
        town: this.signUpForm.value.town,
        postalCode: this.signUpForm.value.code,
        password: this.signUpForm.value.pass1,
        providerType: this.signUpForm.value.providerType,
        dob: this.signUpForm.value.dob
      };

      console.log(new Date(this.participantData.dob));

      // Send data to service
      const res = await this.identityManagementService.createParticipant(this.participantData);
      if (res) {
        this.alertmessage.heading = 'Success: ';
        this.alertmessage.body = 'Account created succesifully';
        this.alertmessage.style = 'alert-success';
      } else {
        this.alertmessage.heading = 'Error: ';
        this.alertmessage.body = 'An error occured while creating the account, please try again.';
        this.alertmessage.style = 'alert-danger';
      }
      this.signUpForm.reset();
      this.submitBtn = true;
    }
  }


  async signIn() {
    // Validate the data
    this.submitBtn2 = false;
    if (this.loginForm.valid) {
        this.loginData = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
          participantType: this.participantType
        };
        const res = await this.identityManagementService.loginParticipant(this.loginData);
        if (res) {
          this.myData = res;
          console.log('user me', res);
          this.persistenceService.set('user', this.myData, {type: StorageType.SESSION});
          if(this.participantType === 'Patient') {
            this.router.navigate(['/patient']);
          } else if (this.participantType === 'CareProvider') {
            this.router.navigate(['/provider']);
          }

        } else {
          this.alertmessage.heading = 'Error: ';
          this.alertmessage.body = 'Wrong email or password';
          this.alertmessage.style = 'alert-danger';
        }
    } else {
        this.alertmessage.heading = 'Error: ';
        this.alertmessage.body = 'Fill all the fields correctly';
        this.alertmessage.style = 'alert-danger';
    }
    this.submitBtn2 = true;
  }

  inputLogginCredentialts(action, email) {
    this.memberDetailsEntry = action;
    this.currentUserEmail = email;
  }

  goHome() {
    this.doneEvent.emit('sucess');
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
