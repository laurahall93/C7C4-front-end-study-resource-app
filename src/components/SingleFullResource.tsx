import { useCallback, useEffect, useState } from "react";
import { ResourceType } from "../types/types";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

interface SingleFullResourceProps {
    resource: ResourceType;
}

interface IVotes {
    likes: number;
    dislikes: number;
}

// type UsersVoteType = "Liked" | "Disliked" | "Neither";

export function SingleFullResource({
    resource,
}: SingleFullResourceProps): JSX.Element {
    const [resourceVotes, setResourceVotes] = useState<IVotes>({
        likes: 0,
        dislikes: 0,
    });

    // const [usersVote, setUsersVote] = useState<UsersVoteType>("Neither");

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

    // const fetchAndStoreUsersVote = useCallback(async () => {
    //     const response = await axios.get(`${baseUrl}/users`)
    // })

    useEffect(() => {
        fetchAndStoreResourceVotes();
    }, [fetchAndStoreResourceVotes]);

    const handleClickLike = async () => {
        await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
            voteType: "like",
            voteAmount: 1,
        });
        setResourceVotes((prev) => ({ ...prev, likes: prev.likes + 1 }));
    };

    const handleClickDisike = async () => {
        await axios.patch(`${baseUrl}/resources/${resource.id}/votes`, {
            voteType: "dislike",
            voteAmount: 1,
        });
        setResourceVotes((prev) => ({ ...prev, dislikes: prev.dislikes + 1 }));
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
            <p>Recommended by {resource.name}</p>
            <p>{resource.user_comment}</p>
            <p>{resource.comment_reason}</p>
            <button onClick={handleClickLike}>
                {resourceVotes.likes} Likes
            </button>
            <button onClick={handleClickDisike}>
                {resourceVotes.dislikes} Dislikes
            </button>
        </div>
    );
}
