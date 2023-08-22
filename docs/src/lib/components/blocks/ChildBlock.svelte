<script lang="ts">

    import type {Node} from "$lib/types/types";

    export let childType: string
    export let childList: Node[]
</script>

{#if childList.length}
    <div class="flex flex-col gap-2 card p-4 variant-glass-surface w-full">
        <header>
            <h2 class="text-2xl font-bold">{childType}</h2>
        </header>
        <section>
            {#each childList as child}
                <dl class="list-d flex-auto p-2">
                    <div class="flex flex-row justify-between pr-2">
                        <svelte:component this={child.component} meta={child.meta} />
                    </div>
                    <div class="pb-2 pt-4">
                        <hr class="!border-t-2" />
                    </div>
                </dl>
            {/each}
        </section>
    </div>
{/if}
