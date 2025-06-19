"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import constant from "@/constant/static";

export default function Home() {
  const { username, password, logout } = useAuth();
  const [data, setData] = useState(null);
  const router = useRouter();

  function handleRoute(e){
    router.push('/disaster');
  }

  useEffect(() => {
    if (!username) {
      router.push("/login"); 
      return;
    }

    fetch(`${constant.host}/disasters?username=${username}&password=${password}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [username]); 

  return (
    <div className="flex flex-col h-screen justify-between items-center p-4">
      <h1 className="text-2xl font-bold">Disaster Updates</h1>

      <button
        onClick={handleRoute}
        className="bg-red-500 text-white rounded-lg p-2 m-2"
      >
        Create Disaster
      </button>

      <h2 className="text-lg">Some flags listed below for disaster:</h2>

      <div className="flex flex-wrap justify-center">
        {data &&
          data.map((row, i) =>
            row.tags?.map((tag, j) => (
              <button
                key={`${i}-${j}`}
                className="bg-yellow-500 text-white p-2 m-2 rounded"
              >
                {tag}
              </button>
            ))
          )}
      </div>

      <button
        onClick={logout}
        className="bg-blue-500 text-white rounded-lg p-2 m-2"
      >
        Logout
      </button>
    </div>
  );
}
