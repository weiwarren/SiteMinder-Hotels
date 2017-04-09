# SiteMinder Hotels

This project is to created as a response to a technical test for a role at SiteMinder. The idea behind the project is to display the closest 5 hotels based on the user defined location.

## Architect
The solution relies on 2 separate services:

**Google Maps Javascript API V3**

Google Maps Javascript API provides location and hotel search service which are predominantly used for querying geo-based hotel information

**Firebase**

Firebase is chosen as Backend-as-a-service to enable socket based real-time communication and store custom hotel information. It also saves a copy of publically available hotels from the google service in case of throttling on the API End Points.

**Angular2** is chosen to render front-end views, handle user interactions and orchestrate the synchronization between map and firebase services. 


![alt tag](http://res.cloudinary.com/dhzzedkki/image/upload/v1491742264/Siteminder-hotels_ktuq08.png)

## Process overview

Whenever a user request for hotels around a new geo-location, 2 separate queries are fired simultaneously: one for  google map API, and one for firebase through geo-fire library. The results are compared and merged for any duplication or updates before returned back to user.

## Demo

A demo of the application can be viewed from https://siteminderhotels.firebaseapp.com

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.
