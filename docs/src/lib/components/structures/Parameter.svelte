<script lang="ts">
    import type {ParameterMeta} from "$lib/types/types";
    import Badge from "$lib/components/extra/Badge.svelte";

    export let meta: ParameterMeta
</script>

<div class="w-full">
    <dt>
        <div class="flex flex-row justify-between w-full gap-4">
            <div class="flex flex-row gap-2 text-md">
                {#if meta.name}
                    <p class="font-semibold">{meta.name}</p>
                {/if}
                <p> : </p>
                {#if meta.annotation}
                    <p class="italic">{meta.annotation}</p>
                {:else}
                    <p class="italic">No Annotation Specified</p>
                {/if}
            </div>
            <Badge text="Optional" isVisible={meta.isOptional} />
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
