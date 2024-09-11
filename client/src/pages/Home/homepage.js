import React from "react";
import SignUp from "../Register/signUp";

function HomePage() {
    let pageTitle = "Welcome to FinMap",
    pageDescription = `Simply your financial life with FinMap`;
    return (
        <div>
            <Header />
            <TitleBanner 
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            />
            <SignUp />
        </div>
    );
}

export default HomePage;