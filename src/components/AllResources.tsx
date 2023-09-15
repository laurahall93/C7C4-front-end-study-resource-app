import { useEffect, useState } from "react";
import { SingleSummaryResource } from "./SingleSummaryResource";
import axios from "axios";
import { ResourceType, TagType } from "../types/types";
import { baseUrl } from "../utils/baseUrl";
import { UserSignIn } from "./UserSignIn";
import { filterBySearchAndTags } from "../utils/filterBySearchAndTags";

const tags = [
    { id: 1, tag_name: "HTML" },
    { id: 2, tag_name: "CSS" },
    { id: 3, tag_name: "JavaScript" },
];

export function AllResources(): JSX.Element {
    const [searchInput, setSearchInput] = useState("");
    const [allResources, setAllResources] = useState<ResourceType[]>([]);
    const [chosenTags, setChosenTags] = useState<string[]>([]);

    async function fetchAndStoreResourceList() {
        const response = await axios.get(baseUrl + "/resources");
        const allFetchedResources: ResourceType[] = response.data;
        setAllResources(allFetchedResources);
    }

    // async function fetchAndStoreTagsList() {
    //     const response = await axios.get(baseUrl + "/tags");
    //     const allFetchedTags: TagType[] = response.data;
    //     return allFetchedTags
    // }

    useEffect(() => {
        fetchAndStoreResourceList();
    }, []);

    function handleSelectTag(tagName: string) {
        if (chosenTags.includes(tagName)) {
            setChosenTags((prev) => prev.filter((tag) => tag !== tagName));
        } else {
            setChosenTags((prev) => [...prev, tagName]);
        }
    }

    return (
        <div className="main-body">
            <UserSignIn />
            <input
                className="recources-input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for Resources"
            />
            <br />
            {tags.map((tag) => (
                <button
                    className={
                        chosenTags.includes(tag.tag_name)
                            ? "selected-tag tag-button"
                            : "non-selected-tag tag-button"
                    }
                    onClick={() => handleSelectTag(tag.tag_name)}
                    key={tag.id}
                >
                    {tag.tag_name}
                </button>
            ))}
            {filterBySearchAndTags(searchInput, chosenTags, allResources).map(
                (resource) => (
                    <SingleSummaryResource
                        key={resource.id}
                        resource={resource}
                    />
                )
            )}
        </div>
    );
}
