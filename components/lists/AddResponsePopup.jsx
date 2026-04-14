import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import CustomInput from '../loginPage/CustomInput';
import dayjs from 'dayjs';
import Link from 'next/link';


const AddResponsePopup = ({ data, setData, closePopup, addResponse ,reclamationData }) => {
    const today = dayjs().format('DD/MM/YYYY');
    return (
            <div
                className={`fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 z-50 `}

            >

                <div className="absolute w-1/3 p-11 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 mt-6 shadow-all rounded-lg bg-creem-green">
                    <Image
                        src="/images/lFlowers.png"
                        width={180}
                        height="50"
                        alt="exaview logo"
                        className="absolute -top-0 left-0"
                    ></Image>
                    <div className="pb-2 flex items-center justify-between">
                        <h1 className='font-md text-xl'>Réponse</h1>
                        <Image
                            onClick={closePopup}
                            src="/icons/close.svg"
                            width={20}
                            height="20"
                            alt="search icon"
                            className="cursor-pointer"
                        ></Image>
                    </div>
                    <div className="pb-8 w-fit ml-auto text-light-green underline">
                    <Link  href={`/listes/Reclamations/${reclamationData.id}`}>Voir les details de la réclamation </Link>

                    </div>
                    <div className='flex gap-8'>
                        <h1 className='text-grey font-light text-lg '>Date</h1>
                        <h1 className=' font-light text-lg'>{today}</h1>
                    </div>
                    <div className=' border-b py-2 border-solid border-grey'></div>
                    <h1 className='text-grey font-light text-lg pt-8 pb-3'>Description</h1>
                    <CustomInput
                        label=""
                        steFunction={setData}
                        attr="description"
                        data={data}
                        type="text"
                    />
                    <div className="flex justify-end">
                        <button
                            className="btn-green px-11 py-2.5 mt-4 light-grey z-100"
                            onClick={addResponse}
                        >
                            Ajouter
                        </button>
                    </div>
                    
                </div>
            </div>
    );
};


export default AddResponsePopup;
