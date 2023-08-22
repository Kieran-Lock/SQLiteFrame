<script lang="ts">
    import {selectNodeBuilder} from "$lib/utils/interactivity";
    import type {TreeOnlyNode} from "$lib/types/types";
    import DescriptionBlock from "$lib/components/blocks/DescriptionBlock.svelte";

    export let node: TreeOnlyNode
</script>

<div class="btn px-0 py-1" on:click={selectNodeBuilder(node)} on:keypress={() => {return false}}>
    <DescriptionBlock structureName={node.meta.searchCategory} name={node.meta.name} short={node.meta.shortDescription}
                      long={node.meta.longDescription} isGenerator={node.meta.isGenerator} isAsync={node.meta.isAsync}
                      isAbstract={node.meta.isAbstract} isLambda={node.meta.isLambda}
                      isContextManager={node.meta.isContextManager} truncate
    />
</div>
