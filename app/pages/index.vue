<template>
	<div>
		<div class="search-bar bg-orangered text-cream m-0 py-16 px-14">
			<h1 class="text-center mx-auto mb-8 text-2xl tracking-wider">
				Wie ist das Wetter in ...?
			</h1>
			<div
				class="form flex flex-row flex-wrap gap-5 justify-center items-start">
				<div class="flex flex-col">
					<input
						type="input"
						id="place"
						v-model="place"
						placeholder="Ort"
						@keydown.enter="updatePlace"
						class="text-green-dark mb-3 border border-black rounded-md py-2 px-6 bg-cream shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)]" />
					<label for="place" class="text-center">Suche nach Ort</label>
				</div>
				<button
					@click="updatePlace"
					class="start bg-green-dark cursor-pointer py-2 px-6 tracking-wider border-black rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)]">
					Start
				</button>
			</div>
			<div
				class="options grid place-content-center m-auto py-5 text-center"
				v-show="multi">
				<h2 class="mb-5 text-2xl">Welchen Ort meinst du?</h2>
				<button
					v-for="res in results"
					@click="chooseOption"
					:key="res.place_id"
					:data-lat="res.lat"
					:data-long="res.lon"
					:data-display="res.display_name"
					:data-name="res.name"
					class="cursor-pointer py-2 px-4 rounded-md border border-cream mb-4">
					{{ res.display_name }}
				</button>
			</div>
			<div class="error mt-5" v-show="localError">
				<p>Etwas ist schiefgelaufen. Bitte versuch es noch einmal</p>
			</div>
		</div>
		<div v-if="current">
			<div
				class="current py-16 mb-14 text-cream bg-green-dark"
				:key="current"
				v-show="!localError">
				<Current
					:displayName="displayName"
					:shortName="shortName"
					:weekday="weekday"
					:current="current"></Current>
			</div>
			<div
				v-show="!localError"
				class="flex flex-row flex-wrap justify-center mx-auto gap-12 py-28 max-w-4xl"
				:key="daily">
				<Daily :weekday="weekday" :daily="daily"></Daily>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// const weather = ref("typcn:weather-stormy");
const place = ref("Sidney");
const results = ref(null);
const multi = ref(false);
const localError = ref();

const displayName = ref("Sidney");
const shortName = ref("Sidney");
const current = ref();
const daily = ref();
const weekday = ref([]);

//! Variablen Geocoding API

const NOMINATIM_BASE_URL = computed(() => {
	return (
		"https://nominatim.openstreetmap.org/search?q=" +
		place.value +
		"&format=json"
	);
});

// !Wetter URL computen
const WEATHER_BASE_URL = computed(() => {
	return (
		"https://api.open-meteo.com/v1/forecast?latitude=" +
		latitude.value +
		"&longitude=" +
		longitude.value +
		"&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max&current_weather=true&timeformat=unixtime&timezone=Europe%2FBerlin"
	);
});

// !capitalize letter

function capitalizeFLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// !Zahlen + daten formatieren
const formattDay = function (arrayEl, times) {
	arrayEl.forEach((el) => {
		const date = new Date(el * 1000);
		const options = {
			// year: "numeric",
			weekday: "long",
			month: "long",
			day: "numeric",
			// hour: "numeric",
			// minute: "numeric",
			// second: "numeric",
		};
		const formattedDate = new Intl.DateTimeFormat("de-de", options).format(
			date
		);
		// console.log(formattedDate);
		times.push(formattedDate);
	});
};
// !icon festlegen
const weather = computed(() => {
	if (capitalizeFLetter(place.value) === "Sidney") return "mdi:weather-dust";
	else if (capitalizeFLetter(place.value) === "Warstein")
		return "typcn:weather-stormy";
	else return "carbon:radar-weather";
	// return place.value === "Sidney" ? "mdi:weather-dust" : "typcn:weather-stormy";
});
// !parse current + daily
const parseWeatherData = function (fetchData) {
	current.value = fetchData.current_weather;
	daily.value = fetchData.daily;
	return;
};
//! Startdaten für 1. Rendern
const latitude = ref(-33.87403366301516);
const longitude = ref(151.19970227627627);
onMounted(async () => {
	/* const {
		data: initData,
		error,
		refresh,
	} = await useFetch(`${WEATHER_BASE_URL.value}`);

	parseWeatherData(initData.value);
	formattDay(daily.value.time, weekday.value);
	console.log(weekday.value); */
	try {
		const newDataFetch = await $fetch(`${WEATHER_BASE_URL.value}`);
		parseWeatherData(newDataFetch);
		formattDay(daily.value.time, weekday.value);
	} catch (error) {
		console.error(error);
	}
	console.log(current.value);
});

// ! Initial Call Wetter-Api
/* const {
	data: initData,
	error,
	refresh,
} = await useFetch(`${WEATHER_BASE_URL.value}`);

parseWeatherData(initData.value);
formattDay(daily.value.time, weekday.value);
console.log(current.value);
console.log(daily.value); */
// !multiple places
const chooseOption = async function ($event) {
	latitude.value = $event.target.getAttribute("data-lat");
	longitude.value = $event.target.getAttribute("data-long");
	try {
		const dataFetch = await $fetch(`${WEATHER_BASE_URL.value}`);
		parseWeatherData(dataFetch);
		formattDay(daily.value.time, weekday.value);

		multi.value = false;
		displayName.value = $event.target.getAttribute("data-display");
		shortName.value = $event.target.getAttribute("data-name");
	} catch (error) {
		console.error(error);
	}
};
// ! Update Long und Lat
const updatePlace = async function ($event) {
	weekday.value = [];

	localError.value = null;
	try {
		const newPLaceNomiData = await $fetch(`${NOMINATIM_BASE_URL.value}`);
		results.value = newPLaceNomiData;
		if (results.value.length === 0) {
			localError.value = true;
			return;
		}
		if (results.value.length > 1) {
			multi.value = true;

			return;
		}
		latitude.value = newPLaceNomiData[0].lat;
		longitude.value = newPLaceNomiData[0].lon;
		displayName.value = newPLaceNomiData[0].display_name;
		shortName.value = newPLaceNomiData[0].name;
		console.log(newPLaceNomiData[0]);
		const dataFetch = await $fetch(`${WEATHER_BASE_URL.value}`);

		formattDay(daily.value.time, weekday.value);
		parseWeatherData(dataFetch);
		console.log(weekday.value);
	} catch (error) {
		console.error(error);
	}
};
// !update wetter data
</script>

<style lang="css" scoped>
iframe {
	padding: 50px;
	margin: 50px;
	margin-inline: auto;
	width: 70%;
	background-color: rgb(145, 144, 144);
	background-color: whitesmoke;
	display: none;
}
</style>
