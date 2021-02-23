import { Component, OnInit } from '@angular/core';
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
  user$: Observable<User> = this.authService.user$;
  channelId$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('channelId'))
  );
  channelId: string;
  players: any;

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        take(1),
        map((param) => param.get('channelId')),
        tap((id) => {
          this.channelId = id;
        })
      )
      .toPromise()
      .then((id) => {
        console.log(this.authService.uid);
        setTimeout(() => {
          this.meetingService.joinAgoraChannel(this.authService.uid, id);
        }, 1000);
      });
    console.log(this.channelId);
    this.players = true;
  }

  async joinChannel(uid: string): Promise<void> {
    const channelName = this.channelId;
    this.meetingService.joinChannel(uid, channelName);
    this.players = true;
  }

  async leaveChannel(uid: string): Promise<void> {
    this.meetingService.leaveChannel(uid, this.channelId);
    this.router.navigateByUrl('/');
  }

  async publishAudio(): Promise<void> {
    this.meetingService.publishMicrophone();
    this.players = true;
  }

  async unPublishAudio(): Promise<void> {
    this.meetingService.unpublishMicrophone();
  }

  async publishVideo(): Promise<void> {
    this.meetingService.publishVideo();
    this.players = true;
  }

  async unPublishVideo(): Promise<void> {
    this.meetingService.unpublishVideo();
  }
}
