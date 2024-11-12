<template>
	<div>
		<div class="search-bar bg-orangered text-cream">
			<div class="form">
				<label for="place">Suche nach Ort</label>
				<input
					type="input"
					id="place"
					v-model="place"
					placeholder="Ort"
					@keydown.enter="updatePlace"
					class="text-green-dark"
				/>
				<button
					@click="updatePlace"
					class="start bg-green-dark cursor-pointer py-2 px-6 tracking-wider rounded-3xl"
				>
					Start
				</button>
			</div>
			<div class="options" v-show="multi">
				<h2>Welchen Ort meinst du?</h2>
				<button
					v-for="res in results"
					@click="chooseOption"
					:key="res.place_id"
					:data-lat="res.lat"
					:data-long="res.lon"
					:data-display="res.display_name"
					class="cursor-pointer py-2 px-4 rounded-3xl"
				>
					{{ res.display_name }}
				</button>
			</div>
			<div class="error" v-show="localError">
				<p>Etwas ist schiefgelaufen. Bitte versuch es noch einmal</p>
			</div>
		</div>
		<div class="current bg-green-light" :key="current" v-show="!localError">
			<!-- {{ results }} -->
			<Current
				:displayName="displayName"
				:weekday="weekday"
				:current="current"
			></Current>
		</div>
		<div v-show="!localError" class="prediction__box" :key="daily">
			<Daily :weekday="weekday" :daily="daily"></Daily>
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
		console.log("no tally");
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
let formatter = new Intl.NumberFormat("de-DE");
const formattDay = function (arrayEl, times) {
	arrayEl.forEach((el) => {
		const date = new Date(el * 1000);
		const options = {
			// year: "numeric",
			weekday: "long",
			month: "long",
			day: "numeric",
		};
		const formattedDate = new Intl.DateTimeFormat("de-de", options).format(
			date
		);
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
};
//! Startdaten für 1. Rendern
const latitude = ref(-33.87403366301516);
const longitude = ref(151.19970227627627);

// ! Initial Call Wetter-Api
const {
	data: initData,
	error,
	refresh,
} = await useFetch(`${WEATHER_BASE_URL.value}`);

parseWeatherData(initData.value);
/* current.value = data.value.current_weather;
daily.value = data.value.daily; */

formattDay(daily.value.time, weekday.value);

// !multiple places
const chooseOption = async function ($event) {
	latitude.value = $event.target.getAttribute("data-lat");
	longitude.value = $event.target.getAttribute("data-long");
	const dataFetch = await $fetch(`${WEATHER_BASE_URL.value}`).catch((error) => {
		error.data;
	});

	parseWeatherData(dataFetch);
	multi.value = false;
	displayName.value = $event.target.getAttribute("data-display");
};
// ! Update Long und Lat
const updatePlace = async function ($event) {
	localError.value = null;
	const newPLaceNomiData = await $fetch(`${NOMINATIM_BASE_URL.value}`).catch(
		(error) => {
			error.data;
			console.log(error);
		}
	);

	results.value = newPLaceNomiData;

	if (results.value.length === 0) {
		localError.value = true;
		return;
	}
	if (results.value.length > 1) {
		multi.value = true;

		// console.log($event.target);

		return;
	}
	latitude.value = newPLaceNomiData[0].lat;
	longitude.value = newPLaceNomiData[0].lon;
	displayName.value = newPLaceNomiData[0].display_name;
	const dataFetch = await $fetch(`${WEATHER_BASE_URL.value}`).catch((error) => {
		error.data;
	});

	parseWeatherData(dataFetch);
};
// !update wetter data
</script>

<style lang="css" scoped>
.prediction__box {
	/* border: 1px solid rebeccapurple; */
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	gap: 3rem;
	margin: auto;
	margin-bottom: 100px;
}
.current {
	/* background-color: #4c5930; */
	color: #fcf7f0;
	padding-block: 5rem;

	margin-bottom: 5rem;
	background: radial-gradient(50% 50% at 50% 50%, #75815a 0, #4c5930);
	/* background: radial-gradient(50% 50% at 50% 50%, #91067e 0, #4c5930); */
	/* background-color: #4c5930; */
}

.current h3 {
	letter-spacing: 1px;
}

/* styles input  */
.search-bar {
	/* background-color: #df5139; */
	margin: 0;

	/* color: #fcf7f0; */
	padding: 2rem 5rem;
}
.form {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 2rem;
	align-items: center;
	justify-content: center;
}
.error {
	margin-top: 2rem;
}
input {
	border: 1px solid #4c5930;
	border-radius: 50px;
	padding: 0.5rem 1rem;
}
button {
	color: inherit;
	/* border-radius: 50px; */
	border: none;
	/* padding: 0.5rem 1rem; */
	/* cursor: pointer; */
}

.options {
	display: grid;
	place-content: center;
	text-align: center;
	margin: auto;
	padding-block: 2rem;
}
.options button {
	background-color: transparent;
	border: 1px solid #fcf7f0;
	margin: 0.5rem;
}

iframe {
	border: 3px solid red;
	padding: 50px;
	margin: 50px;
	margin-inline: auto;
	width: 70%;
	background-color: rgb(145, 144, 144);
}
</style>
