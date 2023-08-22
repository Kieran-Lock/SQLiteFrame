<script lang="ts">
    import Search from "$lib/components/navigation/Search.svelte";
    import {TreeView} from "@skeletonlabs/skeleton";
    import ProjectTree from "$lib/components/navigation/ProjectTree.svelte";
    import {project} from "$lib/content/project";
    import {selectNodeBuilder} from "$lib/utils/interactivity";
    import {projectName} from "$lib/content/configuration";
</script>

<div class="flex flex-col card p-4 h-full gap-8 overflow-y-scroll hide-scrollbar md:min-w-[320px] xl:min-w-[420px]">
    <header class="flex flex-col card justify-center items-center p-4 gap-6 variant-ringed-surface pb-6">
        <button type="button" on:click={selectNodeBuilder(project)}>
            <span class="text-2xl font-bold">{projectName}</span>
        </button>
        <Search />
    </header>
    <section class="flex flex-col card justify-center items-center p-4 gap-6 variant-ringed-surface">
        <TreeView>
            <ProjectTree nodes={Object.values(project.children).flat()} />
        </TreeView>
    </section>
</div>
