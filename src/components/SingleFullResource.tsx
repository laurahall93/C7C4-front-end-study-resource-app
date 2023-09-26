import { useCallback, useEffect, useState } from "react";
import { ResourceType, StudyListType } from "../types/types";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { isResourceInStudyList } from "../utils/isResourceInStudyList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { filterDateTime } from "../utils/filterDateTime";

interface SingleFullResourceProps {
    resource: ResourceType;
    signedInUser: string;
}

interface IVotes {
    likes: number;
    dislikes: number;
}

type UsersVoteType = "Liked" | "Disliked" | "Neither";

export function SingleFullResource({
    resource,
    signedInUser,
}: SingleFullResourceProps): JSX.Element {
    const [userStudyList, setUserStudyList] = useState<StudyListType[]>();
    const [addedToStudyList, SetAddedToStudyList] = useState<StudyListType>();
    const [resourceVotes, setResourceVotes] = useState<IVotes>({
        likes: 0,
        dislikes: 0,
    });

    const [usersVote, setUsersVote] = useState<UsersVoteType>("Neither");

    const fetchAndStoreResourceVotes = useCallback(async () => {
        const response = await axios.get(
            `${baseUrl}/resources/${resource.id}/votes`
        );
        const votes =
            response.data.length > 0
                ? response.data[0]
                : { likes: 0, dislikes: 0 };
        setResourceVotes(votes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAndStoreUsersVote = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                    resource.id
                }`
            );
            if (response.data.length > 0) {
                const vote = response.data[0].voted;
                setUsersVote(vote);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAndStoreResourceVotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signedInUser, handleClickLike, handleClickDisike]);

    useEffect(() => {
        fetchAndStoreUsersVote();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signedInUser]);

    async function handleClickLike() {
        console.log("In handleLike - current state of usersVote: ", usersVote);
        let usersNewVote: UsersVoteType;
        switch (usersVote) {
            case "Neither":
                console.log("have entered the neither case block in switch ");
                usersNewVote = "Liked";
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: usersNewVote,
                    }
                );

                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "like",
                    voteAmount: 1,
                });
                break;
            case "Disliked":
                console.log("have entered the dislike case block in switch ");
                usersNewVote = "Liked";
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: usersNewVote,
                    }
                );
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "like",
                    voteAmount: 1,
                });
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "dislike",
                    voteAmount: -1,
                });
                break;
            case "Liked":
                console.log("have entered the like case block in switch ");
                usersNewVote = "Neither";
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: usersNewVote,
                    }
                );
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "like",
                    voteAmount: -1,
                });
                break;
            default:
                break;
        }
    }

    async function handleClickDisike() {
        console.log(
            "In handleDislike - current state of usersVote: ",
            usersVote
        );
        let usersNewVote: UsersVoteType;
        switch (usersVote) {
            case "Neither":
                console.log("have entered the neither case block in switch ");
                usersNewVote = "Disliked";
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: usersNewVote,
                    }
                );
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "dislike",
                    voteAmount: 1,
                });
                break;
            case "Disliked":
                console.log("have entered the dislike case block in switch ");
                usersNewVote = "Neither";
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: usersNewVote,
                    }
                );
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "dislike",
                    voteAmount: -1,
                });
                break;
            case "Liked":
                usersNewVote = "Disliked";
                console.log("have entered the like case block in switch ");
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: usersNewVote,
                    }
                );
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "like",
                    voteAmount: -1,
                });
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "dislike",
                    voteAmount: 1,
                });
                break;
            default:
                break;
        }
    }

    async function fetchAndStoreUserStudyList() {
        const id = parseInt(signedInUser);
        const response = await axios.get(baseUrl + `/users/${id}/study-list`);
        const fetchedStudyList = response.data;
        setUserStudyList(fetchedStudyList);
    }

    useEffect(() => {
        fetchAndStoreUserStudyList();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addedToStudyList]);

    async function handleAddToStudyList(id: number) {
        const response = await axios.post(
            baseUrl + `/users/${signedInUser}/study-list`,
            { resourceId: id }
        );
        SetAddedToStudyList(response.data);
    }

    return (
        <div className="single-full-resource-container">
            <h1>{resource.title}</h1>
            <span>By: {resource.author}</span>
            <a href={resource.url} className="url">
                URL
            </a>
            <p>{resource.description}</p>
            <p>Tags: {resource.tags}</p>
            <p>Type: {resource.type}</p>
            <p>First Study Time: {resource.first_study_time}</p>
            <p>Created on: {filterDateTime(resource.creation_time)}</p>
            <p>Recommended by : {resource.user_name}</p>
            <p>Creator Recommendation: {resource.user_comment}</p>
            <p>Creator Comment: {resource.comment_reason}</p>
            <button
                name="votes"
                value={"like"}
                className={usersVote === "Liked" ? "voted" : "not-voted"}
                onClick={handleClickLike}
            >
                {resourceVotes.likes} <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button
                name="votes"
                value={"dislike"}
                className={usersVote === "Disliked" ? "voted" : "not-voted"}
                onClick={handleClickDisike}
            >
                {resourceVotes.dislikes} <FontAwesomeIcon icon={faThumbsDown} />
            </button>
            {signedInUser !== "0" ? (
                userStudyList &&
                isResourceInStudyList(resource.id, userStudyList) ? (
                    <p>In your Study List !</p>
                ) : (
                    <button
                        onClick={() => handleAddToStudyList(resource.id)}
                        name="study-add-button"
                        className="study-add-button"
                    >
                        {" "}
                        Add to Study List{" "}
                    </button>
                )
            ) : (
                ""
            )}
        </div>
    );
}
