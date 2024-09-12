import React from "react";

function HomePage() {
    let pageTitle = "Welcome to FinMap",
    pageDescription = `Simply your financial life with FinMap`;
    return (
        <div>
            pageTitle={pageTitle}
            pageDescription={pageDescription}
        </div>
    );
}

export default HomePage;