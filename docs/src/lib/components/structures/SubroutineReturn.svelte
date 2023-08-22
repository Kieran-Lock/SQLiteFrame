<script lang="ts">
    import type {SubroutineReturnMeta} from "$lib/types/types";

    export let meta: SubroutineReturnMeta
</script>

<div class="w-full">
    <dt>
        <div class="flex flex-row pr-2 justify-between w-full">
            <div class="flex flex-row gap-2 text-md">
                {#if meta.annotation}
                    <p class="font-semibold">{meta.annotation}</p>
                {:else}
                    <p class="font-semibold italic">No Annotation Specified</p>
                {/if}
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
