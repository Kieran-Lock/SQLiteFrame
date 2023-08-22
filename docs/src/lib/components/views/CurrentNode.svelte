<script lang="ts">
    import DescriptionBlock from "$lib/components/blocks/DescriptionBlock.svelte";
    import ParametersBlock from "$lib/components/blocks/ParametersBlock.svelte";
    import ReturnsBlock from "$lib/components/blocks/ReturnsBlock.svelte";
    import RaisesBlock from "$lib/components/blocks/RaisesBlock.svelte";
    import DeprecationBlock from "$lib/components/blocks/DeprecationBlock.svelte";
    import {onDestroy} from "svelte";
    import {activeNode} from "$lib/stores/node";
    import SourceBlock from "$lib/components/blocks/SourceBlock.svelte";
    import type {AnyTreeOnlyMeta, Node} from "$lib/types/types";
    import VariablesBlock from "$lib/components/blocks/VariablesBlock.svelte";
    import ChildBlock from "$lib/components/blocks/ChildBlock.svelte";
    import LinksBlock from "$lib/components/blocks/LinksBlock.svelte";
    import NotesBlock from "$lib/components/blocks/NotesBlock.svelte";
    import ExamplesBlock from "$lib/components/blocks/ExamplesBlock.svelte";

    let meta: AnyTreeOnlyMeta
    let children: Record<string, Node[]>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unsubscribe = activeNode.subscribe((_) => {
        const currentNode = activeNode.getActive($activeNode)
        meta = currentNode.meta
        children = currentNode.children
    })
    onDestroy(unsubscribe)
</script>

<div class="flex flex-row justify-evenly w-full p-8 gap-8">
    <div class="flex flex-col gap-6 2xl:max-w-[55%] min-w-[45%]">
        <DescriptionBlock structureName={meta.searchCategory} name={meta.name} short={meta.shortDescription}
                          long={meta.longDescription} isGenerator={meta.isGenerator} isAsync={meta.isAsync}
                          isAbstract={meta.isAbstract} isLambda={meta.isLambda} isContextManager={meta.isContextManager}
        />
        {#if meta.deprecations}
            {#each meta.deprecations as deprecation}
                <DeprecationBlock deprecation={deprecation} />
            {/each}
        {/if}
        {#if meta.notes}
            <NotesBlock notes={meta.notes} />
        {/if}
        {#if meta.examples}
            <ExamplesBlock examples={meta.examples} />
        {/if}
        {#if meta.parameters}
            <ParametersBlock parameters={meta.parameters} />
        {/if}
        {#if meta.returns}
            <ReturnsBlock returns={meta.returns} />
        {/if}
        {#if meta.raises}
            <RaisesBlock exceptions={meta.raises} />
        {/if}
        {#if meta.globalVariables}
            <VariablesBlock variables={meta.globalVariables} blockTitle="Global Variables" />
        {/if}
        {#if meta.classVariables}
            <VariablesBlock variables={meta.classVariables} blockTitle="Class Variables" />
        {/if}
        {#each Object.entries(children) as [childType, childList]}
            <ChildBlock childType={childType} childList={childList} />
        {/each}
    </div>
    <div class="hidden 2xl:flex flex-col gap-6 w-full">
        {#if meta.links}
            <LinksBlock links={meta.links} />
        {/if}
        {#if meta.source}
            <SourceBlock source={meta.source} signature={meta.signature} />
        {/if}
    </div>
</div>
