import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../auth.service';

import { filter, pairwise } from 'rxjs/operators';
import { UtilityService } from '../../Utility-shared/utility.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private location: Location,
              private authService: AuthService,
              private utilityService: UtilityService,
              private router: Router,
              private route: ActivatedRoute) { }


  onLogout() {
    this.utilityService.audioPlaySevice('', '0', false);
    this.authService.logout();

  }

  onStay() {
    this.location.back();
  }
}
