<script lang="ts">
    import {searchTerm} from "$lib/stores/searching";
    import {drawerStore} from "@skeletonlabs/skeleton";

    const closeDrawer = (): void => {
        drawerStore.close()
    }
</script>

<div class="px-8 w-full">
    <input class="input variant-form-material w-full p-1.5" type="search" placeholder="Search Documentation..." bind:value={$searchTerm} on:change={closeDrawer} />
</div>
