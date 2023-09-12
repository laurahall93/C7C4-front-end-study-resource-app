import { ResourceType } from "../components/AllResources";

export function filterResources(
    searchInput: string,
    resourceList: ResourceType[]
): ResourceType[] {
    return resourceList.filter((resource) =>
        Object.values(resource).some((value) =>
            value.toString().toLowerCase().includes(searchInput.toLowerCase())
        )
    );
}
