import { Component } from '@angular/core'
import { NavController, ModalController } from 'ionic-angular'
import { LinkCardPage } from '../link-card/link-card'
import { ConnectPayoutProvider } from '../../providers/connect-payout/connect-payout'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public connectPayout: ConnectPayoutProvider
  ) {}

  // TODO: Send the `token.id` field provided by Stripe to a backend API service to
  // send the `token` to Stripe via their "Create a card" API route
  linkCard() {
    const modal = this.modalCtrl.create(LinkCardPage)
    modal.present()

    modal.onDidDismiss(data => {
      const { token } = data
    })
  }

  // TODO: Create backend API route that is called by Stripe as a callback when
  // Stripe Connect Express is completed. This API route will be passed the user's ID
  // by stripe as the `state` parameter
  linkBank() {
    this.connectPayout.do()
  }
}
