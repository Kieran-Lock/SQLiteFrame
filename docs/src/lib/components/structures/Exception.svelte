<script lang="ts">
    import type {ErrorMeta} from "$lib/types/types";

    export let meta: ErrorMeta
</script>

<div class="w-full">
    <dt>
        <div class="flex flex-row pr-2 justify-between w-full">
            <div class="flex flex-row gap-2 text-md">
                <p class="font-semibold">{meta.name}</p>
            </div>
        </div>
    </dt>
    <dd class="pl-8">
        {#if meta.description}
            <p>{meta.description}</p>
        {:else}
            <p class="italic">No Description Provided</p>
        {/if}
    </dd>
</div>
