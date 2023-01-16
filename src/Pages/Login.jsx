import React, {useContext, useState} from 'react';
import {EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid/index.js";
import useAuth from "../hooks/useAuth.js";
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import useIsMountedRef from '../hooks/useIsMountedRef';


function Login() {
    const { login, errorBag, loadingState } = useAuth()
    console.log(errorBag)
    const [showPassword, setShowPassword] = useState(false);
    const isMountedRef = useIsMountedRef();
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(7, 'Password must be greater than 7')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {
                await login(values.email, values.password);
            } catch (error) {
                resetForm();
                if (isMountedRef.current) {
                    setSubmitting(false);
                    setErrors({ afterSubmit: error.message });
                }
            }
        }
    });

    const { errors, touched, values, isSubmitting, handleBlur, handleChange, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    return (
        <div className="flex h-screen flex-row pt-32 justify-center sm:px-6 lg:px-8 bg-gray-100">
            <div className="mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-4 px-4 border sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
                        <h2 className="mt-6 text-center text-2xl font-medium tracking-tight text-gray-900">Log in</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            If you have no account,  <a href="/register" className="font-light text-blue-500 hover:text-blue-500">Sign up</a>
                        </p>
                        {loadingState && (<p className="text-center mt-2">Loading...</p>)}

                    </div>
                    <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Type your email address here"
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                />
                                <div className="text-red-500 py-3 text-sm">{errors.email && touched.email && errors.email}</div>
                                { errorBag && (
                                    <div className="text-red-500 py-3 text-sm">
                                        { errorBag.message }
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm text-gray-700">
                                Password
                            </label>
                            <div className="relative mt-1 flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    onChange={handleChange}
                                    required
                                    value={values.password}
                                    onBlur={handleBlur}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-200 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                    placeholder="Type your password here"
                                />
                                <div className="absolute right-0 flex mr-3" onClick={handleShowPassword}>
                                    { showPassword ?
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400 cursor-pointer " aria-hidden="true" />
                                        : <EyeIcon className="h-5 w-5 text-gray-400 cursor-pointer " aria-hidden="true" />}
                                </div>
                            </div>
                            <div className="text-red-500 py-3 text-sm">{errors.password && touched.password && errors.password}</div>
                        </div>

                        <div>
                            <button
                                disabled={loadingState}
                                type="submit"
                                className="flex w-full justify-center mb-4 rounded-md border border-transparent bg-gray-500 py-3 px-6 text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
