import { Component, OnInit } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
} from 'agora-rtc-sdk-ng';
import { AuthService } from './services/auth.service';
const client: IAgoraRTCClient = AgoraRTC.createClient({
  mode: 'live',
  codec: 'vp8',
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  rtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
  };

  options = {
    // Pass your app ID here.
    appId: '60c972e80bee423ea01a8ca67121691d',
    // Set the channel name.
    channel: 'example',
    // Pass a token if your project enables the App Certificate.
    token:
      '00660c972e80bee423ea01a8ca67121691dIAAfkDNvRulrUwGtZXl3/jTgo32nfYprvI7kaJZOTRwcx5+b7G4AAAAAEABFd1n8jO8pYAEAAQCL7ylg',
  };

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.startBasicCall();
    this.init();
  }

  startBasicCall() {}

  async init() {
    this.rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }

  async join() {
    const uid = await this.rtc.client.join(
      this.options.appId,
      this.options.channel,
      this.options.token,
      null
    );
  }

  async leave() {
    this.rtc.client.localTracks.forEach((v) => v.close());

    await this.rtc.client.leave();
  }

  async publish() {
    const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await this.rtc.client.publish([localAudioTrack]);
  }

  async unpublish() {
    await this.rtc.client.unpublish();
  }

  async onAgoraUserJoined(user) {}

  async onAgoraUserLeft(user, reason) {}

  async onAgoraUserPublished(
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video'
  ) {
    const track = await client.subscribe(user, mediaType);
    track.play('xxx');
  }

  async onAgoraUserUnpublished(
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video'
  ) {}

  check() {
    console.log(this.rtc.client.connectionState);
  }
}
