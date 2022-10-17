<script>
    import { link } from "svelte-spa-router";
    let nextLink = "/options/lang";
    import { fade, scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
</script>

<div
    transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
    class="flex justify-center h-screen w-screen"
>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="" use:link={nextLink}>
        <img
            style="height: 100%;"
            class="object-contain"
            src="saqi.png"
            alt="saqi_logo"
        />
    </a>
</div>

<style>
</style>
