---
title: "Highlight the text block while listening (read-along)"
slug: read-along-highlight
id_code: "REQ-0014"
status: "Implemented"
status_class: "ok"
received: 2026-05-30
received_display: "2026-05-30 (time of day not specified)"
channel: "Direct prompt"
---

## Original prompt (verbatim)

<div class="verbatim">
can you highlight the text block when listening?
</div>

## Actions taken

- The Listen feature now highlights the **current block** as it is spoken, advancing
  with the audio (one block at a time), then clears on stop/finish. Works for **both
  engines** (browser and OpenAI) since playback is block-by-block.
- The highlighted block gets a subtle accent-tint background + a left accent bar, and
  gently scrolls into view (`block: 'nearest'`), respecting `prefers-reduced-motion`.
- Implemented by keeping a DOM reference for each spoken chunk; AA text contrast is
  preserved in light and dark mode.

## Current status

**Implemented & verified.** One block highlighted at a time, follows the reading
position, clears on stop. Lighthouse a11y 100.
