# GoIT JavaScript additional practice

Live site: 🔗 [bablo.v.ua](https://bablo.v.ua)

## About the project

First of all, this is a joke site! It is based on my [bablo.eu.org](https://bablo.eu.org) ([source on GitLab](https://gitlab.com/reshet/bablo)) which still uses jQuery and PHP as backend. The goal of this project is to do full refactoring and use just JavaScript (and nodejs).


## What we have to do together?

* [x] When user clicks on the button «Бабло!», amount of "his money" increases by 1.

* [ ] Since this project was created in Nov 2014, its markup is very outdated, we need to update markup of `src/index.html` and add correct styles to `src/css/styles.css`

* [ ] Original site saves current amount of money to the database and uses cookie to identify user and get his amount of money from that database, but I think in this project we can use (for now) LocalStorage to save his amount.

* [ ] Original site has 2 versions: just bablo and megabablo. In the second version amount of money is **multiplied by 2** (but when user starts from 0, result of the click should be 1, and then by multiplying). We can have single site for both options by adding some kind of "super" switcher )))

* [ ] Let's add some backend for our "service" to prevent manual actions with LocalStorage. We will use [mockapi](https://mockapi.io) for this, baseURL is https://668581e2b3f57b06dd4cf9fd.mockapi.io/api/v1 (endpoint is not created yet, we'll create it together)

* [ ] When we have learned backends, we'll use our own database to save the user's amount of "money" to our database.
