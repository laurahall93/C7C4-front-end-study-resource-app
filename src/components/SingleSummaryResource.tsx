/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { ResourceType } from "../types/types";
import { SingleFullResource } from "./SingleFullResource";

interface SingleSummaryResourceProps {
    resource: ResourceType;
}

export function SingleSummaryResource({
    resource,
}: SingleSummaryResourceProps): JSX.Element {
    const [showFullResource, setShowFullResource] = useState<boolean>(false);

    const toggleShowFullResource = () => {
        setShowFullResource((prev) => !prev);
    };

    return (
        <div>
            {showFullResource === true ? (
                <SingleFullResource resource={resource}></SingleFullResource>
            ) : (
                <div className="single-summary-resource-container">
                    <h1>{resource.title}</h1>
                    <span>
                        <strong> By: </strong>
                        {resource.author}
                    </span>
                    <a href={resource.url}> URL</a>
                    <p>{resource.description}</p>
                    <p>
                        <strong>Tags: </strong>
                        {resource.tags}
                    </p>
                </div>
            )}
            <button onClick={toggleShowFullResource}>
                {showFullResource === true ? "Show less" : "Show more"}
            </button>
        </div>
    );
}
