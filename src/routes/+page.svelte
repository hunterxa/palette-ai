<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import Palette from './Palette.svelte';
	import paletteAI from '$lib/images/palette_ai.png';
    
	export let form: ActionData;

	let generating = false;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="home" content="AI color palette generator" />
</svelte:head>

<header>
	#paletteai | report issues | source code
</header>

<main>
	<div class="home-container">
		<img src={paletteAI} alt="Robot creating a color palette" />
		<div class="app-info">
			<h1>Palette AI</h1>
			<p class="description">
				Enter a <span class="colors">color</span> and have <b>AI</b> generate a color <b>palette</b> for you.
			</p>
		</div>
		{#if form?.missing}
			<p class="error">Please input a color.</p>
		{/if}
		<form 
			method="post" 
			class="color-form" 
			use:enhance={() => {
				generating = true;
				return async ({ update }) => {
					await update();
					generating = false;
				}
			}}
		>
			<input type="text" name="color" placeholder="ex. #4D98AD" autocomplete="off" class="color-input"/>
			<button type="submit" class="color-submit">Generate</button>
		</form>

		{#if generating}
			<div class="center">
				<div class="lds-ring mt-1"><div></div><div></div><div></div><div></div></div>
			</div>
		{:else if form?.success && form?.palette}
			<div class="palette-component">
				<Palette colors={form.palette} />
			</div>
		{:else}
			<div class="palette-component">
				<Palette />
			</div>
		{/if}

	</div>
</main>

<style>
	header {
		text-align: center;
		color: #96728D;
		font-family: 'Rubik', sans-serif;
		font-size: 0.875rem;
	}

	.home-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: 'Rubik', sans-serif;
	}

	img {
		width: 300px;
		height: auto;
	}

	h1 {
		color: #4D99AD;
		margin-bottom: 0;
		text-align: center;
	}

	.description {
		color: #DE6064;
		width: 280px;
		font-size: 1.5rem;
		margin-top: 0.5rem;
	}

	.color-input {
		height: 2.5rem;
		width: 9rem;
		border: 1px solid #FFFFFF;
		border-radius: 0.5rem;
		padding: 0 0 0 0.5rem;
		font-size: 1rem;
		box-shadow: 0px 4px 4px 0px #00000040;
		box-sizing: border-box;
	}

	.color-input:focus {
		outline: none;
		border-color: #96728D;
	}

	.color-submit {
		height: 2.5rem;
		width: 5.5rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #67385B;
		color: #f5f5f5;
		font-size: 1rem;
		font-weight: 600;
		box-shadow: 0px 4px 4px 0px #00000040;
	}

	.color-submit:hover {
		background-color: #96728D;
		cursor: pointer;
	}
	
	.color-submit:active {
		transform: translate(2px, 2px);
		box-shadow: none;
	}

	/**Changing Colors Animation Styles **/
	.colors {
		animation: colorChange 5s infinite;
		animation-direction: alternate;
	}

	@keyframes colorChange {
		0% {
			color: #4D98AD;
		}
		25% {
			color: #8DCEBC;
		}
		50% {
			color: #F28B42;
		}
		75% {
			color: #DE6065;
		}
		100% {
			color: #67385B;
		}
	}

	.error {
		color: #A94B6C;
		font-size: 1.25rem;
		font-style: italic;
		font-weight: 600;
		margin: 0.25rem 0;
	}

	/**Spinning Loader Animation Styles**/
	.lds-ring {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 8px solid #fff;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #fff transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.mt-1 {
		margin-top: 1rem;
	}

	/**Media Queries**/
	@media (min-width: 800px) {
		header {
			text-align: right;
			margin-left: 1rem;
		}

		.home-container {
			display: grid;
			grid-template-columns: 40% 60%;
			margin-left: 2rem;
		}

		.center {
			display: flex;
			justify-content: center;
		}

		img {
			grid-row: 1 / 1;
			grid-column: 1 / 1;
		}

		.app-info {
			grid-row: 2 / 2;
			grid-column: 1 / 1;
		}

		h1 {
			font-size: 4rem;
			text-align: left;
		}

		.description {
			width: 80%;
			font-size: 1.5rem;
		}

		.color-form {
			display: flex;
			justify-content: center;
			gap: 0.5rem;
			grid-row: 2 / 2;
			grid-column: 2 / 2;
		}

		.palette-component {
			grid-row: 1 / 1;
			grid-column: 2 / 2;
		}
	}

	@media (min-width: 1000px) {
		img {
			width: 400px;
			height: 400px;
		}

		.home-container {
			margin: 0 3rem;
		}
	}

	@media (min-width: 1200px) {
		.home-container {
			grid-template-columns: 1fr 1fr;
			margin: 0 6rem;
		}

		img {
			width: auto;
			grid-row: 1 / 1;
			grid-column: 1 / 1;
		}

		.app-info {
			grid-row: 2 / 2;
			grid-column: 1 / 1;
		}

		.color-form {
			grid-row: 2 / 2;
			grid-column: 2 / 2;
		}

		.palette-component {
			grid-row: 1 / 1;
			grid-column: 2 / 2;
		}
	}
</style>
