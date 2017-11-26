import { Component, NgZone, ViewChild } from '@angular/core'
import {
  NavController,
  NavParams,
  ViewController,
  AlertController,
  LoadingController,
  IonicPage
} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-link-card',
  templateUrl: 'link-card.html'
})
export class LinkCardPage {
  @ViewChild('focushelper') focushelper
  stripe: any
  cardValid: boolean
  card: any
  cardEl: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public ngZone: NgZone,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController //public paymentMethod: PaymentMethodProvider
  ) {}

  ionViewDidEnter() {
    setTimeout(() => this.init(), 50)
  }

  init() {
    this.stripe = (<any>window).Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
    const elements = this.stripe.elements()

    this.cardEl = elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          lineHeight: '20px',
          fontFamily: '"Montserrat", -apple-system, "Helvetica Neue", "Roboto"',
          letterSpacing: '1px',
          '::placeholder': {
            color: 'rgba(255, 255, 0.5)'
          }
        },
        invalid: {
          color: '#f53d3d'
        }
      }
    })
    this.cardEl.mount('#card-element')

    this.cardEl.addEventListener('change', result => {
      if (result.complete) {
        this.ngZone.run(() => (this.cardValid = true))
      }
    })
  }

  async add() {
    const loader = this.loadingCtrl.create()
    loader.present()

    const result = await this.stripe.createToken(this.cardEl)

    if (result.error) {
      await loader.dismiss()
      this.showPaymentError(result.error.message)
    } else {
      try {
        console.log('TOKEN:', result.token)
        // await this.paymentMethod.add(result.token.id)
        loader.dismiss()

        this.close({
          added: true,
          token: result.token.id,
          card: result.token.card
        })
      } catch (err) {
        loader.dismiss()
        this.showPaymentError(err.message)
      }
    }
  }

  showPaymentError(message) {
    const alert = this.alertCtrl.create({
      title: 'Payment issue',
      subTitle: message,
      buttons: ['Ok']
    })
    alert.present()
  }

  close(data) {
    this.focushelper.setFocus()
    this.focushelper.setBlur()
    this.viewCtrl.dismiss(data)
  }
}
