import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoOrbisense from "../../assets/images/logoOrbisense.png"
import logoOrbisenseWhite from "../../assets/images/logoOrbisenseWhite.png"

export function Login() {
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
            localStorage.setItem('username', user)
            console.log("Token: ", localStorage.getItem("token"));
            navigate('/home');

        } catch (error) {
            console.error(error);
            setError("*Credenciais inválidas.")

        }
    }

    return (


        <main>
            <section
                className="h-screen bg-black flex items-center justify-center">


                <form className="bg-white w-[56rem] h-[36rem] flex items-center justify-center text-black shadow-[0_20px_24px_0_rgba(255,255,255,0.25)]">
                    <div
                        className="w-[50%] h-[90%] flex flex-col items-center justify-center">

                        <img
                            src={logoOrbisenseWhite}
                            className="max-h-[100%] w-[8rem]">

                        </img>

                        <h1
                            className="mt-[2rem] text-[32px] text-4xl text-[#298287]">
                            Bem vindo(a) de volta!
                        </h1>

                        <p className="text-red-500 mt-[2vh] h-[2vh]">{error}</p>

                        <fieldset
                            className="flex flex-col">

                            <label
                                htmlFor="usuario">
                                Informe o seu nome de usuário
                            </label>
                            <input
                                name="usuario"
                                placeholder="User"
                                className="text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]"
                                type="text"
                                value={user}
                                onChange={(e) => { setUser(e.target.value) }}>
                            </input>

                            <label
                                htmlFor="senha"
                                className="mt-[2rem]">
                                Informe sua senha
                            </label>
                            <input
                                name="senha"
                                placeholder="Password"
                                className="text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]"
                                type="password"
                                onChange={(e) => { setPassword(e.target.value) }}>
                            </input>

                        </fieldset>

                        <button
                            className="mt-[3rem] bg-[#298287] text-white rounded-[12px] w-[18rem] h-[2.5rem] text-center duration-200 easy-in-out hover:scale-110 cursor-pointer"
                            onClick={(e) => { e.preventDefault(); to_login(); }}>
                            Entrar
                        </button>

                        <Link
                            className="mt-[1rem]  bg-white p-[0.5rem] border-2 border-black font-bold h-[2.5rem] w-[18rem] rounded-[16px] text-[14px] text-center duration-200 easy-in-out hover:scale-110 cursor-pointer">
                            Esqueci a senha
                        </Link>

                    </div>

                    <div
                        className="w-[50%] h-full flex flex-col items-center justify-center bg-[#298287] rounded-tl-[40px] rounded-bl-[40px]">
                        <img
                            className="max-h-[100%] w-[9rem]"
                            src={logoOrbisense}>
                        </img>

                        <div
                            className="text-center h-[fit]">
                            <h2
                                className="text-white font-light text-[54px] mt-[1rem]">
                                Orbisense
                            </h2>

                            <h3
                                className="text-white font-light text-[26px]">
                                Smart City
                            </h3>
                        </div>

                        <div
                            className="mt-[4rem] flex flex-col items-center justify-center">
                            <span
                                className="text-white">
                                Novo em nossa plataforma? Cadastre-se agora!
                            </span>

                            <Link
                                className="mt-[2.5rem] bg-white p-[0.5rem] font-bold h-[2.5rem] w-[12rem] rounded-[16px] text-[14px] text-center duration-200 easy-in-out hover:scale-110 cursor-pointer">
                                Cadastre-se
                            </Link>
                        </div>
                    </div>

                </form>


            </section>
        </main>


    )
}