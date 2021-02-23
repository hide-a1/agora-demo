import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { EntranceComponent } from './entrance/entrance.component';

const routes: Routes = [
  {
    path: '',
    component: EntranceComponent,
  },
  {
    path: ':channelId',
    component: ChannelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelRoutingModule {}
