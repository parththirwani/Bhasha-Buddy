import React, { useState, useEffect } from 'react';

const PrivacyAlert = () => {
    const [appear,setAppear] = useState(true)
    return (
        <>
      {appear &&<div className="fixed bottom-0 left-0 right-0 bg-blue-100 border-t border-blue-400 text-blue-700 px-4 py-3 flex justify-between items-center" role="alert">
        <div>
          <strong className="font-bold">Privacy Notice:</strong>
          <span className="block sm:inline"> We use the information you provide to improve our language models.Do you want to give access for your personal database?</span>
          <a href="/MyDiary" className="underline text-blue-800 hover:text-blue-600">Learn more</a>
        </div>
        <button onClick={()=>{
            setAppear(false)
        }}className="ml-40 mr-5 bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent transition ease-in-out duration-150">
          Yes
        </button>
        <button onClick={()=>{
            setAppear(false)
        }}className="mr-36 bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent transition ease-in-out duration-150">
          No
        </button>
      </div>}
      </>
    );
  };
export default PrivacyAlert
  
