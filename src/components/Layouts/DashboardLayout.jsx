import React from 'react';
import NavigationBar from "../NavigationBar.jsx";

const DashboardLayout = (children) => {
    return (
        <div>
            <NavigationBar />
            <div className="container">
                { children }
            </div>
        </div>
    );
};

export default DashboardLayout;
