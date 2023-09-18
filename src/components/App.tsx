import "./App.css";
import { AllResources } from "./AllResources";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { UserSignIn } from "./UserSignIn";

function App() {
    const [signedInUser, setSignedInUser] = useState<string>("");

    return (
        <div className="App">
            <Header />
            <UserSignIn
                signedInUser={signedInUser}
                setSignedInUser={setSignedInUser}
            />
            <AllResources />
            <Footer />
        </div>
    );
}

export default App;
