<script lang="ts">
    import type {DeprecationsMeta} from "$lib/types/types";

    export let deprecation: DeprecationsMeta
</script>

<div class="flex flex-col card p-4 gap-4 variant-glass-warning w-full">
    <header>
        <h2>Deprecated since {deprecation.version}</h2>
    </header>
    <p>{deprecation.description}</p>
</div>
