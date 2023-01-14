import React, {Fragment} from 'react';
import { Menu, Transition } from '@headlessui/react'
import {ChevronDownIcon, EnvelopeIcon, PhoneIcon, XMarkIcon} from '@heroicons/react/20/solid'
import { PlusIcon as PlusIconMini } from '@heroicons/react/20/solid'
import { PlusIcon as PlusIconOutline } from '@heroicons/react/24/outline'
import CreateNoteModal from "../components/Modals/CreateNoteModal.jsx";
function Dashboard() {
    return (
        <>
            <div className="relative bg-amber-200 opacity-60">
                <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
                    <div className=" sm:px-16 sm:text-center text-black">
                        <p>You have not verified your email address. Click <a href="#" className="text-blue-500">here</a> to resend verification link.</p>
                    </div>
                </div>
            </div>
            <div className="border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 bg-white">
                    <div className="nav flex flex-col sm:flex-row justify-between items-center h-16 ">
                        <div className="text-xl font-medium">Dashboard</div>
                        <div>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="flex items-center rounded-full hover:text-gray-600">
                                        <span className="sr-only">Open options</span>
                                        John Jones
                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-2 px-4">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className="text-red-500"
                                                    >
                                                        Logout
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100  h-[calc(100vh-100px)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        <div className=" p-6 rounded-lg border bg-white h- max-w-sm">
                            <div className="text-gray-700 text-base mb-4">
                                <p className="text-gray-500">Name</p>
                                <p className="">Item 1</p>

                                <div className="mt-4">
                                    <p className="text-gray-500">Description</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consequatur, distinctio ipsam libero omnis sequi suscipit voluptatibus voluptatum!</p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md  bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed transition duration-150 ease-in-out bottom-5 right-5" >
                    <button
                        type="button"
                        className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm"
                    >
                        <PlusIconMini className="h-10 w-10" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <CreateNoteModal />
        </>
    );
}

export default Dashboard;
