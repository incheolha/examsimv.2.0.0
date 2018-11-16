import { Component, OnInit, Input } from '@angular/core';
import { ProfileInfo } from '../../../profile.model';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

  // @Input() profileInfo: ProfileInfo;

  @Input() profileInfo: ProfileInfo;
  constructor() { }

  ngOnInit() {
  }

}
