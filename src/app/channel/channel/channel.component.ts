import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  uid: string;
  user$: Observable<User> = this.authService.user$;
  channelId$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('channelId'))
  );
  channelId: string;
  players: any;
  isPro;

  participants$: Observable<User[]> = this.channelId$.pipe(
    switchMap((params) => {
      this.channelId = params;
      return this.meetingService.getParticipants(this.channelId);
    })
  );

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        take(1),
        tap((param) => {
          this.channelId = param.get('channelId');
          this.uid = param.get('uid');
        })
      )
      .toPromise()
      .then(() => {
        this.meetingService.joinAgoraChannel(this.uid, this.channelId);
      });
    this.players = true;
  }

  async leaveChannel(): Promise<void> {
    this.meetingService.leaveAgoraChannel(this.channelId).then(() => {
      this.snackBar.open('退室しました');
    });
    this.router.navigateByUrl('/');
  }

  async publishAudio(): Promise<void> {
    this.meetingService.publishMicrophone().then(() => {
      this.snackBar.open('音声をオンにしました');
    });
    this.players = true;
  }

  async unPublishAudio(): Promise<void> {
    this.meetingService.unpublishMicrophone().then(() => {
      this.snackBar.open('音声をミュートしました');
    });
  }

  async publishVideo(): Promise<void> {
    this.meetingService.publishVideo();
    this.players = true;
  }

  async unPublishVideo(): Promise<void> {
    this.meetingService.unpublishVideo();
  }

  async publishScreen(): Promise<void> {
    this.meetingService.publishScreen().then(() => {
      this.snackBar.open('画面共有をオンにしました');
    });
  }

  async unPublishScreen(): Promise<void> {
    this.meetingService.unpublishScreen().then(() => {
      this.snackBar.open('画面共有をオフにしました');
    });
  }
}
