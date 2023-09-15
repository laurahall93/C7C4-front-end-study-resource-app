import { ResourceType } from "../types/types";

export function isStringInArray(searchStr: string, inputArr: string[]) {
    for (const element of inputArr) {
        const isMatching = searchStr.search(element);
        if (isMatching > -1) {
            return true;
        }
    }
    return false;
}

export function filterByTags(
    chosenTags: string[],
    resourceList: ResourceType[]
): ResourceType[] {
    return resourceList.filter((resource) =>
        isStringInArray(resource.tags, chosenTags)
    );
}
