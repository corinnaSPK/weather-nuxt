<template>
	<!-- <div class="mb-28"></div> -->
	<div
		class="daily text-green-dark mx-3 mb-7] shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] border border-black rounded-md overflow-hidden text-center"
		v-for="(el, index) in weekday">
		<!-- <div class="icon__box">
				<span v-if="daily.weathercode == 0"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
						/>
					</svg>
				</span>

				<span
					v-if="
						daily.weathercode[index] === 1 ||
						daily.weathercode[index] === 2 ||
						daily.weathercode[index] === 3
					"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 56 56"
					>
						<path
							fill="currentColor"
							d="M35.986 17.817c.89 0 1.605-.735 1.605-1.605v-4.177c0-.89-.715-1.605-1.605-1.605s-1.605.715-1.605 1.605v4.177c0 .87.716 1.605 1.605 1.605m-11.215 3.732c.638.638 1.682.618 2.282 0c.599-.62.618-1.625 0-2.244l-2.978-2.977a1.593 1.593 0 0 0-2.263 0c-.619.599-.619 1.624 0 2.262Zm20.15 0c.599.618 1.643.638 2.28 0l2.96-2.959c.618-.638.599-1.663 0-2.262a1.593 1.593 0 0 0-2.263 0l-2.978 2.977c-.619.62-.6 1.625 0 2.244m-3.965 17.21c2.842-1.915 4.602-4.873 4.602-8.277a9.55 9.55 0 0 0-9.572-9.59c-3.5 0-6.536 1.875-8.14 4.679c.812.831 1.508 1.74 2.088 2.862c6.38.522 10.5 4.486 11.022 10.326M8.025 49.413h20.923c5.472 0 9.726-4.138 9.726-9.494c0-5.337-4.331-9.36-10.113-9.398c-2.263-4.312-6.285-6.826-10.964-6.826c-6.285 0-11.622 4.892-12.202 11.235C2.108 35.916 0 38.7 0 42.104c0 4.331 3.268 7.31 8.025 7.31m42.194-17.326h4.176c.87 0 1.586-.715 1.605-1.605c0-.89-.735-1.605-1.605-1.605h-4.177c-.87 0-1.605.716-1.605 1.605c0 .89.735 1.605 1.605 1.605m-2.32 12.589a1.61 1.61 0 0 0 2.261-.02c.6-.618.62-1.643 0-2.243l-2.997-2.978c-.618-.599-1.624-.618-2.243 0a1.634 1.634 0 0 0 0 2.282Z"
						/>
					</svg>
				</span>
				<span
					v-if="
						daily.weathercode[index] === 45 || daily.weathercode[index] === 48
					"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 56 56"
					>
						<path
							fill="currentColor"
							d="M12.262 37.106h29.086c7.687 0 13.406-5.837 13.406-13.079c0-7.453-6.094-12.914-14.04-12.914c-2.929-5.789-8.366-9.515-15.14-9.515c-8.812 0-16.078 6.89-16.851 15.609c-4.243 1.219-7.477 4.922-7.477 9.867c0 5.531 4.031 10.031 11.016 10.031m-.047-3.774c-4.805 0-7.219-2.672-7.219-6.14c0-2.837 1.64-5.368 5.625-6.422c1.29-.329 1.758-.938 1.875-2.274c.54-7.64 6.281-13.148 13.078-13.148c5.274 0 9.422 2.882 11.953 8.086c.54 1.125 1.242 1.523 2.625 1.523c6.938 0 10.852 4.195 10.852 9.188c0 5.109-4.078 9.187-9.422 9.187ZM43.246 43.48H12.754c-.82 0-1.477.633-1.477 1.5c0 .844.657 1.477 1.477 1.477h30.492c.82 0 1.477-.633 1.477-1.477c0-.867-.657-1.5-1.477-1.5m0 7.97H12.754c-.82 0-1.477.632-1.477 1.476c0 .843.657 1.476 1.477 1.476h30.492c.82 0 1.477-.633 1.477-1.476c0-.844-.657-1.477-1.477-1.477"
						/>
					</svg>
				</span>
			</div> -->

		<div class="bg-green-dark py-4 px-5 text-center">
			<h3 class="text-xl text-cream">{{ el }}</h3>
		</div>
		<div class="values text-lg">
			<div class="values_upper">
				<div class="values__upper--left border-b border-black p-1 py-3">
					<Icon
						name="wi:snowflake-cold"
						width="30"
						height="30"
						class="text-6xl" />
					<p class="">
						Temperatur <br />
						<span class="text-2xl">
							{{ useFormatterInt(daily.temperature_2m_min[index]) }}
						</span>
						°C <br />
					</p>
					<p>
						Gefühlt <br />
						<span class="text-2xl">
							{{ useFormatterInt(daily.apparent_temperature_min[index]) }}
						</span>
						°C
					</p>
				</div>
				<div
					class="values__upper--right border-l border-b border-black p-1 py-3">
					<Icon
						name="wi:solar-eclipse"
						width="30"
						height="30"
						class="text-6xl" />
					<p>
						Temperatur <br />
						<span class="text-2xl">
							{{ useFormatterInt(daily.temperature_2m_max[index]) }}
						</span>
						°C <br />
					</p>
					<p>
						Gefühlt <br />
						<span class="text-2xl">
							{{ useFormatterInt(daily.apparent_temperature_max[index]) }}
						</span>
						°C
					</p>
				</div>
			</div>
			<div class="values_lower">
				<div class="wind values__lower--left border-b border-black p-1 py-3">
					<Icon name="wi:strong-wind" width="30" height="30" class="text-6xl" />
					<p>
						Wind <br />
						<span class="text-2xl">
							{{ useFormatterInt(daily.wind_speed_10m_max[index]) }}
						</span>
						km/h
					</p>
				</div>
				<div
					class="precip values__lower--right border-b border-l border-black p-1 py-3">
					<Icon name="wi:umbrella" width="30" height="30" class="text-6xl" />
					<p>
						Niederschlag <br />
						<span class="text-2xl">
							{{ useFormatterInt(daily.precipitation_sum[index]) }}
						</span>
						mm
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(["daily", "weekday"]);
// await console.log(weekday.value);
import { useFormatterInt } from "~/composables/formatter";
</script>

<style lang="css" scoped>
.daily {
	/* padding: 3rem; */
	/* border-radius: 5px; */
	/* margin-bottom: 2rem; */
	/* border: 3px solid teal; */
	width: 320px;
	/* border: 1px solid #4b592c; */
	/* border: 1px solid black; */
	/* box-shadow: 5px 5px 0 #4b592c; */
	/* background-color: #264653; */
	/* background-color: #1c2841; */
	/* background-color: #4c5930; */
	/* background-color: #df5139; */
	/* background-color: #4b592c; */
	/* color: #4b592c; */
	/* color: #2a9d8f; */
	/* background-color: #e9c46a; */
	/* background-color: #e76f51; */
}
.daily p {
	margin-bottom: 1em;
}
.values_upper,
.values_lower {
	display: grid;
	grid-template-columns: repeat(2, 50%);
}
</style>
