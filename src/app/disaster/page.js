"use client";
import { useState } from "react";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation"
import constant from "@/constant/static"

export default function CreateDisaster() {
  const [title, setTitle] = useState('');
  const {username,password} = useAuth();
  
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [ownerId, setOwnerId] = useState('');

  const router = useRouter();

  const handleDisaster = async (e) => {
    e.preventDefault();
    const locationData = await fetch(`${constant.host}/geocode?username=${username}&password=${password}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({description:description})
    }).then((res)=>res.json());

    
    const payload = {
      title,
      location_name: locationData.locationName,
      latitude:locationData.coords.lat,
      longitude:locationData.coords.lng,
      description,
      tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()) || [],
      owner_id: ownerId,
    };

    try {
      const res = await fetch(`${constant.host}/disasters?username=${username}&password=${password}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log('Submitted:', result);
      alert('Disaster submitted successfully!');
      router.push('/')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form className="flex flex-col w-full max-w-md" onSubmit={handleDisaster}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 m-2"
          required
        />
        
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 m-2"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 m-2"
        />
        <input
          type="text"
          placeholder="Owner ID"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 m-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 m-2"
        >
          Submit Disaster
        </button>
      </form>
    </div>
  );
}
