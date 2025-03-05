const axios = require("axios");
const { getByCity, getByZip, multipleLocations } = require("../src/geoloc-util");

jest.mock("axios");

describe("Geolocations tests", () => {
    test("coordinates by one city and state", async () => {
        axios.get.mockResolvedValue({
            data: [{name: "Fairfield", state: "CT", country: "US", lat: 41.2560, lon: -73.3709}],
        });

        const result = await getByCity("Fairfield", "CT");
        expect(result).toEqual({
            location: "Fairfield, CT (US)", latitude: 41.2560, longitude: -73.3709,
        });
    });

    test("should return coordinates for multiple city/state locations", async () => {
        axios.get
            .mockResolvedValueOnce({
                data: [{name: "Fairfield", state: "CT", country: "US", lat: 41.256, lon: -73.3709}],
            })
            .mockResolvedValueOnce({
                data: [{name: "New York", state: "NY", country: "US", lat: 40.7484, lon: -73.9967}],
            });

        const result = await multipleLocations(["Fairfield,CT", "New York,NY"]);

        expect(result).toEqual([{
            location: "Fairfield, CT (US)", latitude: 41.256, longitude: -73.3709,
        }, {
            location: "New York, NY (US)", latitude: 40.7484, longitude: -73.9967,
        },]);
    });

    test(`valid coordinates by NYC zip code: 10001 `, async () => {
        axios.get.mockResolvedValue({
            data: {name: "New York", country: "US", lat: 40.7484, lon: -73.9967},
        });

        const result = await getByZip('10001');
        expect(result).toEqual({
            location: "New York, US", latitude: 40.7484, longitude: -73.9967,
        });
    });
});

describe("Negative Scenarios for Geolocations", () => {
    test("invalid city / state combination", async () => {
        axios.get.mockResolvedValue({data: []});

        const result = await getByCity("InvalidCity", "AA");
        expect(result).toBeNull();
    });

    test("invalid city", async () => {
        axios.get.mockResolvedValue({data: []});

        const result = await getByCity("InvalidCity");
        expect(result).toBeNull();
    });

    test("invalid state", async () => {
        axios.get.mockResolvedValue({data: []});

        const result = await getByCity("New York", "CT");
        expect(result).toBeNull();
    });

    test("invalid zipcode", async () => {
        axios.get.mockResolvedValue({data: null});

        const result = await getByZip("00000");
        expect(result).toBeNull();
    });
});