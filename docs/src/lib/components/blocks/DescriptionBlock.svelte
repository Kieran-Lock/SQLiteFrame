<script lang="ts">
    import Badge from "$lib/components/extra/Badge.svelte";

    export let structureName: string
    export let name: string
    export let short: string | null
    export let long: string | null
    export let isGenerator: boolean
    export let isAsync: boolean
    export let isAbstract: boolean
    export let isLambda: boolean
    export let isContextManager: boolean
    export let truncate = false
</script>

<div class="flex flex-col card p-4 gap-4 variant-glass-surface w-full overflow-x-auto">
    <header class="flex flex-row justify-between w-full gap-4">
        <h2 class="text-2xl font-bold">{name}</h2>
        <div class="flex flex-row gap-2 pr-4">
            <Badge text="Generator" isVisible={isGenerator} />
            <Badge text="Asynchronous" isVisible={isAsync} />
            <Badge text="Abstract" isVisible={isAbstract} />
            <Badge text="Lambda" isVisible={isLambda} />
            <Badge text="Context Manager" isVisible={isContextManager} />
            <Badge text={structureName} isVisible />
        </div>
    </header>
    <section class="w-full pt-2 text-left">
        {#if short}
            <p class={truncate ? "truncate" : ""}>{short}</p>
        {/if}
        {#if long}
            <br />
            <p class={truncate ? "truncate" : ""}>{long}</p>
        {/if}
    </section>
</div>
