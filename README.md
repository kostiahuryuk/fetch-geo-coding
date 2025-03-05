# Fetch Geolocation Assessment

## Overview
This command-line utility fetches geolocation data (latitude, longitude, and location details) using the OpenWeather Geolocation API.

# Requirements 
 * Node.js
 * NPM
 * OpenWeather API-KEY https://home.openweathermap.org/users/sign_up

## Setup
1. **Clone repo**
``` sh
git clone git@github.com:kostiahuryuk/fetch-geo-coding.git
```
2. **Install all dependencies**
```sh
npm install
```
3. **create .env file in your repo**
	1. In the project root directory, create a file named .env
        touch .env
	2. Add the following line to it:
        API_KEY=your_openweather_api_key
    3. Replace "your_openweather_api_key" with your actual OpenWeather API key.
   
The API does have limits on our API key. If you are hitting rate limiting issues, please reach out
to us for an updated API key OR you are always welcome to create your own free account and
use your own dedicated API key.
https://home.openweathermap.org/users/sign_up

4. **Usage**

Using the --locations flag:
```sh
geoloc-util --locations "Madison, WI" "12345"
```
Without a flag:
```sh
geoloc-util "Madison, WI" "12345" "Chicago, IL" "10001"
```
Using npm start for specific zipcode:
```sh
npm start "06825"
```
Using npm start to fetch a city and state:
```sh
npm start "Los Angeles, CA"
```

##  Run Tests
```sh
npm test
```


#  Project Structure
```plaintext
fetch-geo-coding/
│── .github/
│   ├── workflows/
│   │   ├── ci.yml                # GitHub Actions CI configuration
│
│── src/
│   ├── geoloc-util.js            # Main script for geolocation utility
│
│── tests/
│   ├── geoloc-util.test.js       # Jest test cases for geolocation functions
│
│── .env                          # Stores API key (not committed to Git)
│── .gitignore                    # Ignoring node_modules, .env, and other unnecessary files
│── eslint.config.mjs             # ESLint configuration
│── package.json                  # Project dependencies and scripts
│── package-lock.json              # Locked dependency versions
│── README.md                     # Project documentation
```

## Continues Integration 
This project integrated with GitHub Actions for Continuous Integration (CI) to automatically run tests on every push. To see all the steps please navigate to: 
```plaintext 
    .github/workflows/test.yml
```
Past CI expectations: https://github.com/kostiahuryuk/fetch-geo-coding/actions


