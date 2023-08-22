<script lang="ts">
    import type {LinksMeta} from "$lib/types/types";

    export let links: LinksMeta[]
</script>

{#if links.length}
    <div class="flex flex-col gap-2 card p-4 variant-glass-surface w-full">
        <header>
            <h2 class="text-2xl font-bold">Links</h2>
        </header>
        <section>
            {#each links as link}
                <dl class="list-d flex-auto p-2">
                    <div class="w-full">
                        <a href={link.href} target="_blank" class="btn p-0">
                            <div class="flex flex-row justify-between pr-2">
                                <div class="w-full">
                                    <dt>
                                        <div class="flex flex-row pr-2 justify-between w-full">
                                            <div class="flex flex-row gap-2 text-md">
                                                <p class="font-semibold">{link.title}</p>
                                            </div>
                                        </div>
                                    </dt>
                                    <dd class="pl-8">
                                        {#if link.description}
                                            <p>{link.description}</p>
                                        {:else}
                                            <p class="italic">No Description Provided</p>
                                        {/if}
                                    </dd>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="pb-2 pt-4">
                        <hr class="!border-t-2" />
                    </div>
                </dl>
            {/each}
        </section>
    </div>
{/if}
