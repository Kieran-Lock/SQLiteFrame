<script lang="ts">
    import {drawerStore, TreeViewItem} from '@skeletonlabs/skeleton';
    import ProjectTree from './ProjectTree.svelte'
    import type {TreeOnlyNode, Node} from "$lib/types/types";
    import {selectNode, selectNodeBuilder} from "$lib/utils/interactivity";

    export let nodes: Node[]

    const leafNodeSelectedBuilder = (node: TreeOnlyNode) => (): void => {
        selectNode(node)
        drawerStore.close()
    }
</script>

{#each nodes as node}
    <TreeViewItem on:click={selectNodeBuilder(node)}>
        <h3>{node.meta.name}</h3>
        <svelte:fragment slot="children">
            {#each Object.values(node.children).flat() as child}
                {#if Object.values(child.children).flat().length}
                    <ProjectTree nodes={[child]} />
                {:else}
                    <TreeViewItem on:click={leafNodeSelectedBuilder(child)}>
                        <h3>{child.meta.name}</h3>
                    </TreeViewItem>
                {/if}
            {/each}
        </svelte:fragment>
    </TreeViewItem>
{/each}
