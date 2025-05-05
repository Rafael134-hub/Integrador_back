import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const to_login = async () => {
        console.log("Login", user, password);

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',

                {
                    username: user,
                    password: password
                }

            );

            console.log("Token Login: ", response.data.access);
            localStorage.setItem('token', response.data.access);
            console.log("Token: ", localStorage.getItem("token"));
            navigate('/home');

        } catch (error) {
            console.error(error);
            setError("*Credenciais inválidas.")
            
        }
    }

    return (

        <>
            <main>
                <section>
                    <div className="h-screen bg-linear-to-bl from-sky-900 via-teal-400 and to-green-400">
                        <div className="h-[100vh] flex items-center justify-center">
                            <form className="bg-white w-[24vw] h-[54vh] flex flex-col items-center justify-center rounded-4xl text-black mb-[10vh]">
                                <h1 className="mb-6vh] text-4xl text-sky-500 font-bold">Login</h1>
                                <p className="text-red-500 mb-[5vh] mt-[2vh] h-[2vh]">{error}</p>
                                <input placeholder="   User" className="w-[18vw] h-[4vh] p-[1rem] rounded-xl bg-blue-100 focus:outline-0" type="text" value={user} onChange={(e) => { setUser(e.target.value) }}></input>
                                <input placeholder="   Password" className="w-[18vw] h-[4vh] p-[1rem] rounded-xl mt-[4vh] bg-blue-100 focus:outline-0 shadow-none" type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                                <button className="mt-[8vh] bg-teal-500 rounded-2xl w-[12vw] h-[4vh] text-white font-bold cursor-pointer hover:scale-110 transition-all ease-in duration-75" onClick={(e) => {e.preventDefault(); to_login();}}>Send</button>
                                <Link to={"/signup/"} id="sign_up_go" className="mt-[4vh]"><p>Não possui conta? Cadastre-se!</p></Link>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>

    )

}