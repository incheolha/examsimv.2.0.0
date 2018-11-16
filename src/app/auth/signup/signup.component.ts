

import { User } from './../user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { UtilityService } from './../../Utility-shared/utility.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  permission = 'teacher';
  signUpForm: FormGroup;
  isLoading = false;
  loadingSubscription: Subscription;

  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
  constructor(private fb: FormBuilder,
              private authServie: AuthService,
              private router: Router,
              private utilityService: UtilityService
            ) {}

  ngOnInit() {
    this.loadingSubscription = this.utilityService.loadingStateChanged.subscribe(loadingStatus => {
                                this.isLoading = loadingStatus;
                                });

    this.signUpForm = this.fb.group({
                      name: [''],
                      email: ['', Validators.required],
                      password: ['', [Validators.required,
                                      Validators.minLength(6)
                                    ]],
                      permissionTag: ['student']
                  });
  }

  onSubmit() {

    const user = new User(this.signUpForm.value.email,
                          this.signUpForm.value.password,
                          this.signUpForm.value.name,
                          this.signUpForm.value.permissionTag);

    this.authServie.signup(user).subscribe( data => {
                            this.router.navigateByUrl('/');
                          },
                  error => console.error(error)
     );
    this.signUpForm.reset();
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
