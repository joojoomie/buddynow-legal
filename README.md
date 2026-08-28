# BuddyNow Legal Docs

Public site for BuddyNow / 搭搭 — the marketing landing page plus the legal
documents the app links to. Served at `buddynow.astralogy.org` via GitHub
Pages. **Available in Singapore, Taiwan, and Hong Kong.**

## How to edit (read this first)

**There is no build step.** Edit the HTML, commit, push — GitHub Pages
serves it within a minute. You can do the whole thing in the GitHub web
editor if you want.

Each document is **one file containing all three languages**:

```
legal/privacy.html      ← EN + 简体 + 繁體, all in this one file
legal/terms.html
legal/guidelines.html
legal/cookies.html
support.html
```

Inside each file the three languages sit in sibling blocks:

```html
<div class="lang" data-lang="en">      … English …      </div>
<div class="lang" data-lang="zh-Hans"> … 简体中文 …      </div>
<div class="lang" data-lang="zh-Hant"> … 繁體中文 …      </div>
```

`legal/legal.css` shows exactly one of them; `legal/lang.js` decides which
and draws the `EN / 简 / 繁` switch.

### The three rules

1. **Change all three blocks, or none.** They are the same document in three
   languages. A change to only one leaves the other two saying something
   different, which in a legal document is the whole problem.
2. **Bump `Last updated` in all three.** It is the only signal a reader has
   that the document moved.
3. **Never rename or move these files.** Shipped app builds link to
   `/legal/privacy.html`, `/legal/terms.html`, and `/legal/guidelines.html`
   forever — an app already on someone's phone cannot be told about a new
   URL. The `*-zh.html` files are redirect stubs kept alive for links shared
   before the languages were merged; leave them there too.

### Before you write a promise

If you are about to state **what the app does** — a retention period, a
threshold, who can see what — check the code first, or ask for it to be
checked. The audit on 2026-08-28 found three places where the policy and
the app disagreed: the negative-rating tags were described as never public
when they surface at three distinct reviewers; the data-export route pointed
at an in-app button that had been removed; and the 24-month report retention
was promised with nothing implementing it. All three are fixed, and the
lesson is that these drift silently. A written promise the code does not
keep is worse than no promise.

### Traditional Chinese

The Traditional text was produced with `opencc` (`s2twp`) from the
Simplified and then corrected by hand: character conversion alone leaves
mainland vocabulary that reads wrong in Taiwan and Hong Kong. If you
regenerate it, re-apply at least these:

| Simplified-flavoured | Use instead |
|---|---|
| 賬號 | 帳號 |
| 帖子 | 貼文 |
| 拉黑 | 封鎖 |
| 舉報 | 檢舉 |
| 匹配 | 配對 |
| 郵箱 | 信箱 |
| 爽約 | 放鴿子 |
| 訪問（資料） | 查閱 / 存取 |

Quotation marks should be 「」, not “”.

## Local preview

Any static server from the repo root works, e.g.:

```bash
python3 -m http.server 8123
```

Then open `http://localhost:8123/legal/privacy.html`. Check all three
languages, `?lang=zh-Hant`, and — importantly — that the page still shows
one complete document with JavaScript disabled (it falls back to English).

## Routes

| URL | What it is |
|---|---|
| `/` | Astralogy landing page |
| `/support.html` | Support page (App Store "App Support" URL) |
| `/legal/` | Index of the legal documents |
| `/legal/privacy.html` | Privacy Policy — **linked from the app** |
| `/legal/terms.html` | Terms of Service — **linked from the app** |
| `/legal/guidelines.html` | Community Guidelines — **linked from the app** |
| `/legal/cookies.html` | Cookie and Local Storage Notice |
| `/legal/*-zh.html` | Redirect stubs for pre-merge links |

App Store Connect should point **Privacy Policy URL** at
`/legal/privacy.html`, **Support URL** at `/support.html`, and **Marketing
URL** at `/`.

## Things to keep true

- `support@astralogy.org` must be a real, monitored mailbox — it is the DPO
  contact and the only working data-access route (there is no in-app export
  button).
- **Astralogy is a brand name, not a registered company.** The site must not
  describe it as a company, claim a founding year, or use corporate officer
  titles until an entity actually exists. Copyright is held by an individual.
- Response deadlines differ by market and are stated in Privacy § 9:
  Singapore (PDPA), Taiwan **15 days** to decide on access / **30 days** for
  correction and deletion (個資法 Art. 13), Hong Kong **40 days** (PDPO).
- Processor list in Privacy § 6 covers Microsoft Azure (API + database,
  currently Japan West), Cloudflare (DNS/TLS/Tunnel), Apple (Sign in with
  Apple), Resend (OTP email), Sentry (crash reporting), and Expo Push plus
  APNs/FCM. Update it **before** adding analytics, ads, payments, or any new
  infrastructure provider.
- Apple App Privacy answers must keep matching reality: the app uploads a
  foreground coordinate snapshot when location is enabled (public display is
  coarse, but the backend does receive coordinates). Revisit if the app ever
  moves to background location or continuous tracking.
- Re-review retained records at least every 24 months, as Privacy § 7 says.

## Sources checked

- Singapore PDPC — obligations under the PDPA and individual rights.
- Taiwan Personal Data Protection Act — Art. 8 (notice at collection),
  Art. 12 (breach notification), Art. 13 (response deadlines), Art. 21
  (cross-border transfer).
- Hong Kong PDPO (Cap. 486) — data access requests (40 days), the six Data
  Protection Principles, and the doxxing offences added in 2021.
- Hong Kong Control of Exemption Clauses Ordinance (Cap. 71) s.7 — liability
  for death or personal injury from negligence cannot be excluded.
- Taiwan Consumer Protection Act and Civil Code Art. 247-1 — manifestly
  unfair standard-form terms are void.
- Apple App Review Guidelines 5.1.1 — privacy policy requirement.

None of this is legal advice. Have a lawyer familiar with Taiwan and Hong
Kong consumer law review these documents before any real marketing push.
