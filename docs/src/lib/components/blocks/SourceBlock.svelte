<script lang="ts">
    import {CodeBlock, RadioGroup, RadioItem} from "@skeletonlabs/skeleton";
    export let source: string
    export let signature: string

    let isSignature = false
</script>

<div class="flex flex-col gap-2 card p-4 variant-glass-surface w-full">
    <header class="flex flex-row justify-between">
        <h2 class="text-2xl font-bold">Source</h2>
        {#if signature}
            <RadioGroup rounded="rounded-container-token">
                <RadioItem bind:group={isSignature} name="toggle" value={false}>Source</RadioItem>
                <RadioItem bind:group={isSignature} name="toggle" value={true}>Signature</RadioItem>
            </RadioGroup>
        {/if}
    </header>
    <section>
        <CodeBlock class="w-full max-h-[80vh] overflow-y-auto" language="Python" code={isSignature && signature ? signature : source}></CodeBlock>
    </section>
</div>
