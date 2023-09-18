import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

interface SignedInUserProps {
    signedInUser: string | undefined;
    setSignedInUser: React.Dispatch<React.SetStateAction<string | undefined>>;
    navBarChoice: string;
    setNavBarChoice: React.Dispatch<React.SetStateAction<string>>;
}

export function NavBar({
    signedInUser,
    setSignedInUser,
    setNavBarChoice,
}: SignedInUserProps): JSX.Element {
    const [userName, setUserName] = useState<string>("");

    async function fetchAndStoreUser() {
        const response = await axios.get(baseUrl + `/users/${signedInUser}`);
        const fetchedUser: string = response.data.name;
        setUserName(fetchedUser);
    }

    function handleLogout() {
        setSignedInUser(undefined);
    }

    function handleNavBarChoice(buttonValue: any) {
        setNavBarChoice(buttonValue);
    }

    useEffect(() => {
        fetchAndStoreUser();
    }, [signedInUser]);

    return (
        <div>
            <p>Hi {userName}</p>
            <button
                onClick={(a) => handleNavBarChoice(a)}
                value="AddNewResource"
            >
                Add new resource
            </button>
            <button>View Study List</button>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
}
