# Penumbra — operating record

This repository is the operating record and Chairman visibility system for
**Penumbra** (working name), an AI-native design studio building **Accessible AI
UX** as a craft standard. It is a Jekyll site, not a marketing brochure: it makes
the company's thesis, decisions, research, progress, risks, and the Chairman
request log visible and traceable.

## Local development

Requires Ruby ≥ 3.x (built and verified on Ruby 4.0.1, Jekyll 4.4.1).

```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
bundle exec jekyll build   # outputs to _site/
```

A `.ruby-version` (4.0.1) is included for rbenv users.

## Structure

| Path | Purpose |
|---|---|
| `index.html` | Chairman dashboard |
| `pages/` | Thesis, team, services, IP roadmap, credibility, risks + collection indexes |
| `_decisions/` | Decision log (DR-####) |
| `_prompts/` | Chairman request log, verbatim (REQ-####) |
| `_research/` | Cited research briefs (RB-##) |
| `_updates/` | Periodic Chairman memos (UPD-###) |
| `_data/` | nav, team, status, metrics, risks, services, IP roadmap |
| `_layouts/`, `_includes/`, `assets/css/` | Accessible templates and styles |
| `.github/workflows/pages.yml` | GitHub Pages deploy (dormant until approved) |

## Accessibility

This site targets **WCAG 2.2 AA** — we hold ourselves to the standard we sell.
Conformance is verified, not asserted; until assistive-technology testing is
complete we describe it as *targeted*. Found a barrier? That is a credibility
defect — please open an issue.

## Publishing

Building and committing happen locally. **Making this repository public and
enabling GitHub Pages is reserved for explicit Chairman approval** — it puts
strategic material in the open. See update UPD-001.
