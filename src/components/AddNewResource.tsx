import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../utils/baseUrl";

interface SignedInUserIdProps {
    signedInUser: string | undefined;
}

interface EventType {
    target: { name: string; value: string; type: string; checked: boolean };
}

export default function AddNewResource(
    signedInUser: SignedInUserIdProps
): JSX.Element {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        url: "",
        description: "",
        tags: "",
        type: "",
        first_study_time: "",
        created_by: signedInUser,
        user_comment: "",
        comment_reason: "",
    });

    function handleChange(event: EventType) {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    async function submitNewResource() {
        const addNewResource = await axios.post(
            baseUrl + "/resources/",
            formData
        );
        console.log(addNewResource);
    }

    return (
        <>
            <form onSubmit={submitNewResource}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    ></input>
                </label>
                <label>
                    Author:
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    ></input>
                </label>
                <label>
                    URL:
                    <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                    ></input>
                </label>
                <label>
                    Description:
                    <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></input>
                </label>
                <fieldset>
                    <input
                        type="checkbox"
                        id="CSS"
                        name="CSS"
                        value="CSS"
                        checked={formData.tags === "CSS"}
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="CSS">CSS</label>
                </fieldset>
                <label>
                    Type:
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    ></input>
                </label>
                <label>
                    First study time:
                    <input
                        type="text"
                        name="first_study_time"
                        value={formData.first_study_time}
                        onChange={handleChange}
                    ></input>
                </label>
                <fieldset>
                    <legend> Your comment:</legend>
                    <input
                        type="radio"
                        id="option1"
                        name="I recommend this resource after having used it"
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
                        name="I do not recommend this resource, having used it"
                        value="I do not recommend this resource, having used it"
                        checked={
                            formData.user_comment ===
                            "I do not recommend this resource, having used it"
                        }
                        onChange={handleChange}
                    />
                    <label htmlFor="I do not recommend this resource, having used it">
                        I do not recommend this resource, having used it
                    </label>
                    <br />
                    <input
                        type="radio"
                        id="option3"
                        name="I have not used this resource but it looks promising"
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
                    Your reason for the sharing:
                    <input
                        name="comment_reason"
                        value={formData.comment_reason}
                        onChange={handleChange}
                    ></input>
                </label>
                <button>Submit</button>
            </form>
        </>
    );
}
