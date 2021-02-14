# Smart Tourism Web

[Material-based](https://material.io/) administrator website using [Vue.js](https://vuejs.org/), [Vuetify](https://vuetifyjs.com/en/), and [Vuex](https://vuex.vuejs.org/).
This website is written in [Node.js](https://nodejs.org/en/) and using some libraries or frameworks like Vue.js as the client-side framework, Vuetify as the Material Design component framework, and Vuex as the state management library.
This website could be used to manage the database for administrators, show statistics using [Chart.js](https://www.chartjs.org/), and input data from the scanned [QR code](https://en.wikipedia.org/wiki/QR_code) using [JsQR](https://www.npmjs.com/package/jsqr).

We created this project as part of the Smart Tourism project that consists of several parts like [database server](https://github.com/threeal/smart-tourism-server), [card scanner device](https://github.com/threeal/smart-tourism-device), [administrator website](https://github.com/threeal/smart-tourism-web), and [location's direction app](https://github.com/threeal/smart-tourism-app).
Smart Tourism project is a system for smart tourism that improves the impression of tourism sites using an electronic card to enter and exit locations, a website that monitors and show statistic for each location, and AR app for visitors to show location's direction.
This project is undertaken to fulfill the Telematics Projects course in the [Computer Engineering department](https://www.its.ac.id/study-at-its/faculties-and-departments/faculty-electrical-technology/computer-engineering/) of [Sepuluh Nopember Institute of Technology](https://www.its.ac.id/).

## Usage

- Install Node.js as in their [official guide](https://nodejs.org/en/download/).
  > As an alternative, you may install Node.js using the [NVM](https://github.com/nvm-sh/nvm).
- Install Yarn as in their [official guide](https://classic.yarnpkg.com/en/docs/install/).
  > If you don't want to use Yarn, you may skip this step and use NPM instead.
- Open this project directory in terminal, and initialize the dependencies.
  ```bash
  $ yarn install
  ```
- Compiles and hot-reloads to serve the website for development.
  ```bash
  $ yarn serve
  ```
  > As an alternative, you may compiles and minifies for production using `$ yarn build`, then serve it as a static page using [serve](https://www.npmjs.com/package/serve).
