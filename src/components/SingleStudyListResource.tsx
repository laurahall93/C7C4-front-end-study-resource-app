//import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { StudyListType } from "../types/types";
import { baseUrl } from "../utils/baseUrl";
import axios from "axios";

interface SingleStudyListResourceProps {
    studyListResource: StudyListType;
    setUpdateStudyList: React.Dispatch<
        React.SetStateAction<StudyListType | undefined>
    >;
}

export function SingleStudyListResource({
    studyListResource,
    setUpdateStudyList,
}: SingleStudyListResourceProps): JSX.Element {
    //const [showFullResource, setShowFullResource] = useState<boolean>(false);

    /*const toggleShowFullResource = () => {
        setShowFullResource((prev) => !prev);
    };*/
    async function handleDelete(id: number) {
        const response = await axios.delete(
            baseUrl + `/users/study-list/${id}`
        );
        console.log(response);
        setUpdateStudyList(response.data);
    }

    async function handleComplete(id: number, isComplete: boolean) {
        const value = isComplete ? false : true;
        console.log(`dbVal: ${isComplete} value sent: ${value}`);
        const response = await axios.patch(
            baseUrl + `/users/study-list/${id}`,
            { is_completed: value }
        );
        console.log(response);
        setUpdateStudyList(response.data);
    }
    console.log(studyListResource);

    return (
        <div className="single-summary-resource-container">
            {
                /*showFullResource === true ? (
                <SingleFullResource resource={resource}></SingleFullResource>
                
            ) : */

                <div
                    className={`single-resource-wrapper ${
                        studyListResource.is_completed ? "completed" : ""
                    }`}
                >
                    <div className="resource">
                        <h1>{studyListResource.title}</h1>
                        <span>
                            <strong> By: </strong>
                            {studyListResource.author}
                        </span>
                        <a href={studyListResource.url}> URL</a>
                        <p>{studyListResource.description}</p>
                        <p>
                            <strong>Tags: </strong>
                            {studyListResource.tags}
                        </p>
                    </div>
                    {studyListResource.is_completed === true ? (
                        <button
                            className="study-button"
                            onClick={() =>
                                handleComplete(
                                    studyListResource.studyitem_id,
                                    studyListResource.is_completed
                                )
                            }
                        >
                            Mark As Incomplete{" "}
                        </button>
                    ) : (
                        <button
                            className="study-button"
                            onClick={() =>
                                handleComplete(
                                    studyListResource.studyitem_id,
                                    studyListResource.is_completed
                                )
                            }
                        >
                            {" "}
                            Mark As Complete{" "}
                        </button>
                    )}
                    <DeleteIcon
                        className="deleteBin"
                        boxSize={100}
                        color="#556b2f"
                        onClick={() =>
                            handleDelete(studyListResource.studyitem_id)
                        }
                    />
                </div>
            }
        </div>
    );
}
