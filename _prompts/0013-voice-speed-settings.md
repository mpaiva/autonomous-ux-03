---
title: "Add speed (and pitch) controls to the Listen feature"
slug: voice-speed-settings
id_code: "REQ-0013"
status: "Implemented"
status_class: "ok"
received: 2026-05-30
received_display: "2026-05-30 (time of day not specified)"
channel: "Direct prompt + screenshot of Stratum's Echo panel"
---

## Original prompt (verbatim)

<div class="verbatim">
this is what I see. I personally like the speed settings
</div>

(Accompanied by a screenshot of Stratum's "Echo / voice" panel, which includes
Speed and Pitch sliders.)

## Actions taken

- Added **Speed** and **Pitch** sliders to the Voice modal, with live value readouts
  (e.g. "1.2×"). Settings persist locally (session, or this-device if "remember").
- **Speed** applies to both engines (browser `rate`; OpenAI `speed` parameter).
  **Pitch** applies to the browser voice (OpenAI TTS has no pitch parameter).
- Accessible: native range inputs with labels and `aria-valuetext`.

## Current status

**Implemented.** Also finalized in this session: confirmed direct BYOK works and
removed the relay (see [REQ-0012]({{ '/chairman-log/stratum-byok/' | relative_url }})).
