import { Injectable } from '@angular/core'
import { InAppBrowser } from '@ionic-native/in-app-browser'

declare var mixpanel

@Injectable()
export class ConnectPayoutProvider {
  constructor(public browser: InAppBrowser) {}

  async do() {
    return new Promise((resolve, reject) => {
      const stripeClientId = 'ca_32D88BD1qLklliziD7gYQvctJIhWBSQ7'
      const userId = '12345'

      const browser = this.browser.create(
        `https://connect.stripe.com/express/oauth/authorize?client_id=${
          stripeClientId
        }&state=${userId}`,
        '_blank',
        {
          location: 'yes',
          clearcache: 'yes',
          clearsessioncache: 'yes',
          closebuttoncaption: 'Cancel'
        }
      )

      const onLoad = browser.on('loadstop').subscribe(data => {
        if (data.url && data.url.match('stripe-connect')) {
          browser.close()
          onLoad.unsubscribe()
          resolve(true)
        }
      })
    })
  }
}
