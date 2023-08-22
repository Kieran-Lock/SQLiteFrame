<script lang="ts">
    import {AppBar, drawerStore} from "@skeletonlabs/skeleton";
    import {projectName} from "$lib/content/configuration";

    const openDrawer = (): void => {
        drawerStore.open()
    }
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center">
    <svelte:fragment slot="lead">
        <button class="btn btn-sm mr-4" on:click={openDrawer}>
            <span>
                <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
                    <rect width="100" height="20" />
                    <rect y="30" width="100" height="20" />
                    <rect y="60" width="100" height="20" />
                </svg>
            </span>
        </button>
    </svelte:fragment>
    <strong class="text-3xl text-center inline-block">{projectName}</strong>
</AppBar>
