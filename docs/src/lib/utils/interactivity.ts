import type {TreeOnlyNode} from "$lib/types/types";
import {activeNode} from "$lib/stores/node";
import {searchTerm} from "$lib/stores/searching";

export const selectNodeBuilder = (node: TreeOnlyNode) => () => selectNode(node)

export const selectNode = (node: TreeOnlyNode) => {
    activeNode.setActive(node)
    searchTerm.clear()
}
