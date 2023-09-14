import { useEffect, useState } from "react";
import { UserType } from "../types/types";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

export function UserSignIn(): JSX.Element {
    const [allUsers, setAllUsers] = useState<UserType[]>([]);

    async function fetchAndStoreUsersList() {
        const response = await axios.get(baseUrl + "/users");
        const allFetchedUsers: UserType[] = response.data;
        setAllUsers(allFetchedUsers);
    }

    useEffect(() => {
        fetchAndStoreUsersList();
    }, []);

    return (
        <>
            <label htmlFor="user-sign-in"> Sign in:</label>
            <select name="users" id="user-sign-in">
                <option value="">--not signed in--</option>
                {allUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </>
    );
}
