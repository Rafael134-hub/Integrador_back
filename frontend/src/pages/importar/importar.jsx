import { useState } from "react";
import axios from 'axios';
import logoOrbisense from "../../assets/images/logoOrbisense.png"
import logoOrbisenseWhite from "../../assets/images/logoOrbisenseWhite.png"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function Importar() {

    const [mensagem, setMensagem] = useState('');

    const importarSchema = z.object({
        tabelaSelecionada: z.string(),

        arquivo: z
            .any()
            .transform(files => files?.[0]) // Pega o primeiro arquivo do FileList
            .refine(file => file instanceof File, {
                message: "Arquivo inválido",
            }),
    });

    // Declaração do useForma para lidar com o submit
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        resolver: zodResolver(importarSchema)
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("file", data.arquivo);

        try {
            const response = await axios.post(data.tabelaSelecionada, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMensagem(response.data.mensagem || "Upload concluído!");
        } catch (error) {
            // setMensagem('Erro ao importar dados, U.U');
        }
    };

    return (


        <main
            className="mt-[2rem] mb-[2rem]">
            <section
                className="h-screen bg-black flex items-center justify-center">

                {/* Formulário de login */}
                <form
                    className="bg-white w-[60rem] h-[38rem] flex items-center justify-center text-black shadow-[0_20px_24px_0_rgba(255,255,255,0.25)]"
                    onSubmit={handleSubmit(onSubmit)}>


                    {/* Área direita, com a logo a empresa e opção secundária para realizar a importação */}
                    <aside
                        className="w-[50%] h-full flex flex-col items-center justify-center bg-[#298287] rounded-tr-[40px] rounded-br-[40px]">
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

                        {/* Área de mensagem complementar */}
                        <div
                            className="mt-[6rem] flex flex-col items-center justify-center">

                            <p
                                className="text-white text-[20px] text-center w-[70%]">
                                “Tecnologia que sente. Gestão que transforma”
                            </p>

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
                            className="mt-[2rem] text-[32px] text-4xl text-[#298287]">
                            Importar dados via Excel
                        </h1>

                        <p className="mt-[1vh] h-[2vh]">{mensagem}</p>

                        <fieldset
                            className="flex flex-col">

                            <label
                                className="mt-[2rem]"
                                htmlFor="tabela">
                                Selecione a tabela desejada
                            </label>
                            <select
                                {...register("tabelaSelecionada")}
                                onFocus={() => clearErrors("root")}
                                id="tabela"
                                className="bg-white text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer">

                                <option
                                    className="bg-[#298287] text-white"
                                    value={"http://localhost:8000/api/upload-xlsx-sensores/"}>
                                    Sensores
                                </option>

                                <option
                                    className="bg-[#298287] text-white"
                                    value={"http://localhost:8000/api/upload-xlsx-ambientes/"}>
                                    Ambientes
                                </option>

                                <option
                                    className="bg-[#298287] text-white"
                                    value={"http://localhost:8000/api/upload-xlsx-historicos/"}>
                                    Históricos
                                </option>
                            </select>
                            {errors.tabelaSelecionada && (
                                <p
                                    className="text-red-500 text-sm mt-1"
                                    role="alert">
                                    {errors.tabelaSelecionada.message}
                                </p>
                            )}

                            <label
                                htmlFor="arquivo"
                                className="mt-[2rem]">
                                Selecione a planilha .xlsx
                            </label>
                            <input
                                id="arquivo"
                                placeholder="Confirme a senha"
                                className="text-black border-2 border-black rounded-[12px] w-[18rem] h-[2.5rem] pl-[1rem] cursor-pointer"
                                type="file"
                                accept=".xlsx"
                                {...register("arquivo")}
                                onFocus={() => clearErrors("root")}
                            />
                            {errors.arquivo && (
                                <p
                                    className="text-red-500 text-sm mt-1"
                                    role="alert">
                                    {errors.arquivo.message}
                                </p>
                            )}

                        </fieldset>

                        <button
                            type="submit"
                            className="mt-[5rem] bg-[#298287] text-white rounded-[12px] w-[18rem] h-[2.5rem] text-center duration-200 easy-in-out hover:scale-110 cursor-pointer">
                            Enviar dados
                        </button>

                    </div>

                </form>


            </section>
        </main>


    )
};