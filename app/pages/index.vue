<template>
	<div>
		<div class="search-bar bg-orangered text-cream m-0 py-10 px-14">
			<h1 class="text-center mx-auto mb-8 text-2xl tracking-wider">
				Wie ist das Wetter in ...?
			</h1>
			<div
				class="form flex flex-row flex-wrap gap-5 justify-center items-center"
			>
				<label for="place">Suche nach Ort</label>
				<input
					type="input"
					id="place"
					v-model="place"
					placeholder="Ort"
					@keydown.enter="updatePlace"
					class="text-green-dark border rounded-3xl border-green-dark py-2 px-6 bg-cream"
				/>
				<button
					@click="updatePlace"
					class="start bg-green-dark cursor-pointer py-2 px-6 tracking-wider rounded-3xl"
				>
					Start
				</button>
			</div>
			<div class="options grid place-content-center m-auto py-5" v-show="multi">
				<h2 class="mb-5">Welchen Ort meinst du?</h2>
				<button
					v-for="res in results"
					@click="chooseOption"
					:key="res.place_id"
					:data-lat="res.lat"
					:data-long="res.lon"
					:data-display="res.display_name"
					class="cursor-pointer py-2 px-4 rounded-3xl border border-cream mb-4"
				>
					{{ res.display_name }}
				</button>
			</div>
			<div class="error mt-5" v-show="localError">
				<p>Etwas ist schiefgelaufen. Bitte versuch es noch einmal</p>
			</div>
		</div>
		<div v-if="current">
			<div
				class="current py-16 mb-14 text-cream bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-light to-green-dark"
				:key="current"
				v-show="!localError"
			>
				<!-- {{ results }} -->
				<Current
					:displayName="displayName"
					:weekday="weekday"
					:current="current"
				></Current>
			</div>
			<div
				v-show="!localError"
				class="flex flex-row flex-wrap justify-center mx-auto pb-28"
				:key="daily"
			>
				<Daily :weekday="weekday" :daily="daily"></Daily>
			</div>
		</div>
		<iframe
			data-tally-src="https://tally.so/embed/wd2JNA?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
			loading="lazy"
			width="100%"
			height="1"
			frameborder="0"
			marginheight="0"
			marginwidth="0"
			title="Buchungsanfrage"
		></iframe>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
// !TALLY
onMounted(() => {
	if (Tally) {
		Tally.loadEmbeds();
	} else {
	}
});
// !TALLY
// const weather = ref("typcn:weather-stormy");
const place = ref("Sidney");
const results = ref(null);
const multi = ref(false);
const localError = ref();

const displayName = ref("Sidney");
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
