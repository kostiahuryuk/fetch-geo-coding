#!/usr/bin/env node
const axios = require('axios');
const { program } = require('commander');
require( "dotenv" ).config();

const API_KEY = process.env.API_KEY || "fe979d5d1c813df6c6ce742289197f1f"; //temporary hardcoded API key to give ability execute tests

if (!API_KEY) {
    console.error("ERROR: API_KEY is missing or used all the limits for existing key. Please set it in the .env file or provide it as an environment variable.");
    process.exit(1);
}

async function getByLocationName(city, state = "", country = "US") {
    try {
        const query = state ? `${city},${state},${country}` : `${city},${country}`;
        const response = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
            params: {q: query, appid: API_KEY, limit: 1},
        });

        if (response.data.length === 0) {
            console.error(`No results found for: ${city}, ${state}`);
            return null;
        }

        const location = response.data[0];
        return {
            location: `${location.name}, ${location.state || ""} (${location.country})`,
            latitude: location.lat,
            longitude: location.lon,
        };
    } catch (error) {
        console.error(`Error fetching city data for ${city}: ${error.message}`);
        return null;
    }
}

async function getByZipcode(zip, country = "US") {
    try {
        const response = await axios.get("http://api.openweathermap.org/geo/1.0/zip", {
            params: { zip: `${zip},${country}`, appid: API_KEY },
        });

        if (!response.data || !response.data.name) {
            console.error(`No results found for ZIP: ${zip}`);
            return null;
        }

        return {
            location: `${response.data.name}, ${response.data.country}`,
            latitude: response.data.lat,
            longitude: response.data.lon,
        };
    } catch (error) {
        console.error(`ZIP lookup failed for '${zip}': ${error.message}`);
        return null;
    }
}

async function multipleLocations(locations) {
    const results = [];

    for (const location of locations) {
        if (/^\d+$/.test(location)) {
            const data = await getByZipcode(location);
            if (data) results.push(data);
        } else {
            const [city, state] = location.split(",");
            const data = await getByLocationName(city.trim(), state ? state.trim() : "");
            if (data) results.push(data);
        }
    }

    results.forEach((result, index) => {
        console.log(`*** Location #${index + 1}: ***`);
        console.log(`    Name: ${result.location}`);
        console.log(`    Latitude: ${result.latitude}, Longitude: ${result.longitude}`);
    });

    return results;
}

module.exports = { getByCity: getByLocationName, getByZip: getByZipcode, multipleLocations };

if (require.main === module) {
    program
        .version("1.0.0")
        .description("Fetch Geolocation Data from OpenWeather API")
        .option("-l, --locations <locations...>", "List of city/state or zip/post code")
        .arguments("[locations...]")
        .action(async (locations, options) => {
            const allLocations = options.locations || locations;

            if (!allLocations || allLocations.length === 0) {
                console.error("Please provide at least one location");
                if (process.env.NODE_ENV !== "test") {
                    process.exit(1);
                }
                return;
            }
            await multipleLocations(allLocations);
        });

    program.parse(process.argv);
}
