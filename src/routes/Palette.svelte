<script lang="ts">
  import { fly, fade } from 'svelte/transition';

  export let colors: string[] = [
    "#4D98AD",
    "#8DCEBC",
    "#FCD76B",
    "#F28B42",
    "#DE6065",
    "#67385B",
  ];

  let showCopied = false;
</script>

<div class="palette-container">
  <div class="palette" in:fly={{x: 50, duration: 1000}}>
    {#each colors as color}
      <button 
        class="color-box" 
        style="background-color: {color}"
        on:click={() => {
          navigator.clipboard.writeText(color)
          showCopied = true;
          setTimeout(() => showCopied = false, 1000);
        }}
      >
      </button>
    {/each}
    {#if showCopied}
      <p out:fade class="copied-alert">Copied!</p>
    {/if}
  </div>
  <p class="info">click any color to copy it's value</p>
</div>

<style>
  .palette {
		display: flex;
		gap: 0.5rem;
    height: 7rem;
		margin-top: 2rem;
    position: relative;
	}

	.color-box {
		width: 3rem;
		height: 100%;
		box-shadow: 0 0.2rem 0.2rem 0 #00000040;
    border: none;
	}

  .color-box:hover {
    cursor: pointer;
  }

  .copied-alert {
    position: absolute;
    bottom: 0;
    left: 42%;
    color: #F5F5F5;
    background: #411D3F;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  .info {
    color: #96728D;
    margin-top: 1.5rem;
    text-align: center;
  }

  @media (min-width: 800px) {
    .color-box {
      width: 4.4rem;
    }

    .palette-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .palette {
      height: 18rem;
    }
  }


  @media (min-width: 1200px) {
    .palette {
      height: 18rem;
    }
  }

</style>