#!/usr/bin/env python3
"""Check that every language block carries every load-bearing fact.

Run from the repo root:

    python3 tools/check-languages.py

Why this exists: on 2026-08-28 a correction was applied to the English
privacy text and the Simplified equivalent was missed, so for a while the
English said the badge no longer names your university and the Chinese still
said it did. Section counts matching is not enough — the blocks can be the
same *shape* and say different *things*. This greps for a marker phrase per
fact per language instead.

Adding a fact: append a row to MARKERS with one marker per language, in the
order en / zh-Hans / zh-Hant. Pick a phrase that would have to change if the
underlying behaviour changed — not boilerplate.

This is a lint, not a translator. It cannot tell you the three versions mean
the same thing; it can only tell you a fact went missing from one of them.
"""
from __future__ import annotations

import sys
from pathlib import Path

LANGS = ["en", "zh-Hans", "zh-Hant"]

MARKERS: dict[str, list[tuple[str, list[str]]]] = {
    "legal/privacy.html": [
        ("institution shown only in pre-Sept-2026 builds",
         ["September 2026", "2026 年 9 月", "2026 年 9 月"]),
        ("negative rating tag needs 3 distinct reviewers",
         ["three DIFFERENT people", "三个不同的人", "三個不同的人"]),
        ("there is no in-app data export",
         ["no in-app export button", "App 内没有导出按钮", "App 內沒有匯出按鈕"]),
        ("no whole-country email suffix is accepted",
         [".edu.hk", ".edu.hk", ".edu.hk"]),
        ("operational logs rotate by size, not by calendar",
         ["not a calendar one", "而非日历上限", "而非日曆上限"]),
        ("per-jurisdiction response deadlines",
         ["40 days", "40 日", "40 日"]),
        ("server location is disclosed",
         ["Japan West", "Japan West", "Japan West"]),
    ],
    "legal/terms.html": [
        ("BuddyNow is not a party to a user's arrangement",
         ["not a party to any arrangement", "都不是当事方", "都不是當事人"]),
        ("liability for death/injury cannot be excluded (HK Cap. 71)",
         ["Cap. 71", "第 71 章", "第 71 章"]),
        ("jurisdiction is non-exclusive",
         ["non-exclusive", "非排他", "非專屬"]),
        ("no background checks or identity verification",
         ["background checks", "背景调查", "背景調查"]),
    ],
    "legal/guidelines.html": [
        ("Hong Kong doxxing is a criminal offence",
         ["criminal offence", "刑事罪行", "刑事罪行"]),
        ("reports are judged by a person, not a count",
         ["by a person", "由人来判断", "由人來判斷"]),
    ],
    "support.html": [
        ("local emergency numbers",
         ["110", "110", "110"]),
        ("report in-app, not by email",
         ["use the in-app Report button", "用 App 内的「举报」按钮", "用 App 內的「檢舉」按鈕"]),
    ],
}


def blocks_of(html: str) -> dict[str, str]:
    out = {}
    for tag in LANGS:
        start = html.index(f'<div class="lang" data-lang="{tag}">')
        candidates = [i for i in (html.find("<!-- ====", start + 10),
                                  html.find("</main>", start)) if i != -1]
        out[tag] = html[start:min(candidates)]
    return out


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    failures = 0
    for rel, checks in MARKERS.items():
        path = root / rel
        if not path.exists():
            print(f"MISSING FILE  {rel}")
            failures += 1
            continue
        blocks = blocks_of(path.read_text(encoding="utf-8"))
        for name, markers in checks:
            missing = [t for t, m in zip(LANGS, markers) if m not in blocks[t]]
            if missing:
                failures += 1
                print(f"[MISS] {rel} — {name}\n         absent from: {', '.join(missing)}")
            else:
                print(f"[ ok ] {rel} — {name}")
    print()
    if failures:
        print(f"{failures} fact(s) missing from at least one language.")
        return 1
    print("All languages carry every checked fact.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
