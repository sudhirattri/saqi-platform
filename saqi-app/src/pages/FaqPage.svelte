<script lang="ts">
    import { scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { link } from "svelte-spa-router";
    import { Constants } from "../store";
    let nextLink = "/prompt";
    let homeLink = "/";
    export let params;
    console.log(params);
</script>

<div
    transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
    class="flex h-screen w-screen "
>
    <div class="w-full m-auto flex flex-col mt-32 mb-32 ">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            use:link={homeLink}
            class="decoration-black no-underline hover:text-black"
            ><h2 class="text-4xl mb-8">SAQI</h2></a
        >
        <h2 class="text-2xl">Faq Page for ID : {params.id}</h2>
    </div>
    <!-- svelte-ignore a11y-missing-attribute -->
</div>
