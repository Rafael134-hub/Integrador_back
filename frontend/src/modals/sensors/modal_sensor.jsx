import { useState } from "react";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function ModalSensores({
    isOpen,
    onClose,
    selectedSensor,
    arrow,
    setArrow
}) {
    if (!isOpen) return null

    const statusSchema = z.union([
        z.boolean(),
        z.enum(["true", "false"]),
    ]).transform(val => {
        if (typeof val === "boolean") return val;
        return val === "true";
    });

    // Schema feito com o zod para tratativa de erros
    const modalAmbienteSchema = z.object({
        sensor: z.string()
            .min(1, "O tipo do sensor é obrigatório")
            .max(255, "O tipo do sensor deve ter no máximo 255 caracteres"),

        macAdress: z.string()
            .min(1, "O MAC Address é obrigatório")
            .max(255, "O MAC Address deve ter no máximo 255 caracteres"),

        unidadeMed: z.string()
            .min(1, "A unidade de medida é obrigatória")
            .max(255, "A unidade de medida deve ter no máximo 255 caracteres"),

        status: statusSchema,

        latitude: z
            .number({ invalid_type_error: "O SIG deve ser um número" })
            .min(-90, "O valor da latitude deve ser maior.")
            .max(90, "O valor da latitude deve ser menor."),

        longitude: z
            .number({ invalid_type_error: "O SIG deve ser um número" })
            .min(-180, "O valor da longitude deve ser maior.")
            .max(180, "O valor da longitude deve ser menor.")
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
            sensor: selectedSensor?.sensor ?? "",
            macAdress: selectedSensor?.mac_adress ?? "",
            unidadeMed: selectedSensor?.unidade_med ?? "",
            latitude: selectedSensor?.latitude ?? "",
            longitude: selectedSensor?.longitude ?? "",
            status: selectedSensor?.status ?? ""
        },
    });

    const token = localStorage.getItem('token')

    // Função de novo sensor da modal
    const newSensor = async (data) => {

        data.status = data.status === "true" | data.status === "false";

        try {
            await axios.post('http://127.0.0.1:8000/api/sensores/',

                {
                    sensor: data.sensor,
                    mac_adress: data.macAdress,
                    unidade_med: data.unidadeMed,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    status: data.status,
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
            console.error("Erro ao inserir sensor:", error);
            console.error("Detalhes do erro:", error.response?.data || error.message);
        }
    };

    // Função de put da modal
    const editSensor = async (data) => {

        data.status = data.status === "true" | data.status === "false";

        try {
            await axios.put(`http://127.0.0.1:8000/api/sensor/${selectedSensor.id}/`,
                {
                    sensor: data.sensor,
                    mac_adress: data.macAdress,
                    unidade_med: data.unidadeMed,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    status: data.status,
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
            console.error("Error while updating sensor:", error.response?.data || error.message);
        }
    };

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[6px] bg-black/75">

            <form
                onSubmit={handleSubmit(selectedSensor ? editSensor : newSensor)}
                className="z-60 bg-white w-[32rem] rounded-[36px] shadow-lg pt-[2rem] flex flex-col items-center justify-center">

                {/* Título do formulário */}
                <span
                    className="font-bold text-[26px] mb-[2rem] place-self-center self-center">
                    {selectedSensor ? `Editar ${selectedSensor.mac_adress}` : "Cadastrar novo sensor!"}
                </span>

                {/* Área dos inputs */}
                <fieldset className="flex items-start justify-center flex-col">

                    <label htmlFor="sensor">
                        Informe o Tipo de sensor
                    </label>

                    <select
                        {...register("sensor")}
                        onFocus={() => clearErrors("root")}
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer">

                        <option value="" disabled>
                            Selecione um tipo
                        </option>

                        <option
                            className="bg-[#298287] text-white"
                            value={"temperatura"}>
                            Temperatura
                        </option>

                        <option
                            className="bg-[#298287] text-white"
                            value={"umidade"}>
                            Umidade
                        </option>

                        <option
                            className="bg-[#298287] text-white"
                            value={"luminosidade"}>
                            Luminosidade
                        </option>

                        <option
                            className="bg-[#298287] text-white"
                            value={"contador"}>
                            Contador
                        </option>
                    </select>
                    {errors.sensor && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.sensor.message}
                        </p>
                    )}

                    <label htmlFor="macAddress"
                        className="mt-[1rem]">
                        Informe o Mac Address
                    </label>
                    <input
                        name="macAddress"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        placeholder="Mac Address do sensor"
                        {...register("macAdress")}
                        onFocus={() => clearErrors("root")}
                    />
                    {errors.macAdress && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.macAdress.message}
                        </p>
                    )}

                    <label htmlFor="medida"
                        className="mt-[1rem]">
                        Informe a unidade de medida
                    </label>
                    <input
                        name="medida"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        placeholder="Uni. de medida"
                        {...register("unidadeMed")}
                        onFocus={() => clearErrors("root")}
                    />
                    {errors.unidadeMed && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.unidadeMed.message}
                        </p>
                    )}

                    <label htmlFor="latitude"
                        className="mt-[1rem]">
                        Informe a latitude
                    </label>
                    <input
                        id="latitude"
                        type="number"
                        step="any"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        placeholder="Latitude do sensor"
                        {...register("latitude", { valueAsNumber: true })}
                        onFocus={() => clearErrors("root")}
                    />
                    {errors.latitude && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.latitude.message}
                        </p>
                    )}

                    <label htmlFor="longitude"
                        className="mt-[1rem]">
                        Informe a longitude
                    </label>
                    <input
                        id="longitude"
                        type="number"
                        step="any"
                        className="border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                        placeholder="Longitude do sensor"
                        {...register("longitude", { valueAsNumber: true })}
                        onFocus={() => clearErrors("root")}
                    />
                    {errors.longitude && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.longitude.message}
                        </p>
                    )}

                    <label htmlFor="status"
                        className="mt-[1rem]">
                        Informe o Status
                    </label>

                    <select
                        id="status"
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer"
                        {...register("status")}
                        onFocus={() => clearErrors("root")}>
                        <option
                            className="bg-[#298287] text-white"
                            value={"true"}>
                            Ativo
                        </option>

                        <option
                            className="bg-[#298287] text-white"
                            value={"false"}>
                            Inativo
                        </option>
                    </select>
                    {errors.status && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.status.message}
                        </p>
                    )}

                </fieldset>

                {/* Área do botão de salvar */}
                <div className="flex items-center justify-center mt-[2rem]">
                    <button id="botao_envioh"
                        className="bg-black text-white p-[0.5rem] w-[25rem] h-[2.5rem] rounded-[16px] duration-200 easy-in-out hover:scale-110 text-[18px] cursor-pointer"
                        type="submit"
                    >
                        Salvar
                    </button>
                </div>

                {/* Área do botão de fechar modal */}
                <div className="flex items-center justify-center text-2xl pb-[4vh] pt-[4vh]">
                    <button
                        className="duration-75 ease-in-out hover:scale-125 cursor-pointer"
                        onClick={onClose}>
                        < IoIosCloseCircle
                            className="text-5xl"
                        />
                    </button>
                </div>

            </form>
        </div>
    )
};