# Stripex

This repository provides a few components that will help you integrate Stripe
Elements and Stripe Connect (Express) into your Ionic application.

It only includes the client side code needed to retrieve a `token` from Stripe
using Stripe Elements, and the code that opens up Stripe Connect (Express) via
an the `inAppBrowser` cordova plugin. The backend API's needed to persist this
information is not provided in this repository.

## Key Resources

The `link-card` component provides the hacks I found to get Stripe Elements
integrated into an Ionic application. The `connect-payout` provider shows how to
open Stripe Connect (Express) using the `inAppBrowser` plugin, and how to check
when the Express flow is completed.
