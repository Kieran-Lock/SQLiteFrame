<script lang="ts">
    import type {Node} from "$lib/types/types";

    export let returns: Node[]
</script>

{#if returns.length}
    <div class="flex flex-col gap-2 card p-4 variant-glass-surface w-full">
        <header>
            <h2 class="text-2xl font-bold">Returns</h2>
        </header>
        <section>
            {#each returns as return_}
                <dl class="list-d flex-auto p-2">
                    <svelte:component this={return_.component} meta={return_.meta} />
                    <div class="pb-2 pt-4">
                        <hr class="!border-t-2" />
                    </div>
                </dl>
            {/each}
        </section>
    </div>
{/if}
