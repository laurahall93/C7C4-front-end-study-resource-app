import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { TagType } from "../types/types";
import addTagsToResources from "../utils/filterTagObjToArray";

interface AddNewResourceProps {
    signedInUser: string;
    setNavBarChoice: (choice: string) => void;
}

interface EventType {
    target: { name: string; value: string; type: string; checked: boolean };
}

export interface SelectedTagsType {
    [tag: string]: boolean;
}

export default function AddNewResource({
    signedInUser,
    setNavBarChoice,
}: AddNewResourceProps): JSX.Element {
    const [userSelectedTags, setUserSelectedTags] = useState<SelectedTagsType>(
        {}
    );
    const [allTags, setAllTags] = useState<TagType[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        url: "",
        description: "",
        tags: [""],
        type: "",
        first_study_time: "",
        created_by: parseInt(signedInUser),
        user_comment: "",
        comment_reason: "",
    });

    function handleChange(event: EventType) {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }

    function handleTagChange(event: EventType) {
        const { name, checked } = event.target;
        setUserSelectedTags((prevUserSelectedTags) => {
            return {
                ...prevUserSelectedTags,
                [name]: checked,
            };
        });
    }

    async function fetchAllTags() {
        const getAllTags = await axios.get(baseUrl + "/tags");
        const allFetchedTags = getAllTags.data;
        setAllTags(allFetchedTags);
    }

    async function submitNewResource(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            formData.tags = addTagsToResources(userSelectedTags);
            console.log(formData);
            await axios.post(baseUrl + "/resources/", formData);
            setNavBarChoice("AllResources");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAllTags();
    }, []);

    const handleCancel = () => {
        setNavBarChoice("AllResources");
    };

    return (
        <>
            <form
                onSubmit={(e) => submitNewResource(e)}
                className="add-resource-form"
            >
                <label>
                    Title:
                    <input
                        className="input-form"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    ></input>
                </label>
                <label>
                    Author:
                    <input
                        className="input-form"
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    ></input>
                </label>
                <label>
                    URL:
                    <input
                        className="input-form"
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                    ></input>
                </label>
                <label>
                    Description:
                    <input
                        className="input-form"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></input>
                </label>
                <fieldset className="checkbox-container">
                    {allTags.map((tag) => {
                        return (
                            <div key={tag.id}>
                                <input
                                    className="tag-checkbox"
                                    type="checkbox"
                                    id={String(tag.id)}
                                    name={tag.tag_name}
                                    value={tag.tag_name}
                                    checked={userSelectedTags.tag_name}
                                    onChange={handleTagChange}
                                ></input>
                                <label htmlFor={tag.tag_name}>
                                    {tag.tag_name}
                                </label>
                            </div>
                        );
                    })}
                </fieldset>
                <label>
                    Type:
                    <input
                        className="input-form"
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    ></input>
                </label>
                <label>
                    First study time:
                    <input
                        className="input-form"
                        type="text"
                        name="first_study_time"
                        value={formData.first_study_time}
                        onChange={handleChange}
                    ></input>
                </label>
                <fieldset className="radio-buttons">
                    <legend> Your comment:</legend>
                    <input
                        type="radio"
                        id="option1"
                        name="user_comment"
                        value="I recommend this resource after having used it"
                        checked={
                            formData.user_comment ===
                            "I recommend this resource after having used it"
                        }
                        onChange={handleChange}
                    />
                    <label htmlFor="I recommend this resource after having used it">
                        I recommend this resource after having used it
                    </label>
                    <br />

                    <input
                        type="radio"
                        id="option2"
                        name="user_comment"
                        value="I do not recommend this resource, having used it"
                        checked={
                            formData.user_comment ===
                            "I do not recommend this resource, having used it"
                        }
                        onChange={handleChange}
                    />
                    <label htmlFor="I do not recommend this resource, having used it">
                        I do not recommend this resource having used it
                    </label>
                    <br />
                    <input
                        type="radio"
                        id="option3"
                        name="user_comment"
                        value="I have not used this resource but it looks promising"
                        checked={
                            formData.user_comment ===
                            "I have not used this resource but it looks promising"
                        }
                        onChange={handleChange}
                    />
                    <label htmlFor="I have not used this resource but it looks promising">
                        I have not used this resource but it looks promising
                    </label>
                </fieldset>
                <label>
                    Your reason for sharing:
                    <input
                        className="input-form"
                        name="comment_reason"
                        value={formData.comment_reason}
                        onChange={handleChange}
                    ></input>
                </label>
                <div className="form-btn">
                    <button name="submit-btn" className="submit-button">
                        Submit
                    </button>
                    <button onClick={handleCancel} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
}
