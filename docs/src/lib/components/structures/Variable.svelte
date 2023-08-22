<script lang="ts">
    import type {VariableMeta} from "$lib/types/types";

    export let meta: VariableMeta
</script>

<div class="w-full">
    <dt>
        <div class="flex flex-row pr-2 justify-between w-full">
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
        </div>
    </dt>
    <dd class="pl-8">
        <p>{meta.value}</p>
    </dd>
</div>
