import "./App.css";
import { AllResources } from "./AllResources";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { UserSignIn } from "./UserSignIn";
import { NavBar } from "./NavBar";
import AddNewResource from "./AddNewResource";

function App() {
    const [signedInUser, setSignedInUser] = useState<string | undefined>();
    const [navBarChoice, setNavBarChoice] = useState<string>("AllResources");

    return (
        <div className="App">
            <Header />
            {signedInUser === undefined ? (
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
                <AddNewResource signedInUser={signedInUser} />
            ) : (
                <AllResources />
            )}
            <Footer />
        </div>
    );
}

export default App;
