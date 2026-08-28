/* In-page EN / 简 / 繁 switching for the BuddyNow legal documents.
 *
 * Each document holds all three languages as sibling `.lang[data-lang=…]`
 * sections; legal.css shows exactly one. This script picks which, injects
 * the switcher, and remembers the choice.
 *
 * Resolution order, highest first:
 *   1. ?lang= in the URL — the mobile app appends its in-app language, so
 *      opening Terms from a Traditional-Chinese app lands on Traditional
 *      rather than guessing from the phone's system locale.
 *   2. localStorage — a returning reader keeps their last choice.
 *   3. navigator.language(s) — zh-TW / zh-HK / zh-Hant → Traditional,
 *      other zh → Simplified, anything else → English.
 *   4. English.
 *
 * The switcher is injected rather than written into each document's markup
 * so that with JS disabled no dead buttons appear — legal.css already
 * leaves English visible in that case.
 *
 * No build step and no dependencies: edit the HTML, push, GitHub Pages
 * serves it. See ../README.md.
 */
(function () {
  "use strict";

  var LANGS = ["en", "zh-Hans", "zh-Hant"];
  var LABELS = { "en": "EN", "zh-Hans": "简", "zh-Hant": "繁" };
  // Spoken names for the switcher's accessible labels. Each is written in
  // its own language: a screen reader announcing the button should say the
  // language it switches TO.
  var A11Y = {
    "en": "English",
    "zh-Hans": "切换到简体中文",
    "zh-Hant": "切換到繁體中文"
  };
  var STORAGE_KEY = "bn_legal_lang";
  var root = document.documentElement;

  function normalise(raw) {
    if (!raw) return null;
    var tag = String(raw).toLowerCase().replace(/_/g, "-");
    if (tag === "en" || tag.indexOf("en-") === 0) return "en";
    if (tag.indexOf("zh") !== 0) return null;
    // Script subtag wins when present; otherwise infer from the region.
    // hant / tw / hk / mo are Traditional; everything else Simplified.
    if (/(^|-)(hant|tw|hk|mo)(-|$)/.test(tag)) return "zh-Hant";
    return "zh-Hans";
  }

  function fromQuery() {
    // Deliberately not using URLSearchParams: these pages are opened inside
    // the app's WebView on whatever OS version the user is running, and a
    // regex costs nothing.
    var m = /[?&]lang=([^&#]+)/.exec(window.location.search);
    return m ? normalise(decodeURIComponent(m[1])) : null;
  }

  function fromStorage() {
    // Private-mode Safari throws on localStorage access rather than
    // returning null, so every read and write is guarded.
    try {
      return normalise(window.localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function remember(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* Choice still applies for this page view; just isn't remembered. */
    }
  }

  function fromBrowser() {
    var tags = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language];
    for (var i = 0; i < tags.length; i++) {
      var hit = normalise(tags[i]);
      if (hit) return hit;
    }
    return null;
  }

  function apply(lang) {
    root.setAttribute("data-active-lang", lang);
    // Keep the document's own lang in step so screen readers and the
    // browser's translation prompt see the language actually on screen.
    root.setAttribute("lang", lang === "en" ? "en" : lang);
    var buttons = document.querySelectorAll(".lang-switch button");
    for (var i = 0; i < buttons.length; i++) {
      var isActive = buttons[i].getAttribute("data-set-lang") === lang;
      buttons[i].setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  function buildSwitcher(initial) {
    var host = document.querySelector("[data-lang-switch]");
    if (!host) return;
    var nav = document.createElement("div");
    nav.className = "lang-switch";
    nav.setAttribute("role", "group");
    nav.setAttribute("aria-label", "Language / 语言 / 語言");
    LANGS.forEach(function (lang) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = LABELS[lang];
      btn.setAttribute("data-set-lang", lang);
      btn.setAttribute("aria-label", A11Y[lang]);
      btn.setAttribute("aria-pressed", lang === initial ? "true" : "false");
      btn.addEventListener("click", function () {
        apply(lang);
        remember(lang);
      });
      nav.appendChild(btn);
    });
    host.appendChild(nav);
  }

  var initial = fromQuery() || fromStorage() || fromBrowser() || "en";
  // An explicit ?lang= is a choice too — remember it so following a link
  // from the app once sets the language for later direct visits.
  if (fromQuery()) remember(initial);
  buildSwitcher(initial);
  apply(initial);
})();
