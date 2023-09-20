import { useCallback, useEffect, useState } from "react";
import { ResourceType } from "../types/types";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

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
        const response = await axios.get(
            `${baseUrl}/users/${parseInt(signedInUser)}/votes/${resource.id}`
        );
        const vote = response.data[0].voted;
        console.log(vote);
        setUsersVote(vote);
    };

    useEffect(() => {
        fetchAndStoreResourceVotes();
        fetchAndStoreUsersVote();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAndStoreResourceVotes, signedInUser]);

    const handleClickLike = async () => {
        console.log("entering the handle click like function");
        switch (usersVote) {
            case "Neither":
                setUsersVote("Liked");
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: "Liked",
                    }
                );
                setResourceVotes((prev) => ({
                    ...prev,
                    likes: prev.likes + 1,
                }));
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "like",
                    voteAmount: 1,
                });
                break;
            case "Disliked":
                setUsersVote("Liked");
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: "Liked",
                    }
                );
                setResourceVotes((prev) => ({
                    likes: prev.likes + 1,
                    dislikes: prev.dislikes - 1,
                }));
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
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: "Neither",
                    }
                );
                setResourceVotes((prev) => ({
                    ...prev,
                    likes: prev.likes - 1,
                }));
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "like",
                    voteAmount: -1,
                });
                setUsersVote("Neither");

                break;
            default:
                break;
        }
    };

    const handleClickDisike = async () => {
        switch (usersVote) {
            case "Neither":
                setUsersVote("Disliked");
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: "Disliked",
                    }
                );
                setResourceVotes((prev) => ({
                    ...prev,
                    dislikes: prev.dislikes + 1,
                }));
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "dislike",
                    voteAmount: 1,
                });
                break;
            case "Disliked":
                setUsersVote("Neither");
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: "Neither",
                    }
                );
                setResourceVotes((prev) => ({
                    ...prev,
                    dislikes: prev.dislikes - 1,
                }));
                await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
                    voteType: "dislike",
                    voteAmount: -1,
                });
                break;
            case "Liked":
                setUsersVote("Disliked");
                await axios.patch(
                    `${baseUrl}/users/${parseInt(signedInUser)}/votes/${
                        resource.id
                    }`,
                    {
                        voted: "Disliked",
                    }
                );
                setResourceVotes((prev) => ({
                    likes: prev.likes - 1,
                    dislikes: prev.dislikes + 1,
                }));
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
    };

    return (
        <div className="single-full-resource-container">
            <h1>{resource.title}</h1>
            <span>by {resource.author}</span>
            <a href={`${resource.url}`}>URL</a>
            <p>{resource.description}</p>
            <p>{resource.tags}</p>
            <p>{resource.type}</p>
            <p>{resource.first_study_time}</p>
            <p>{resource.creation_time}</p>
            <p>Recommended by {resource.user_name}</p>
            <p>{resource.user_comment}</p>
            <p>{resource.comment_reason}</p>
            <button name="votes" value={"like"} onClick={handleClickLike}>
                {resourceVotes.likes} Likes
            </button>
            <button name="votes" value={"dislike"} onClick={handleClickDisike}>
                {resourceVotes.dislikes} Dislikes
            </button>
        </div>
    );
}
