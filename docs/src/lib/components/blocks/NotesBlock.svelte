<script lang="ts">
    import type {NotesMeta} from "$lib/types/types";

    export let notes: NotesMeta[]
</script>

{#if notes.length}
    <div class="flex flex-col gap-2 card p-4 variant-glass-surface w-full">
        <header>
            <h2 class="text-2xl font-bold">Notes</h2>
        </header>
        <section>
            {#each notes as note}
                <div class="list-d flex-auto p-2">
                    <p class="font-semibold">{note}</p>
                    <div class="pb-2 pt-4">
                        <hr class="!border-t-2" />
                    </div>
                </div>
            {/each}
        </section>
    </div>
{/if}
