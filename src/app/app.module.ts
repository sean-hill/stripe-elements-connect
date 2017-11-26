import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { InAppBrowser } from '@ionic-native/in-app-browser'

import { MyApp } from './app.component'
import { HomePage } from '../pages/home/home'
import { LinkCardPage } from '../pages/link-card/link-card'
import { ConnectPayoutProvider } from '../providers/connect-payout/connect-payout'

@NgModule({
  declarations: [MyApp, HomePage, LinkCardPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, LinkCardPage],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConnectPayoutProvider
  ]
})
export class AppModule {}
