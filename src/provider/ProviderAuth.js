"use client"
import { AuthProvider } from "@/context/AuthContext";

export default function ProviderAuth({children}){
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}