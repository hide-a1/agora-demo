import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss'],
})
export class EntranceComponent implements OnInit {
  teamId: string;

  channelControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(30),
  ]);

  user$: Observable<User> = this.authService.user$;

  constructor(
    private authService: AuthService,
    public meetingService: MeetingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  joinChannel(uid: string): void {
    const channelId = this.channelControl.value;
    this.router.navigateByUrl(`/${channelId}/${uid}`);
  }
}
