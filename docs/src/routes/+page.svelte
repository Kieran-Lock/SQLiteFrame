<script lang="ts">
    import {searchTerm} from "$lib/stores/searching";
    import SearchList from "$lib/components/views/SearchList.svelte";
    import CurrentNode from "$lib/components/views/CurrentNode.svelte";
</script>

{#if $searchTerm}
    <SearchList />
{:else}
    <CurrentNode />
{/if}
