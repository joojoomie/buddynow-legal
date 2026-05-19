# BuddyNow Legal Docs

Static legal documents for BuddyNow / 搭搭.

## Files

- `privacy.html` and `privacy-zh.html`
- `terms.html` and `terms-zh.html`
- `guidelines.html` and `guidelines-zh.html`
- `cookies.html` and `cookies-zh.html`

Each file is standalone HTML with inline CSS, no JavaScript dependencies, and mobile-friendly layout for in-app WebView use.

## Intended Routes

Configure the hosting layer so these URLs resolve to the matching files:

- `/privacy` -> `privacy.html`
- `/privacy-zh` -> `privacy-zh.html`
- `/terms` -> `terms.html`
- `/terms-zh` -> `terms-zh.html`
- `/guidelines` -> `guidelines.html`
- `/guidelines-zh` -> `guidelines-zh.html`
- `/cookies` -> `cookies.html`
- `/cookies-zh` -> `cookies-zh.html`

The sign-in screen in the mobile app should link to `/privacy` and `/terms` before TestFlight external testing.

## Publishing Notes

1. Upload these files to the static host for `buddynow.app`.
2. Confirm each route works without authentication from a fresh browser session.
3. Confirm the App Store Connect privacy policy URL points to `https://buddynow.app/privacy`.
4. If Chinese onboarding links are shown in the app, point them to `https://buddynow.app/privacy-zh` and `https://buddynow.app/terms-zh`.

## Operational Placeholders to Confirm

- DPO email is currently `dpo@buddynow.app`.
- Anonymized rows are described as retained indefinitely. Consider a 12- or 24-month review cycle before public launch if preferred.
- Processor list currently covers Fly.io and Resend only. Update the Privacy Policy before adding analytics, crash reporting, ads, payments, or new infrastructure providers.

## Sources Checked

- Singapore PDPC, data protection obligations under the PDPA.
- Singapore PDPC, individual rights overview for consent withdrawal, access, correction, retention, transfer, and breach notification.
- Apple App Review Guidelines, Guideline 5.1.1 privacy policy requirement.
