import { useEffect, useState } from "react";
import { SingleSummaryResource } from "./SingleSummaryResource";
import { filterResources } from "../utils/filterResources";
import axios from "axios";
import { ResourceType } from "../types/types";
import { baseUrl } from "../utils/baseUrl";
import { UserSignIn } from "./UserSignIn";

export function AllResources(): JSX.Element {
    const [searchInput, setSearchInput] = useState("");
    const [allResources, setAllResources] = useState<ResourceType[]>([]);

    async function fetchAndStoreResourceList() {
        const response = await axios.get(baseUrl + "/resources");
        const allFetchedResources: ResourceType[] = response.data;
        setAllResources(allFetchedResources);
    }

    useEffect(() => {
        fetchAndStoreResourceList();
    }, []);

    return (
        <div>
            <UserSignIn />
            <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for Resources"
            />
            {filterResources(searchInput, allResources).map((resource) => (
                <SingleSummaryResource key={resource.id} resource={resource} />
            ))}
        </div>
    );
}
