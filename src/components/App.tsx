import "./App.css";
import { AllResources } from "./AllResources";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { UserSignIn } from "./UserSignIn";
import { NavBar } from "./NavBar";
import AddNewResource from "./AddNewResource";
import { StudyList } from "./StudyList";

function App() {
    const [signedInUser, setSignedInUser] = useState<string>("0");
    const [navBarChoice, setNavBarChoice] = useState<string>("AllResources");

    return (
        <div className="App">
            <Header />
            {signedInUser === "0" ? (
                <UserSignIn
                    signedInUser={signedInUser}
                    setSignedInUser={setSignedInUser}
                />
            ) : (
                <NavBar
                    signedInUser={signedInUser}
                    setSignedInUser={setSignedInUser}
                    navBarChoice={navBarChoice}
                    setNavBarChoice={setNavBarChoice}
                />
            )}
            {navBarChoice === "AddNewResource" && signedInUser ? (

                <AddNewResource setNavBarChoice={setNavBarChoice} signedInUser={signedInUser} />
            ) : navBarChoice === "StudyList" && signedInUser ? (
                <StudyList signedInUser={signedInUser} />
            ) : (
                <AllResources signedInUser={signedInUser} />
            )}
            <Footer />
        </div>
    );
}

export default App;
