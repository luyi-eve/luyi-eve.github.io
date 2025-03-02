<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Button from '$lib/components/ui/button/button.svelte';
	import { mode } from 'mode-watcher';
	$: theme = $mode;

	import BlurFade from '$lib/components/magic/BlurFade.svelte';
	let BLUR_FADE_DELAY = 0.04;

	import ReportingCard from '$lib/components/portfolio/ReportingCard.svelte';
	import ProjectCard from '$lib/components/portfolio/ProjectCard.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { DATA } from '$lib/data/resume';
	import { marked } from 'marked';
	import { fly } from "svelte/transition";

	import { videos } from "./videoData"; // Import videos array
	let currentIndex = 0; // No need for writable store
	let direction = 1; // Controls slide direction
	function nextVideo() {
		direction = 1;
		currentIndex = (currentIndex + 1) % videos.length; // Loops back after the last video
	}
	function prevVideo() {
		direction = -1;
		currentIndex = (currentIndex - 1 + videos.length) % videos.length; // Loops back to the last video
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Cairo+Play:wght@200..1000&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

	<title>{DATA.name}</title>
	<meta name="description" content={DATA.description} />
	<meta property="og:title" content={DATA.name} />
	<meta property="og:description" content={DATA.description} />
	<meta property="og:url" content={DATA.url} />
	<meta property="og:site_name" content={DATA.name} />
	<meta property="og:image" content={DATA.img} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content="website" />
	<meta name="robots" content="index, follow" />
	<meta
		name="googlebot"
		content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
	/>
	<meta name="twitter:title" content={DATA.name} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={DATA.img} />
	<meta name="twitter:description" content={DATA.description} />

	<meta name="google-site-verification" content="your-google-verification-code" />
	<meta name="yandex-verification" content="your-yandex-verification-code" />
</svelte:head>
<main class="flex min-h-[100dvh] flex-col space-y-10">
	<section id="intro">
		<div class="mx-auto w-full max-w-2xl space-y-8">
			<div class="flex justify-between gap-2">
				<div class="flex flex-1 flex-col space-y-1.5">
					<BlurFade
						delay={BLUR_FADE_DELAY}
						class=
						"font-bold tracking-tighter pb-4 text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl"
						yOffset={8}>
							<div style='font-family:"Cairo Play", serif;'>
								Hi, I'm Eve (Yi) Lu✨
							</div>
						</BlurFade>
					<BlurFade class="md:text-xl" delay={BLUR_FADE_DELAY}
						>I'm a data journalist. I tell stories with data📊, create graphics🎨 and sometimes make films📹.
					</BlurFade>
				</div>
			</div>
		</div>
	</section>
	<section id="about">
		<BlurFade delay={BLUR_FADE_DELAY}>
			<h2 class="text-xl font-bold">About</h2>
		</BlurFade>
		<BlurFade delay={BLUR_FADE_DELAY * 1.4}>
			<div
				class="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
				style="line-height: 1.6;"
			>
			I am a recent graduate of <span style="text-decoration: underline; font-weight: bold;">Stanford University</span> in Data Journalism, and a data reporter intern for <span style="text-decoration: underline; font-weight: bold;">Tampa Bay Times</span> in the summer of 2024. Prior to Stanford, I hold a M.A. degree in Journalism at the <span style="text-decoration: underline; font-weight: bold;">University of Miami</span> and an alumna of the <span style="text-decoration: underline; font-weight: bold;">Lede Program</span> in 2022. I care about <span style="text-decoration: underline; font-weight: bold;">social gender inequalities</span> and <span style="text-decoration: underline; font-weight: bold;">global environmental matters</span>. Born and raised in Shanghai, I speak English and Mandarin. While not coding, I watch thriller movies alone 🍿 and collect Hello Kittys 🎀₍^. .^₎⟆.
			</div>
		</BlurFade>
		<BlurFade delay={BLUR_FADE_DELAY * 1.4}>
			<div
				class="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
			>
		</BlurFade>
	</section>
	<section id="skills">
		<div class="flex min-h-0 flex-col gap-y-3">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<h2 class="text-xl font-bold">Tools I use</h2>
			</BlurFade>
			<div class="flex flex-wrap gap-1">
					<BlurFade delay={BLUR_FADE_DELAY +0.002}>
						<div
							class="px-1 prose max-w-full text-pretty font-sans text-[14px] text-muted-foreground dark:prose-invert"
							style="line-height: 1.6;"
						>
							<span class="font-light">████▒▒▒▒▒▒▒▒▒ ?%: I've been self-teaching </span><Badge style=" margin-right:3px; margin-bottom:9px; background-color:#D9F9F4;color:black">Svelte</Badge><span class="font-light">  bit by bit lately.</span> 
					</div>
					</BlurFade>
					<BlurFade delay={BLUR_FADE_DELAY + 0.002}>
						<Badge style="margin-right:3px; margin-bottom:9px; background-color:#D9F9F4;color:black">Python</Badge>
						<Badge style="margin-right:3px; margin-bottom:9px; background-color:#D9F9F4; rounded-lg;color:black">Adobe Illustrator</Badge>
						<Badge style="margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black">Javascript/D3.js</Badge>
						<Badge style="margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black">HTML/CSS</Badge>
						<Badge style="margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black">Mapbox</Badge>
						<Badge style="margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black">QGIS</Badge>
						<Badge style="margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black">Datawrapper</Badge>
						<Badge style="margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black">Flourish</Badge>
						<Badge style="margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black">etc</Badge>

					</BlurFade>
			</div>
		</div>
	</section>
	<section id="social-media-icon" style="margin-top:10px">
		<div class="pt-4">
			{#each Object.entries(DATA.contact.social)
				.filter(([_, social]) => social.navbar)
				.map(([_, social]) => social) as social}
					<Tooltip.Root openDelay={300}>
						<Tooltip.Trigger>
							<Button href={social.url} variant="ghost" size="icon" class="size-12 rounded-full">
								<!-- <svelte:component this={social.icon} class="size-4" strokeWidth={1.5} /> -->
								{#if social?.dark_icon && theme === 'dark'}
									<img src={social?.dark_icon} class="size-4" alt={social.name} />
								{:else}
									<img src={social.icon} class="size-[18px]" alt={social.name} />
								{/if}
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>{social.name}</p>
						</Tooltip.Content>
					</Tooltip.Root>
			{/each}
		</div>	
	</section>
	<section id="datavizs">
		<div class="w-full space-y-12 py-10">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<div class="inline-block bg-foreground px-3 py-1 text-sm text-background"
						style="background-color:#123524"
						>
							DATA STORY
						</div>
						<h2 class="pt-4 subtitle text-3xl font-bold tracking-tighter sm:text-4xl">I make graphics
						</h2>

						<p
							class="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
							
						</p>
					</div>
				</div>
			</BlurFade>

			<!-- <div class="w-full max-w-full grid grid-cols-1 gap-3 sm:grid-cols-3 sm:max-w-[800px] sm:w-auto md:w-[800px] lg:w-[800px] xl:w-[800px] 2xl:w-[800px] mx-auto"> -->
			<div class="w-full grid grid-cols-1 gap-5 sm:grid-cols-2">
				{#each DATA.datavizs as dataviz, id}
						<BlurFade delay={BLUR_FADE_DELAY * 1.5 + id * 0.05}>
							<ProjectCard
								href={dataviz.href}
								title={dataviz.title}
								publisher={dataviz.publisher}
								description={dataviz.description}
								dates={dataviz.dates}
								tags={dataviz.technologies}
								image={dataviz.image}
								video={dataviz.video}
								links={dataviz.links}
							/>
						</BlurFade>
				{/each}
			</div>

			<BlurFade delay={BLUR_FADE_DELAY}>
				<div class="flex flex-col space-y-4 text-center">
					<p class="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] leading-relaxed">
						<span class="font-semibold cursor-pointer custom-underline" style="font-family:Cairo Play, serif">
							View Data Projects <a href="/blog">Archive →</a>
						</span>
					</p>
				</div>
				
			</BlurFade>
		</div>
	</section>
	<section id="reportings">
		<div class="w-full space-y-8 py-10">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<div class="inline-block bg-foreground px-3 py-1 text-sm text-background" style="background-color:#123524">
							NEWS REPORTING
						</div>
						<h2 class="pt-4 subtitle text-3xl font-bold tracking-tighter sm:text-4xl">I write words</h2>
						<p
							class="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
						</p>
					</div>
				</div>
			</BlurFade>
			<BlurFade delay={BLUR_FADE_DELAY * 2}>
				<ul class="mb-4 ml-4 divide-y divide-dashed"> 
					{#each DATA.reportings as project}
						<BlurFade delay={BLUR_FADE_DELAY}>
							<ReportingCard {...project} />
						</BlurFade>
					{/each}
				</ul>
			</BlurFade>
		</div>
	</section>
	<section id="videos">
		<div class="w-full space-y-12 py-4">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<div class="inline-block bg-foreground px-3 py-1 text-sm text-background" style="background-color:#123524">
							DOCUMENTARY
						</div>
						<h2 class="pt-4 subtitle text-3xl font-bold tracking-tighter sm:text-4xl">I produce films</h2>
						<p
							class="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
						</p>
					</div>
				</div>
			</BlurFade>
		<div class="slider-container">
		  {#each videos as video, index}
			{#if index === currentIndex}
			  <iframe
				width="600"
				height="350"
				src={video.src}
				title={video.title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				transition:fly={{ x: direction * 50, duration: 400 }}
			  ></iframe>

			<!-- Grid Layout for Arrows & Text -->
			<div class="video-grid">
				<!-- Left Arrow -->
				<button on:click={prevVideo} class="arrow left">&larr;</button>
	
				<!-- Video Information (Center Column) -->
				<div class="video-info">
				  <p class="watch-time">Watch · {video.length}</p>
				  <h2>{video.title}</h2>
				  <p>{video.description}</p>
				</div>
	
				<!-- Right Arrow -->
				<button on:click={nextVideo} class="arrow right">&rarr;</button>
				
			</div>
			 
			{/if}
		  {/each}
		</div>

	</section>
	<section id="credit">
		<div class="grid w-full items-center justify-center gap-4 px-4 pt-0 pb-10 md:px-6">
			<BlurFade delay={BLUR_FADE_DELAY * 2}>
				<div class="space-y-3">
					<p class="text-sm" style="color:grey">
						© Copyright ･ Svelte template ･<a class="custom-underline" href="https://github.com/SikandarJODD" target="_blank" rel="noopener noreferrer"> 
							Sikandar S. Bhide 
						  </a>
					</p> 
						
				</div>
			</BlurFade>
		</div>
	</section>
</main>

<style>
	main p {
		color:#4A4A4A
	}
	
	h2.subtitle {
		font-family:"Cairo Play", serif;
		color: #000000ba
	}

	.slider-container {
		justify-content: center; /* Centers horizontally */
		align-items: center; /* Centers vertically */
		width: 100%;
		height: 520px;
		overflow: hidden;
		position: relative;
	}

	.slider-container iframe {
		width: 100%; /* Adjusts to full container width */
		max-width: 600px; /* Prevents iframe from growing too large */
		height: 100%;
		max-height: 350px;
		display: block;
		margin: auto;
	}  

	/* Grid Layout for Arrows and Text */
	.video-grid {
		display: grid;
		grid-template-columns: 0.35fr 2.3fr 0.35fr;
		align-items: center;
		width: 100%;
		margin-top: 30px;
		margin-bottom: 65px;

	}

	/* Center Text Content */
	.video-info {
		text-align: left;
	}

	.watch-time {
		font-size: 12px;
		color: gray;
	}

	.video-info h2 {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.video-info p {
		font-size: 14px;
		color: #555;
	}

	/* Navigation Arrows */
	.arrow {
		background-color:#e6ecfc;
		font-family:"Cairo Play", serif;
		color: black;
		border: none;
		padding: 5px 7.5px;
		font-size: 10px;
		cursor: pointer;
		border-radius: 50%;
		transition: background 0.3s ease;
	}

	.arrow:hover {
		background-color: #bdf8d2;
	}

	/* Ensures arrows are aligned properly */
	.left {
		justify-self: start;
	}

	.right {
		justify-self: end;
	}

	/* Scoped CSS for this component */
	.custom-underline {
        cursor: pointer;
    }
    .custom-underline:hover {
        text-decoration: underline;
        text-decoration-color: #adc4fe; /* Change underline color on hover */
        text-decoration-thickness: 2px; /* Set the thickness of the underline */
        text-underline-offset: 10px; /* Adjust the space between text and underline */
    }

</style>
