import { useState } from "react";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function ModalAmbientes({
    isOpen,
    onClose,
    selectedAmbiente,
    arrow,
    setArrow
}) {
    if (!isOpen) return null

    // Schema feito com o zod para tratativa de erros
    const modalAmbienteSchema = z.object({
        sig: z
            .number({ invalid_type_error: "O SIG deve ser um número" })
            .int("O SIG deve ser um número inteiro")
            .min(-2147483648, "Valor mínimo permitido é -2.147.483.648")
            .max(2147483647, "Valor máximo permitido é 2.147.483.647"),

        descricao: z.string()
            .min(1, "O e-mail é obrigatório")
            .max(255, "O e-mail deve ter no máximo 255 caracteres"),

        ni: z.string()
            .min(1, "A senha é obrigatória")
            .max(255, "A senha deve ter no máximo 255 caracteres"),

        responsavel: z.string()
            .min(1, "A confirmação de senha é obrigatória")
            .max(255, "A confirmação de senha deve ter no máximo 255 caracteres")
    });

    // Declaração do useForma para lidar com o submit
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(modalAmbienteSchema),
        defaultValues: {
            sig: selectedAmbiente?.sig ?? "",
            descricao: selectedAmbiente?.descricao ?? "",
            ni: selectedAmbiente?.ni ?? "",
            responsavel: selectedAmbiente?.responsavel ?? "",
        },
    });

    const token = localStorage.getItem('token')

    // Função de novo ambiente
    const newAmbiente = async (data) => {

        try {
            await axios.post('http://127.0.0.1:8000/api/ambientes/',

                {
                    sig: data.sig,
                    descricao: data.descricao,
                    ni: data.ni,
                    responsavel: data.responsavel
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            console.log("Dados inseridos com sucesso");
            setArrow(!arrow);
            onClose(true);
        } catch (error) {
            console.error("Erro ao inserir ambiente:", error);
            console.error("Detalhes do erro:", error.response?.data || error.message);
        }
    };

    // Função de editar ambiente
    const editAmbiente = async (data) => {
        try {

            await axios.put(`http://127.0.0.1:8000/api/ambiente/${selectedAmbiente.id}/`,
                {
                    sig: data.sig,
                    descricao: data.descricao,
                    ni: data.ni,
                    responsavel: data.responsavel
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Data update was succesfull");
            setArrow(!arrow);
            onClose(true);
        } catch (error) {
            console.error("Error while updating ambient:", error.response?.data || error.message);
        }
    };

    return (
        <section
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[6px] bg-black/75">

            <form
                onSubmit={handleSubmit(selectedAmbiente ? editAmbiente : newAmbiente)}
                className="z-60 bg-white w-[32rem] rounded-[36px] shadow-lg pt-[2rem] flex flex-col items-center justify-center">

                {/* Título do formulário */}
                <span
                    className="font-bold text-[26px] mb-[1rem] place-self-center self-center">
                    {selectedAmbiente ? `Editar ${selectedAmbiente.descricao}` : "Cadastrar novo ambiente!"}
                </span>

                {/* Área dos inputs */}
                <fieldset className="flex items-start justify-center flex-col">

                    <label htmlFor="sig"
                        className="mt-[2rem]">
                        Informe SIG
                    </label>
                    <input
                        id="sig"
                        type="number"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        placeholder="SIG do ambiente"
                        {...register("sig", { valueAsNumber: true })}
                        onFocus={() => clearErrors("root")}
                    />
                    {errors.sig && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.sig.message}
                        </p>
                    )}


                    <label htmlFor="descricao"
                        className="mt-[2rem]">
                        Informe a descrição do ambiente
                    </label>
                    <input
                        id="descricao"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        placeholder="Descrição do ambiente"
                        {...register("descricao")}
                        onFocus={() => clearErrors("root")}
                    />
                    {errors.descricao && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.descricao.message}
                        </p>
                    )}

                    <label htmlFor="ni"
                        className="mt-[2rem]">
                        Informe o NI do ambiente
                    </label>
                    <input
                        id="ni"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        placeholder="Ni do ambiente"
                        {...register("ni")}
                        onFocus={() => clearErrors("root")}
                    />
                    {errors.ni && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.ni.message}
                        </p>
                    )}

                    <label htmlFor="responsavel"
                        className="mt-[2rem]">
                        Informe o responsável do ambiente
                    </label>
                    <input
                        id="responsavel"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        placeholder="Responsável do ambiente"
                        {...register("responsavel")}
                        onFocus={() => clearErrors("root")}
                    />
                    {errors.responsavel && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.responsavel.message}
                        </p>
                    )}

                </fieldset>

                {/* Área do botão de salvar */}
                <div className="flex items-center justify-center mt-[3rem]">
                    <button
                        className="bg-black text-white p-[0.5rem] w-[25rem] h-[2.5rem] rounded-[16px] duration-200 easy-in-out hover:scale-110 text-[18px] cursor-pointer"
                        type="submit">
                        Salvar
                    </button>
                </div>

                {/* Área do botão de fechar modal */}
                <div className="flex items-center justify-center text-2xl pb-[4vh] pt-[4vh]">
                    <button
                        className="duration-75 ease-in-out hover:scale-125 cursor-pointer"
                        onClick={onClose}
                        aria-label="Botão de fechar modal">
                        < IoIosCloseCircle
                            className="text-5xl"
                        />
                    </button>
                </div>

            </form>
        </section>
    )
};