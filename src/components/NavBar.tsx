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
    navBarChoice,
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

    function handleNavBarChoice(
        buttonValue: React.MouseEvent<HTMLButtonElement>
    ) {
        console.log(buttonValue);
        setNavBarChoice(buttonValue.currentTarget.value);
    }

    useEffect(() => {
        fetchAndStoreUser();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signedInUser]);

    return (
        <div className="nav-container">
            <p>Hi {userName}</p>
            <button
                onClick={(e) => handleNavBarChoice(e)}
                value="AddNewResource"
                className={
                    navBarChoice === "AddNewResource"
                        ? "selected-nav nav-button"
                        : "nav-button"
                }
            >
                Add new resource
            </button>
            <button
                onClick={(e) => handleNavBarChoice(e)}
                value="StudyList"
                className={
                    navBarChoice === "StudyList"
                        ? "selected-nav nav-button"
                        : "nav-button"
                }
            >
                View Study List
            </button>
            <button onClick={handleLogout} className="nav-button">
                logout
            </button>
        </div>
    );
}
