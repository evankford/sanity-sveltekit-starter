<script context="module" lang="ts">
  /** @type {import('./__types/__layout.d.ts').Load} */
  export async function load({ fetch }) {
    const url = '/site.json';
    try {
      const res = await fetch(url);
      const data:SiteSettings = await res.json();

      return {
        status: res.status,
        props: {
          codes: data.codes,
          header: data.header,
          footer: data.footer,
          seo: data.seo,
          contact: data.contact,
          jobs: data.jobs,
          socials: data.socials
        },
      }
    } catch(e) {
      return {
        status: 500
      }
    }``

  }
</script>

<script lang="ts">
  ///Okay, doing some hover type things here
  import { browser } from "$app/env";
  import { primaryInput } from "detect-it";


  import { navigating } from "$app/stores";
  navigating.subscribe(val=> {
    if (val) {
      navOpen.set(false);
    }
  })


  import { MetaTags } from 'svelte-meta-tags';
  import { urlFor } from "$lib/sanity";
  import { hasJobs, navOpen, socials as socialStore, seo as seoStore, contact as contactStore} from "$lib/stores";

  import Header from "$lib/sections/Header.svelte";
  import SkipButton from "$lib/components/SkipButton.svelte";
  import Footer from "$lib/sections/Footer.svelte";
  import {  onMount } from "svelte";

  function setGlobalStores() {
    hasJobs.set(jobs.openings && jobs.openings.length > 0);
    socialStore.set(socials.socials);
    seoStore.set(seo);
    contactStore.set(contact);
  }

  onMount(()=> {
    setGlobalStores();
  });


  export let header: HeaderSettings, socials: SocialMediaSettings,  footer:FooterSettings, codes:CodeSnippetSettings, contact: ContactSettings, seo: SiteSEO, jobs: JobSettings;

</script>

<svelte:head>
  {#if seo.favicon}
      <link rel="icon" type="image/png" href="{urlFor(seo.favicon).width(32).height(32).url()}" />
  {/if}
  {#if codes?.headerCode?.length}
  <!-- Header Code Inserts -->
    {#each codes.headerCode as codeSnippet}
      {#if codeSnippet.active}
        {@html codeSnippet.code.code}
      {/if}
    {/each}
  {/if}


</svelte:head>

<MetaTags
  title={seo ? seo.title : 'Futureshirts'}
  noindex={seo ? seo.nofollow : false}
  nofollow={seo ? seo.nofollow : false}
  description={seo ? seo.description : undefined}
  canonical={import.meta.env.VITE_CANONICAL_URL}
  openGraph={{
    url: import.meta.env.VITE_CANONICAL_URL,
    title:seo ? seo.title : 'Futureshirts',
    description: seo ? seo.description : undefined,
    images: seo && seo.image ? [
       {
        url: urlFor(seo.image).width(1200).height(900).url(),
        height: 900,
        width: 1200
      } ] : undefined
    ,
    site_name: 'Futureshirts'
  }}
  twitter={{
    handle: '@futureshirts',
    site: '@futureshirts',
    title:seo ? seo.title : 'Futureshirts',
    description: seo ? seo.description : undefined,
    image: seo && seo.image ?  urlFor(seo.image).width(1200).height(900).url() : undefined,
    imageAlt: 'Futureshirts'
  }}
/>

<SkipButton />
<!-- <div class="helper">
  <span>Center: [{center[0]}, {center[1]}]</span><span>Rotate: [{rotate[0]}, {rotate[1]}]</span>
</div> -->
<Header {...header} smallMenuItems={footer?.menuItems}/>
<main id="MainContent">
<slot></slot>
</main>
<Footer {...footer} />

{#if codes?.footerCode?.length}
<!-- Footer Code inserts -->
  {#each codes.footerCode as codeSnippet}
    {#if codeSnippet.active}
      {@html codeSnippet.code.code}
    {/if}
  {/each}
{/if}

<style lang="scss" global>
  //Import global styles
  @use "../lib/styles/ress";
  @use "../lib/styles/app";
  @use "../lib/styles/devices";

  main {
    // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }

  .helper {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 10px;
    z-index: 150;
    background: white;
    span {
      display: block;
      padding: 0.4em
    }
  }
</style>
