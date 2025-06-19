
"use client"
import {useAuth} from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import constant from "@/constant/static";
export default function Login(){
    const {login} = useAuth();  
    const router = useRouter();
    function handleSubmit(e){
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;
        
        if(username && password){
            const data = fetch(`${constant.host}?username=${username}&password=${password}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((res)=>{
                if(res.ok){
                    login(username,password);
                    router.push('/')
                }
            }).catch((err)=>console.log(err));
        }
    }
    return (
   <div className="flex flex-col h-screen justify-center align-center items-center">
        <p>username : john & password: john123</p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <input type="text" placeholder="name" className="border border-gray-300 rounded-lg p-2 m-2"/>
            <input type="password" placeholder="password" className="border border-gray-300 rounded-lg p-2 m-2"/>
            <button className="bg-blue-500 text-white rounded-lg p-2 m-2">Login</button>
        </form>
    </div>);
}