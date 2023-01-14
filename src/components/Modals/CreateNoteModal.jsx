import React, {useEffect} from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function CreateNoteModal(props) {
    const [open, setOpen] = useState(true)
    useEffect(() => {
        return () => {
            // alert('hello')
        };
    }, []);

    return (
        <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white pt-5 pb-4 text-left shadow-xl transition-all sm:my-4 sm:w-full sm:max-w-lg">
                                    <div className="mt-10 sm:mt-0">
                                        <div>
                                            <div className="px-4 sm:px-0 border-b pb-4 sm:pl-6">
                                                <h3 className="text-lg font-medium leading-6 text-gray-900">Create Item</h3>
                                            </div>
                                            <div className="mt-5 md:col-span-2 md:mt-0">
                                                <form action="#" method="POST">
                                                    <div className="overflow-hidden sm:rounded-md">
                                                        <div className="bg-white px-4 py-5 sm:p-6">
                                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                                Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                autoComplete="given-name"
                                                                placeholder="Input item name here"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        <div className="bg-white sm:px-6">
                                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                                Add Note
                                                            </label>
                                                            <textarea
                                                                name="name"
                                                                autoComplete="given-name"
                                                                placeholder="Type here"
                                                                rows="5"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        <div className="px-4 py-3 text-right sm:px-6">
                                                            <button
                                                                type="button"
                                                                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            >
                                                                Create Event
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
    );
}

export default CreateNoteModal;
