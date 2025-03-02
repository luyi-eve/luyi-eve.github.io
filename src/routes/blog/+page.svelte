<script>
	import BlurFade from '$lib/components/magic/BlurFade.svelte';
	import ProjectCard from '$lib/components/portfolio/ProjectCard.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { DATA } from '$lib/data/resume';
	import { marked } from 'marked';
	let BLUR_FADE_DELAY = 0.04;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Cairo+Play:wght@200..1000&display=swap" rel="stylesheet">

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
<main class="flex min-h-[100dvh] flex-col space-y-10" style="align-items: center;">
	<section id="projects">
		<div class="w-full space-y-12">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<div class="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
							DATA STORY ARCHIVE 
						</div>
						<h2 class="pt-4 subtitle text-3xl font-bold tracking-tighter sm:text-4xl">
							My Previous Work						
						</h2>

						<p
							class="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
						</p>
					</div>
				</div>
			</BlurFade>

			<!-- <div class="w-full max-w-full grid grid-cols-1 gap-3 sm:grid-cols-2 sm:max-w-[800px] sm:w-auto md:w-[800px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[800px] mx-auto"> -->
			<div class="w-full grid grid-cols-1 gap-5 sm:grid-cols-2">
				{#each DATA.archives as archive, id}
						<BlurFade delay={BLUR_FADE_DELAY * 1.5 + id * 0.05}>
							<ProjectCard
								href={archive.href}
								title={archive.title}
								publisher={archive.publisher}
								description={archive.description}
								dates={archive.dates}
								tags={archive.technologies}
								image={archive.image}
								video={archive.video}
								links={archive.links}
							/>
						</BlurFade>
				{/each}
			</div>

			<BlurFade delay={BLUR_FADE_DELAY}>
				<div class="flex flex-col space-y-4 text-center">
					<p class="text-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] leading-relaxed">
						<span class="font-semibold cursor-pointer custom-underline" style="font-family:Cairo Play, serif">
							<a href="/">&larr;  Eve (Yi) Lu</a>
						</span>
					</p>
				</div>
				
			</BlurFade>
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

	
	/* Scoped CSS for this component */
	.custom-underline {
        cursor: pointer;
    }
    .custom-underline:hover {
        text-decoration: underline;
        text-decoration-color: #a1bbff; /* Change underline color on hover */
        text-decoration-thickness: 2px; /* Set the thickness of the underline */
        text-underline-offset: 10px; /* Adjust the space between text and underline */
    }
</style>