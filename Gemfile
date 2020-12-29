# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.7.2"

gem "rails"
gem "pg"
gem "puma"
gem "sass-rails", ">= 6"
gem "webpacker", "~> 4.0"
gem "turbo-rails"
gem "bootsnap", ">= 1.4.2", require: false

gem "slim"
gem "devise"
gem "pagy"

gem "dalli"
gem "rollbar"
gem "cloudinary"
gem "delayed_job_active_record"
gem "rack-mini-profiler"
gem "flamegraph"
gem "stackprof"

gem "tickly"
gem "selenium-webdriver"

group :development, :test do
  gem "pry-byebug"
  gem "dotenv-rails"
end

group :development do
  gem "web-console", ">= 3.3.0"
  gem "listen", "~> 3.2"
  gem "letter_opener"
  gem "annotate"
  gem "rubocop", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-performance", require: false
end
