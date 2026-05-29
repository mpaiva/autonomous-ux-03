source "https://rubygems.org"

# We build with Jekyll 4 directly (not the github-pages gem) and deploy via
# GitHub Actions. This frees us from the github-pages gem's pinned, older
# dependency set and lets us run on a current Ruby.
gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
end

# Windows / JRuby compatibility shims (harmless elsewhere)
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "wdm", "~> 0.1", platforms: [:mingw, :mswin, :x64_mingw]

# Faraday is no longer a default gem on Ruby 3.4+; pin a current one.
gem "csv"
gem "base64"
gem "bigdecimal"
