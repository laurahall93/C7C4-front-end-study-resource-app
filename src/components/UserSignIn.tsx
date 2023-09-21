import { useEffect, useState } from "react";
import { UserType } from "../types/types";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

interface SignedInUserProps {
    signedInUser: string;
    setSignedInUser: React.Dispatch<React.SetStateAction<string>>;
}

export function UserSignIn(props: SignedInUserProps): JSX.Element {
    const [allUsers, setAllUsers] = useState<UserType[]>([]);

    async function fetchAndStoreUsersList() {
        const response = await axios.get(baseUrl + "/users");
        const allFetchedUsers: UserType[] = response.data;
        setAllUsers(allFetchedUsers);
    }

    useEffect(() => {
        fetchAndStoreUsersList();
    }, []);

    const handleUserSignIn = (userId: string) => {
        props.setSignedInUser(userId);
    };

    return (
        <div className="sign-in">
            <label htmlFor="user-sign-in"> Sign in:</label>
            <select
                name="users"
                id="user-sign-in"
                onChange={(e) => handleUserSignIn(e.target.value)}
            >
                <option value="">--not signed in--</option>
                {allUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
