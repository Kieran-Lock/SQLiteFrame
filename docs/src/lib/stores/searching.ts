import {writable, derived, readable} from 'svelte/store';
import {iterator, traverseProject} from "$lib/utils/parsing";
import {project} from "$lib/content/project";
import type {Node, TreeOnlyNode} from "$lib/types/types";

const nodeIterator = iterator<Node>()

const createSearchTermStore = () => {
    const store = writable("")

    return {
        ...store,
        clear: () => {
            store.set("")
        }
    }
}
export const searchTerm = createSearchTermStore()
export const searchNodes = readable(
    [...nodeIterator.filter(
        item => "searchTerms" in item.meta,
        traverseProject(project)
    ) as Iterable<TreeOnlyNode>]
)
export const filteredNodes = derived(
    [searchTerm, searchNodes],
    ([$term, $searchNodes]) => $searchNodes.filter(node => node.meta.searchTerms.toLowerCase().includes($term.toLowerCase()))
)
