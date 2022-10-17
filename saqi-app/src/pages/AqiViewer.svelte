<script lang="ts">
    import { scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { link } from "svelte-spa-router";
    import { Constants } from "../store";
    import { DatePicker } from "attractions";
    let nextLink = "/prompt";
    let homeLink = "/";
    let pickedRange;
</script>

<div
    transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
    class="flex h-screen w-screen "
>
    <div class="w-3/4 m-auto flex flex-col mt-16 mb-32 space-y-4">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            use:link={homeLink}
            class="decoration-black no-underline hover:text-black"
            ><h2 class="text-4xl mb-4">SAQI</h2></a
        >
        <div
            class="flex-1 text-center bg-slate-100 rounded-lg border border-slate-400 shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
            <h2 class="text-center mb-4 text-2xl">Select date range</h2>
            <DatePicker range />

            <div
                class="p-4 rounded-lg md:p-8 dark:bg-gray-800"
                id="stats"
                role="tabpanel"
                aria-labelledby="stats-tab"
            >
                <dl
                    class="mt-8 grid grid-cols-2 gap-8 p-4 mx-auto max-w-screen-xl text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8"
                >
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-3xl font-extrabold">47 μg/m3</dt>
                        <dd class="font-lg text-gray-500 dark:text-gray-400">
                            PM 2.5
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-3xl font-extrabold">67 μg/m3</dt>
                        <dd class="font-lg text-gray-500 dark:text-gray-400">
                            PM 10
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-3xl font-extrabold">12 μg/m3</dt>
                        <dd class="font-lg text-gray-500 dark:text-gray-400">
                            PM 1.0
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-3xl font-extrabold">35°C</dt>
                        <dd class="font-lg text-gray-500 dark:text-gray-400">
                            Temprature
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-3xl font-extrabold">53.24%</dt>
                        <dd class="font-lg text-gray-500 dark:text-gray-400">
                            Humidity
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-3xl font-extrabold">29.96 "Hg</dt>
                        <dd class="font-light text-gray-500 dark:text-gray-400">
                            Pressure
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a use:link={nextLink}>
            <button
                class="text-xl mt-16 p-4 text-center content-center m-auto rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none bg-sky-900 bg-opacity-75 text-white"
                >{$Constants["nextPromptTitle"]}
            </button>
        </a>
    </div>
</div>
