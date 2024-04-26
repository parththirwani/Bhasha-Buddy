import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
interface User {
    id: number;
    username: string;
    // Add other properties as needed
  }
//@ts-ignore
function Modal({ closeModal }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);

    const handleSearch = async (query:string) => {
        try {
          const response = await axios.post('/api/search', { query });
          console.log(response.data);
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error searching users:', error);
        }
      };

      //@ts-ignore
    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
        handleSearch(value);
    };

    const handleFollow = async (userId:any) => {
        try {
          await axios.post('/api/user/follow', { userId });
          alert('User followed successfully');
          console.log('User followed successfully');
        } catch (error) {
          console.error('Error following user:', error);
        }
    };

    return (
      <div
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80"
        onClick={() => closeModal()}
      >
        <div
          className="bg-white w-[400px] h-[400px] rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
            <div className="border-b-[1px] border-neutral-400">
          <p className=" font-bold text-center text-2xl text-neutral-500 py-2">Find Friends</p>
          </div>

          <div>
          <form className="max-w-md mx-auto">   
                <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4  dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                 </svg>
                </div>
                 <input
                 value={searchQuery}
                 onChange={handleInputChange}
                type="search" 
                 className="block w-full p-4 ps-10 text-sm focus:outline-none text-black bg-neutral-100 rounded-b-lg"/>
                 {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-purple-500 hover:bg-purple-800 font-medium rounded-lg text-sm px-4 py-2 ">Search</button> */}
                </div>
            </form>
          </div>
          <div className="mt-4 px-4">
          <ul>
            {searchResults.map(user => (
              <li key={user.id} className="flex justify-between items-center py-2">
                <span className='text-neutral-900'>{user.username}</span>
                <Button variant={"secondary"} onClick={() => handleFollow(user.id)} className='text-neutral-200' >
                  Follow
                </Button>
              </li>
            ))}
          </ul>
        </div>

        </div>

      </div>
    );
  }

export default Modal;