import { useState } from "react";
import { SingleSummaryResource } from "./SingleSummaryResource";
import { filterResources } from "../utils/filterResources";

export interface ResourceType {
    resource_id: number;
    title: string;
    author: string;
    url: string;
    description: string;
}

const testing_resource_list = [
    {
        resource_id: 1,
        title: "testing1",
        author: "author 1",
        url: "testing1",
        description: "testing1",
    },
    {
        resource_id: 2,
        title: "search test",
        author: "search test",
        url: "my url",
        description: "description",
    },
];

export function AllResources(): JSX.Element {
    const [searchInput, setSearchInput] = useState("");
    const [resourceList, setResourceList] = useState<ResourceType[]>(
        testing_resource_list
    );

    /*async function fetchAndStoreResourceList() {
        
    }*/

    function handleSearch() {
        const filteredResourceList = filterResources(searchInput, resourceList);
        setResourceList(filteredResourceList);
    }

    return (
        <div>
            <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for Resources"
            />{" "}
            <button onClick={handleSearch}> Search </button>
            {resourceList !== undefined &&
                resourceList.map((resource) => (
                    <SingleSummaryResource
                        key={resource.resource_id}
                        resource={resource}
                    />
                ))}
        </div>
    );
}
