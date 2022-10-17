<script lang="ts">
    import { Icon } from "@steeze-ui/svelte-icon";
    import { SpeakerXMark, SpeakerWave } from "@steeze-ui/heroicons";
    import { IsMuted } from "../store";
    import { Button } from "attractions";
    import { fade } from "svelte/transition";
</script>

<div class="flex justify-center  bg-gray-50 mute-selector">
    {#if $IsMuted}
        <Button
            outline
            on:click={() => {
                IsMuted.update((current) => !current);
                console.log("Is muted", $IsMuted);
            }}
        >
            <Icon src={SpeakerWave} theme="outline" class="icon-small" />
        </Button>
    {:else}
        <Button
            outline
            on:click={() => {
                IsMuted.update((current) => !current);
                console.log("Is muted", $IsMuted);
            }}
        >
            <Icon
                src={SpeakerXMark}
                theme="outline"
                class="icon-small text-sky-900"
            />
        </Button>
    {/if}
</div>

<style>
    .mute-selector {
        position: fixed;
        top: 20px;
        left: 20px;
    }
    :global(.icon-small) {
        width: 1.6rem;
    }
</style>
