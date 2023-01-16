import React, {useEffect, useState} from 'react';
import {CheckCircleIcon, ChevronRightIcon, XCircleIcon} from "@heroicons/react/24/outline/index"
import { useParams } from 'react-router-dom';
import useAuth from "../hooks/useAuth.js";

function VerifyEmail() {
    let { token } = useParams();
    const { emailVerify }  = useAuth()
    const [ error, setError ] = useState(null)
    const verify = async () => {
        return await emailVerify(token)
    }

    useEffect(() => {
        verify().catch(error => {
            setError(error.response.data.message)
        })
    }, []);

    return (
        <div className="flex min-h-full pt-44 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-white py-4 px-4 border sm:rounded-lg sm:px-10 py-24 text-center">

                    { ! error ? (
                        <>
                            <div className="flex items-center justify-center mb-4">
                                < CheckCircleIcon className="w-16 h-16 text-green-600" />
                            </div>
                            <p className="mb-3">Your email address has been verified</p>
                        </>
                        ) : (
                        <>
                            <div className="flex items-center justify-center mb-4">
                            < XCircleIcon className="w-16 h-16 text-red-600" />
                            </div>
                            <p className="mb-3">{error}</p>
                        </>
                        )
                    }
                    <div className="flex items-center justify-center text-blue-500">
                        <a href="/dashboard" className="">
                            Go to Dashboard
                        </a>
                        <ChevronRightIcon className="w-6 h-6"/>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default VerifyEmail;
