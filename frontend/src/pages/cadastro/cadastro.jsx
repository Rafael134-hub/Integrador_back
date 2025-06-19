import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoOrbisense from "../../assets/images/logoOrbisense.png"
import logoOrbisenseWhite from "../../assets/images/logoOrbisenseWhite.png"

export function Cadastro() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCadastro = async () => {

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/signup/',

                {
                    username: usuario,
                    password: senha,
                    email: email
                }

            );

            // Se sucesso do Login, armazena o token e o nome do usuário, além de levar à página home
            navigate('/');

        } catch (error) {
            console.error(error);
            setError("*Credenciais inválidas.")

        }
    }

    return (


        <main>
            <section
                className="h-screen bg-black flex items-center justify-center">

                {/* Formulário de login */}
                <form className="bg-white w-[56rem] h-[36rem] flex items-center justify-center text-black shadow-[0_20px_24px_0_rgba(255,255,255,0.25)]">


                    {/* Área direita, com a logo a empresa e opção secundária para realizar cadastro */}
                    <aside
                        className="w-[50%] h-full flex flex-col items-center justify-center bg-[#298287] rounded-tr-[40px] rounded-br-[40px]">
                        <img
                            className="max-h-[100%] w-[9rem]"
                            src={logoOrbisense}
                            alt="Logo da orbisense" />


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

                        {/* Área para acesso do cadastro */}
                        <div
                            className="mt-[4rem] flex flex-col items-center justify-center">
                            <span
                                className="text-white">
                                Já possui registro em nossa plataforma?
                            </span>

                            <Link
                                to={"/"}
                                className="mt-[2.5rem] bg-white p-[0.5rem] font-bold h-[2.5rem] w-[12rem] rounded-[16px] text-[14px] text-center duration-200 easy-in-out hover:scale-110 cursor-pointer">
                                Voltar ao login
                            </Link>
                        </div>
                    </aside>

                    {/* Área esquerda do formulário com os inputs */}
                    <div
                        className="w-[50%] h-[90%] flex flex-col items-center justify-center">

                        <img
                            src={logoOrbisenseWhite}
                            alt="Logo da Orbisense"
                            className="max-h-[100%] w-[8rem]" />

                        <h1
                            className="mt-[1rem] text-[32px] text-4xl text-[#298287]">
                            Cadastre-se!
                        </h1>

                        <p className="text-red-500 mt-[1vh] h-[2vh]">{error}</p>

                        <fieldset
                            className="flex flex-col">

                            <label
                                htmlFor="usuario">
                                Crie seu nome de usuário
                            </label>
                            <input
                                name="usuario"
                                placeholder="Usuário"
                                className="text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]"
                                type="text"
                                value={usuario}
                                required
                                onChange={(e) => { setUsuario(e.target.value) }} />

                            <label
                                htmlFor="senha"
                                className="mt-[0.5rem]">
                                Informe seu e-mail
                            </label>
                            <input
                                name="senha"
                                placeholder="E-mail"
                                className="text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]"
                                type="email"
                                value={email}
                                required
                                onChange={(e) => { setEmail(e.target.value) }} />

                            <label
                                htmlFor="senha"
                                className="mt-[0.5rem]">
                                Crie sua senha
                            </label>
                            <input
                                name="senha"
                                placeholder="Senha"
                                className="text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]"
                                type="password"
                                value={senha}
                                required
                                onChange={(e) => { setSenha(e.target.value) }} />

                            <label
                                htmlFor="senha"
                                className="mt-[1rem]">
                                Confirme sua senha
                            </label>
                            <input
                                name="senha"
                                placeholder="Confirme a senha"
                                className="text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]"
                                type="password"
                                value={confirmaSenha}
                                required
                                onChange={(e) => { setConfirmaSenha(e.target.value) }} />

                        </fieldset>

                        <button
                            className="mt-[2rem] bg-[#298287] text-white rounded-[12px] w-[18rem] h-[2.5rem] text-center duration-200 easy-in-out hover:scale-110 cursor-pointer"
                            onClick={(e) => { e.preventDefault(); handleCadastro(); }}>
                            Entrar
                        </button>

                    </div>

                </form>


            </section>
        </main>


    )
}