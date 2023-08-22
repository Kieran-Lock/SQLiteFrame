<script lang="ts">
    import {CodeBlock} from "@skeletonlabs/skeleton";
    import type {ExamplesMeta} from "$lib/types/types";

    export let examples: ExamplesMeta[]
</script>

{#if examples.length}
    <div class="flex flex-col gap-2 card p-4 variant-glass-surface w-full">
        <header>
            <h2 class="text-2xl font-bold">Examples</h2>
        </header>
        <section>
            {#each examples as example}
                <div class="flex flex-col list-d p-2 gap-2">
                    <p class="font-semibold">{example.header}</p>
                    {#if example.code}
                        <CodeBlock class="w-full my-2 max-h-[30vh] overflow-y-auto" language="Python" code={example.code}></CodeBlock>
                    {/if}
                    {#if example.footer}
                        <p>{example.footer}</p>
                    {/if}
                    <div class="pb-2 pt-4">
                        <hr class="!border-t-2" />
                    </div>
                </div>
            {/each}
        </section>
    </div>
{/if}
