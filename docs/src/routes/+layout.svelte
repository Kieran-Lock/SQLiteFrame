<script lang='ts'>
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
    import {AppShell, Drawer} from "@skeletonlabs/skeleton";
    import Sidebar from "$lib/components/navigation/Sidebar.svelte";
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github-dark.css';
    import { storeHighlightJs } from '@skeletonlabs/skeleton';
    import SmallHeader from "$lib/components/navigation/SmallHeader.svelte";
    storeHighlightJs.set(hljs);
</script>

<Drawer>
    <Sidebar />
</Drawer>

<AppShell class="w-full">
    <svelte:fragment slot="header">
        <div class="md:hidden">
            <SmallHeader />
        </div>
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        <div class="hidden md:flex h-full">
            <Sidebar />
        </div>
    </svelte:fragment>
    <slot />
</AppShell>
