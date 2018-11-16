
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../auth.service';
import { UtilityService } from './../../Utility-shared/utility.service';

import { User } from './../user.model';
import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';

  teacherAuth = false;
  isLoading = false;

  private loadingSubscriptiion: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private utilityService: UtilityService
              ) {}

  ngOnInit() {

    console.log('this is the login clicked');
    this.loadingSubscriptiion = this.utilityService.loadingStateChanged.subscribe(loadingStatus => {
      this.isLoading = loadingStatus;
    });

    this.loginForm = this.fb.group({
                      email: ['', Validators.required],
                      password: ['', [Validators.required,
                                      Validators.minLength(6)
                                ]]
                    });
    }

  onSubmit() {
    console.log(this.loginForm.value.email);
    const user = new User(this.loginForm.value.email,
                          this.loginForm.value.password);

    this.authService.login(user).subscribe( data => {
                                                      this.router.navigate(['/']);
                                                    },
                                                    error => { console.log(error); });
    this.loginForm.reset();
  }

  ngOnDestroy() {
    this.loadingSubscriptiion.unsubscribe();
  }
}
