<script lang="ts">
    import type {Node} from "$lib/types/types";

    export let variables: Node[]
    export let blockTitle = "Variables"
</script>

{#if variables.length}
    <div class="flex flex-col gap-2 card p-4 variant-glass-surface w-full">
        <header>
            <h2 class="text-2xl font-bold">{blockTitle}</h2>
        </header>
        <section>
            {#each variables as variable}
                <dl class="list-d flex-auto p-2">
                    <div class="flex flex-row justify-between pr-2">
                        <svelte:component this={variable.component} meta={variable.meta} />
                    </div>
                    <div class="pb-2 pt-4">
                        <hr class="!border-t-2" />
                    </div>
                </dl>
            {/each}
        </section>
    </div>
{/if}
