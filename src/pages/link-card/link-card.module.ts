import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinkCardPage } from './link-card';

@NgModule({
  declarations: [
    LinkCardPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkCardPage),
  ],
})
export class LinkCardPageModule {}
