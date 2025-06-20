import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logoOrbisense from "../../assets/images/logoOrbisense.png"
import logoOrbisenseWhite from "../../assets/images/logoOrbisenseWhite.png"

export function Login() {
    const navigate = useNavigate();

    // Schema feito com o zod para tratativa de erros
    const loginSchema = z.object({
        usuario: z.string()
            .min(1, "O nome de usuário é obrigatório")
            .max(150, "O nome de usuário deve ter no máximo 150 caracteres"),
        senha: z.string()
            .min(1, "A senha é obrigatória")
            .max(128, "A senha deve ter no máximo 128 caracteres")
    });

    // Declaração do useForma para lidar com o submit
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    // Função para realizar Login
    const onSubmit = async (data) => {

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',

                {
                    username: data.usuario,
                    password: data.senha
                }

            );

            // Se sucesso do Login, armazena o token e o nome do usuário, além de levar à página home
            console.log("Token Login: ", response.data.access);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('usuario', data.usuario);
            console.log("Token: ", localStorage.getItem("token"));
            navigate('/home');

        } catch (error) {
            setError("root", { message: "*Credenciais inválidas." });
        }
    }

    return (


        <main>
            <section
                className="h-screen bg-black flex items-center justify-center">

                {/* Formulário de login */}
                <form
                    className="bg-white w-[56rem] h-[36rem] flex items-center justify-center text-black shadow-[0_20px_24px_0_rgba(255,255,255,0.25)]"
                    onSubmit={handleSubmit(onSubmit)}>

                    {/* Área esquerda do formulário com os inputs */}
                    <div
                        className="w-[50%] h-[90%] flex flex-col items-center justify-center">

                        <img
                            src={logoOrbisenseWhite}
                            alt="Logo da Orbisense"
                            className="max-h-[100%] w-[8rem]" />

                        <h1
                            className="mt-[3rem] text-[32px] text-4xl text-[#298287]">
                            Bem vindo(a) de volta!
                        </h1>

                        {errors.root && (
                            <p
                                className="text-red-500 mt-[2vh] h-[2vh]"
                                role="alert">
                                {errors.root.message}
                            </p>
                        )}

                        <fieldset
                            className="flex flex-col">

                            <label
                                htmlFor="usuario">
                                Informe o seu nome de usuário
                            </label>
                            <input
                                id="usuario"
                                placeholder="Usuário"
                                className="text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]"
                                type="text"
                                {...register("usuario")}
                                onFocus={() => clearErrors("root")}
                                maxLength={150}
                            />
                            {errors.usuario && (
                                <p
                                    className="text-red-500 text-sm mt-1"
                                    role="alert">
                                    {errors.usuario.message}
                                </p>
                            )}

                            <label
                                htmlFor="senha"
                                className="mt-[2rem]">
                                Informe sua senha
                            </label>
                            <input
                                id="senha"
                                placeholder="Senha"
                                className="text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem]"
                                type="password"
                                {...register("senha")}
                                maxLength={128}
                                onFocus={() => clearErrors("root")}
                                onCopy={(e) => e.preventDefault()}
                                onCut={(e) => e.preventDefault()}
                            />
                            {errors.senha && (
                                <p
                                    className="text-red-500 text-sm mt-1"
                                    role="alert">
                                    {errors.senha.message}
                                </p>
                            )}

                        </fieldset>

                        <button
                            className="mt-[5rem] bg-[#298287] text-white rounded-[12px] w-[18rem] h-[2.5rem] text-center duration-200 easy-in-out hover:scale-110 cursor-pointer"
                            type="submit">
                            Entrar
                        </button>

                    </div>

                    {/* Área direita, com a logo a empresa e opção secundária para realizar cadastro */}
                    <aside
                        className="w-[50%] h-full flex flex-col items-center justify-center bg-[#298287] rounded-tl-[40px] rounded-bl-[40px]">
                        <img
                            className="max-h-[100%] w-[9rem]"
                            src={logoOrbisense}
                            alt="Logo da orbisense"
                        />


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
                                Novo em nossa plataforma? Cadastre-se agora!
                            </span>

                            <Link
                                to={"/cadastro"}
                                className="mt-[2.5rem] bg-white p-[0.5rem] font-bold h-[2.5rem] w-[12rem] rounded-[16px] text-[14px] text-center duration-200 easy-in-out hover:scale-110 cursor-pointer">
                                Cadastre-se
                            </Link>
                        </div>
                    </aside>

                </form>


            </section>
        </main>


    )
};