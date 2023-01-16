import React from 'react';
import {BugAntIcon} from "@heroicons/react/24/outline/index"

function NotFound() {
    return (
        <div className="flex min-h-full pt-44 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-white py-4 px-4 border sm:rounded-lg sm:px-10 py-24 text-center">
                    <div className="flex items-center justify-center mb-4">
                        < BugAntIcon className="w-16 h-16 text-green-600" />
                    </div>
                    <p className="mb-3">Page not found</p>
                    <div className="flex items-center justify-center text-blue-500">
                        <a href="/dashboard" className="">
                            Go to Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
