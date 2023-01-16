import React, {useState} from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid/index.js";
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import useIsMountedRef from '../hooks/useIsMountedRef';
import useAuth from "../hooks/useAuth.js";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const isMountedRef = useIsMountedRef();
    const { register, errorBag, loadingState } = useAuth()
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
        lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
            .min(7, 'Must contain more than seven characters')
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {
                await register(values.firstName, values.lastName, values.email, values.password)
                if (isMountedRef.current) {
                    setSubmitting(false);
                }
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

    return (
        <div className="flex h-screen flex-row pt-32 justify-center sm:px-6 lg:px-8 bg-gray-100">
            <div className="mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-4 px-4 border sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
                        <h2 className="mt-6 text-center text-2xl font-medium tracking-tight text-gray-900">Create an account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an account?  <a href="/login" className="font-light text-blue-500 hover:text-blue-500">Log in</a>
                        </p>
                        {loadingState && (<p className="text-center mt-2">Loading...</p>)}
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="md:flex gap-3">
                            <div className="w-full">
                                <label htmlFor="email" className="block text-sm font-light text-gray-700">
                                    First Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="firstName"
                                        type="text"
                                        required
                                        placeholder="Type here"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                    />
                                </div>
                                <div className="text-red-500 py-3 text-sm">{errors.firstName && touched.firstName && errors.firstName}</div>
                            </div>
                            <div className="w-full mt-4 md:mt-0">
                                <label htmlFor="email" className="block text-sm font-light text-gray-700">
                                    Last Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder="Type here"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                    />
                                </div>
                                <div className="text-red-500 py-3 text-sm">{errors.lastName && touched.lastName && errors.lastName}</div>
                            </div>
                        </div>
                        { errorBag && (
                            <div className="text-red-500 py-3 text-sm">
                                { errorBag.message }
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-light text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Type your email address here"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                />
                            </div>
                            <div className="text-red-500 py-3 text-sm">{errors.email && touched.email && errors.email}</div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative mt-1 flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
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
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
