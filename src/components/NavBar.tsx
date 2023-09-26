import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

interface SignedInUserProps {
    signedInUser: string;
    setSignedInUser: React.Dispatch<React.SetStateAction<string>>;
    navBarChoice: string;
    setNavBarChoice: React.Dispatch<React.SetStateAction<string>>;
}

export function NavBar({
    signedInUser,
    setSignedInUser,
    setNavBarChoice,
}: SignedInUserProps): JSX.Element {
    const [userName, setUserName] = useState<string>("");
    const [activeNav, setActiveNav] = useState<string>("");

    async function fetchAndStoreUser() {
        const response = await axios.get(baseUrl + `/users/${signedInUser}`);
        const fetchedUser: string = response.data.name;
        setUserName(fetchedUser);
    }

    function handleLogout() {
        setSignedInUser("0");
    }

    function handleNavBarChoice(
        buttonValue: React.MouseEvent<HTMLButtonElement>
    ) {
        console.log(buttonValue);
        setNavBarChoice(buttonValue.currentTarget.value);
        setActiveNav(buttonValue.currentTarget.value);
    }

    useEffect(() => {
        fetchAndStoreUser();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signedInUser]);

    return (
        <div className="nav-container">
            <p id="hi-user-name">Hi {userName} </p>
            <button
                className={`nav-button ${
                    activeNav === "AllResources" ? "selected-nav" : ""
                }`}
                onClick={(e) => handleNavBarChoice(e)}
                value="AllResources"
            >
                View all Resources
            </button>
            <button
                className={`nav-button ${
                    activeNav === "AddNewResource" ? "selected-nav" : ""
                }`}
                onClick={(e) => handleNavBarChoice(e)}
                value="AddNewResource"
            >
                Add new resource
            </button>
            <button
                className={`nav-button ${
                    activeNav === "StudyList" ? "selected-nav" : ""
                }`}
                onClick={(e) => handleNavBarChoice(e)}
                value="StudyList"
            >
                View Study List
            </button>
            <button
                onClick={handleLogout}
                value="Log-out"
                className={`nav-button ${
                    activeNav === "Log-out" ? "selected-nav" : ""
                }`}
            >
                Logout
            </button>
        </div>
    );
}
