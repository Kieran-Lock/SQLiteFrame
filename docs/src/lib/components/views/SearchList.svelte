<script lang="ts">
    import {filteredNodes} from "$lib/stores/searching"
    import SearchResult from "$lib/components/navigation/SearchResult.svelte";
    import {ListBox, ListBoxItem} from "@skeletonlabs/skeleton";

    let searchFilter: string[] = []
</script>

<div class="flex flex-col-reverse md:flex-row md:w-[80%] p-8 justify-around gap-4">
    <div class="flex flex-col gap-2 md:w-[50%] py-8">
        {#each $filteredNodes.filter(node => searchFilter.length ? searchFilter.includes(node.meta.searchCategory) : true) as node}
            <SearchResult node={node} />
        {/each}
    </div>
    <div class="flex flex-col gap-3 h-fit min-w-[20%] md:mt-11 text-center mx-auto md:mx-0">
        <ListBox multiple class="p-4 variant-glass-surface" spacing="space-y-1.5">
            <h3 class="pb-1.5">Search Filters</h3>
            <ListBoxItem bind:group={searchFilter} name="searchFilter" value="package">Packages</ListBoxItem>
            <ListBoxItem bind:group={searchFilter} name="searchFilter" value="module">Modules</ListBoxItem>
            <ListBoxItem bind:group={searchFilter} name="searchFilter" value="class">Classes</ListBoxItem>
            <ListBoxItem bind:group={searchFilter} name="searchFilter" value="subroutine">Subroutines</ListBoxItem>
        </ListBox>
    </div>
</div>
