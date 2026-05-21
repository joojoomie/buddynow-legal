# BuddyNow Legal Docs

Static legal documents for BuddyNow / 搭搭.

## Files

- `legal/privacy.html` and `legal/privacy-zh.html`
- `legal/terms.html` and `legal/terms-zh.html`
- `legal/guidelines.html` and `legal/guidelines-zh.html`
- `legal/cookies.html` and `legal/cookies-zh.html`

Each file is standalone HTML with inline CSS, no JavaScript dependencies, and mobile-friendly layout for in-app WebView use.

## Intended Routes

Configure GitHub Pages with the custom domain `astralogy.org` so these URLs resolve to the matching files:

- `https://astralogy.org/legal/privacy.html`
- `https://astralogy.org/legal/privacy-zh.html`
- `https://astralogy.org/legal/terms.html`
- `https://astralogy.org/legal/terms-zh.html`
- `https://astralogy.org/legal/guidelines.html`
- `https://astralogy.org/legal/guidelines-zh.html`
- `https://astralogy.org/legal/cookies.html`
- `https://astralogy.org/legal/cookies-zh.html`

The sign-in screen in the mobile app should link to `https://astralogy.org/legal/privacy.html` and `https://astralogy.org/legal/terms.html` before TestFlight external testing.

## Publishing Notes

1. Enable GitHub Pages for this repo and set the custom domain to `astralogy.org`.
2. Confirm each route works without authentication from a fresh browser session.
3. Confirm the App Store Connect privacy policy URL points to `https://astralogy.org/legal/privacy.html`.
4. If Chinese onboarding links are shown in the app, point them to `https://astralogy.org/legal/privacy-zh.html` and `https://astralogy.org/legal/terms-zh.html`.

## Operational Placeholders to Confirm

- DPO email `support@astralogy.org` must be a real mailbox before TestFlight external testing.
- Deleted-account rows are described as de-identified or pseudonymized where possible. Concrete retention periods are now stated in Privacy § 7 (24-month report retention, 30-day op logs, 30-day Sentry events). Re-review at least every 24 months.
- Apple App Privacy answers must disclose **coarse** location only — the mobile app uses `Location.Accuracy.Balanced` (≈100m, Wi-Fi-derived). Update the Privacy Policy and App Privacy answers if the code ever switches to `High` / precise GPS.
- Processor list now covers: Fly.io (hosting), Resend (OTP email), Sentry (crash reporting, backend + mobile), and Apple APNs / Google FCM (push). Update Privacy § 6 before adding analytics, ads, payments, or new infrastructure providers.

## Sources Checked

- Singapore PDPC, data protection obligations under the PDPA.
- Singapore PDPC, individual rights overview for consent withdrawal, access, correction, retention, transfer, and breach notification.
- Apple App Review Guidelines, Guideline 5.1.1 privacy policy requirement.
