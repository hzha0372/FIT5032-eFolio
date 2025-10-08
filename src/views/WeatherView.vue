<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>
    <main>
      <div v-if="weatherData">
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
const apikey = "3b12379dafc6a90e66c96dac947d9277";

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
      latitude: null,
      longitude: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log("✅ Got location:", latitude, longitude);
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          },
          async (error) => {
            console.warn(
              "⚠️ CoreLocation failed, using IP-based location fallback",
              error
            );
            try {
              const ipRes = await axios.get("https://ipapi.co/json");
              const { latitude, longitude } = ipRes.data;
              console.log("🌐 Using IP location:", latitude, longitude);
              const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
              await this.fetchWeatherData(url);
            } catch (err) {
              console.error("Error fetching IP-based location weather:", err);
            }
          },
          { timeout: 5000 }
        );
      }
    },

    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },

    async searchByCity() {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${apikey}`
        );
        console.log("search location response", response.data);
        this.latitude = response.data[0].lat;
        this.longitude = response.data[0].lon;
        console.log("search location response this.latitude", this.latitude);
        console.log("search location response this.longitude", this.longitude);
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${apikey}`;
        console.log("search url", url);
        await this.fetchWeatherData(url);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
  },
};
</script>
<style></style>

