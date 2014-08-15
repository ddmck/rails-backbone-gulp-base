## README

This repository is for initializing a Rails app with Devise and Backbone.js installed with gulp for asset management.

### Getting Set Up

Clone the repository
``` sh
$ git clone git@github.com:ddmck/rails-backbone-gulp-base.git
```
Go into the directory
``` sh
$ cd [DIR_NAME]
```
Install gems (Ruby 2.1)
``` sh
$ bundle install
```
Create the DB (Postgres)
``` sh
$ rake db:create db:migrate
```
In a new tab navigate to the frontend and install dependencies
``` sh
$ cd frontend
$ npm install
```
Start the asset server
``` sh
$ gulp
```
Start Rails
``` sh
$ rails s
```
