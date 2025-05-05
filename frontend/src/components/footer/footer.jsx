import React from "react";
import { Link } from "react-router-dom";
import potaxie from '../../assets/potaxie.png';

export default function Footer(){

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
    }

    return(
        <footer className="bg-emerald-700 p-[2rem] text-white flex items-center justify-center border-t-white">
            <p className="text-xl">© 2025 - All rights reserved</p>
        </footer>
        
    )
}