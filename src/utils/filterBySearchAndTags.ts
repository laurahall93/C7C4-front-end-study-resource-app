import { ResourceType } from "../types/types";
import { filterBySearch } from "./filterBySearch";
import { filterByTags } from "./filterByTags";

export function filterBySearchAndTags(
    searchInput: string,
    chosenTags: string[],
    resourceList: ResourceType[]
): ResourceType[] {
    return filterBySearch(searchInput, filterByTags(chosenTags, resourceList));
}
