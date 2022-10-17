<script lang="ts">
    import { scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { link } from "svelte-spa-router";
    import { Constants } from "../store";
    let nextLink = "/prompt";
    let homeLink = "/";

    type PromptData = {
        id: string;
        tilte: string;
        description: string;
        url: string;
    };

    let prompts: PromptData[] = [
        {
            id: "WhatAirPollution",
            tilte: "Air pollution",
            description:
                "What is air pollution? full description of this prompt",
            url: "/prompt/faq/WhatAirPollution",
        },
        {
            id: "HowToReadAQI",
            tilte: "Air Quality Index",
            description:
                "How to understand AQI measurement? full description of this prompt",
            url: "/prompt/faq/HowToReadAQI",
        },
        {
            id: "WhatSourcesSpatial",
            tilte: "Pollution Sources",
            description:
                "What are the sources of pollution in your locality? full description of this prompt",
            url: "/prompt/faq/WhatSourcesSpatial",
        },
        {
            id: "WhatArePolluters",
            tilte: "Pollutants",
            description:
                "What are these particulate matter and polluting gases? full description of this prompt",
            url: "/prompt/faq/WhatArePolluters",
        },
        {
            id: "AQINearMe",
            tilte: "Find AQI Near me",
            description:
                "What is the AQI near me? full description of this prompt",
            url: "/prompt/aqi",
        },
    ];
</script>

<div
    transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
    class="flex h-screen w-screen "
>
    <div class="w-3/4 m-auto flex flex-col mt-32 mb-32 ">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            use:link={homeLink}
            class="decoration-black no-underline hover:text-black"
            ><h2 class="text-4xl mb-8">SAQI</h2></a
        >
        <div class="flex-1 flow-root">
            <!-- <h2 class="text-2xl mb-8">{$Constants["nextPromptTitle"]}</h2> -->
            <!-- svelte-ignore a11y-no-redundant-roles -->
            <ul
                role="list"
                class="divide-y space-y-2 divide-gray-200 dark:divide-gray-700"
            >
                <!-- <li>
                    <h2 class="text-2xl text-left mb-4">
                        {$Constants["nextPromptTitle"]}
                    </h2>
                </li> -->
                {#each prompts as { id, tilte, description, url }, index (id)}
                    <li class="text-xl text-left py-3 sm:py-4">
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a
                            use:link={url}
                            class="shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <div class="flex items-center space-x-4">
                                <div class="min-w-0">
                                    <p
                                        class="text-xl text-gray-900 truncate dark:text-white"
                                    >
                                        {tilte}
                                    </p>
                                    <p
                                        class="text-xl text-gray-500 truncate dark:text-gray-400"
                                    >
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a use:link={homeLink}>
            <button
                class="text-xl mt-16 p-4 text-center content-center m-auto rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none bg-sky-900 bg-opacity-75 text-white"
                >{$Constants["GoBack"]}
            </button>
        </a>
    </div>
</div>
