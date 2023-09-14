import { ResourceType } from "../types/types";

interface SingleSummaryResourceProps {
    resource: ResourceType;
}

export function SingleSummaryResource({
    resource,
}: SingleSummaryResourceProps): JSX.Element {
    return (
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
    );
}
