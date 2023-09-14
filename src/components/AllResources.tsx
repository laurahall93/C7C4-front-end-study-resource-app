import { useEffect, useState } from "react";
import { SingleSummaryResource } from "./SingleSummaryResource";
import { filterResources } from "../utils/filterResources";
import axios from "axios";
import { ResourceType } from "../types/types";

const baseUrl =
    process.env.NODE_ENV === "production"
        ? "https://study-resource-cataloge-app-c7c4.onrender.com"
        : "http://localhost:4000";

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
