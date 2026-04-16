import React, { useState,useRef,useEffect } from 'react';
import Image from "next/image";


const Popup = ({data,closePopup}) => {


    return (
      <div onClick={closePopup}
        className={`fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 z-50 `}

      > {console.log(data)}

        <div  className="absolute w-1/3 p-11 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 mt-6 shadow-all rounded-lg bg-creem-green">
        <Image
          src="/images/lFlowers.png"
          width={180}
          height="50"
          alt="exaview logo"
          className="absolute -top-0 left-0"
        ></Image> 
          <h1 className='pb-8 font-md text-xl'>Reply</h1>

          <div className='flex gap-8'>
            <h1 className='text-grey font-light text-lg '>Date</h1>
            <h1 className=' font-light text-lg'>{data.date}</h1>
          </div>
          <div className=' border-b py-2 border-solid border-grey'></div>
          <h1 className='text-grey font-light text-lg pt-8 pb-3'>Description</h1>
          <h2 className='bg-cream-grey px-6 py-8 rounded-2xl '>{data.description} </h2>
          <Image
          src="/images/rFlowers.png"
          width={190}
          height="90"
          alt="exaview logo"
          className="absolute -bottom-16 right-0"
          
        ></Image>
        </div>
      </div>
    );
  };
  

export default Popup;
