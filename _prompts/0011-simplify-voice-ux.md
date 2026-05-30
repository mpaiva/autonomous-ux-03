---
title: "Simplify the OpenAI voice UX to a modal key-entry dialog"
slug: simplify-voice-ux
id_code: "REQ-0011"
status: "Implemented"
status_class: "ok"
received: 2026-05-30
received_display: "2026-05-30 (time of day not specified)"
channel: "Direct prompt"
---

## Original prompt (verbatim)

<div class="verbatim">
the user experience for enabling the OpenAI voices is too complex. Can't we just popup a modal dialog for the end user to enter their own OpenAI Key?
</div>

## Interpretation

The inline "Voice settings" disclosure (engine radios + key + voice + remember +
save/forget) was too much. Replace it with a simple modal dialog focused on entering
a key.

## Actions taken

- Removed the inline settings panel. The control bar is now just **Listen** (+ Stop),
  plus — only when premium voices are available (a relay is configured) — a small
  **"Voice"** button that opens an accessible native `<dialog>`.
- The modal: a short intro, the OpenAI key field (autofocused), a voice picker, a
  "remember on this device" checkbox, **Use OpenAI voice** / **Use free browser
  voice** buttons, a "Forget saved key" action (only when a key is saved), and the
  privacy note. Esc / × / backdrop close it; focus returns to the trigger.
- On the **public site** (no relay) there is no Voice button or modal at all — just
  "Listen to this page" with the free browser voice. Simplest possible default.

Verified: native dialog focus management (focus moves to the key field), save/forget,
prefill on reopen, voice-button reflects the choice, no JS errors, Lighthouse a11y 100.

## Current status

**Implemented.** Premium voices stay BYOK + dev-guarded; the new flow is one button →
one modal → one field.
