import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function ModalHistoricos({
    isOpen,
    onClose,
    selectedHistorico,
    arrow,
    setArrow
}) {
    if (!isOpen) return null

    const [sensores, setSensores] = useState([]);
    const [ambientes, setAmbientes] = useState([]);

    const token = localStorage.getItem('token')


    useEffect(() => {

        if (!token) return;

        const fetchSensores = async () => {

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/sensores/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setSensores(response.data);
                console.log("Dadoohs: ", data);

            } catch (error) {
                console.log(error)
            }
        };

        const fetchAmbientes = async () => {

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/ambientes/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setAmbientes(response.data);
                console.log("Dadoohs: ", data);

            } catch (error) {
                console.log(error)
            }
        }

        fetchSensores();
        fetchAmbientes();
    }, []);

    const timestamp = z.string()
        .min(1, "O timestamp é obrigatório")
        .max(255, "O timestamp deve ter no máximo 255 caracteres")
        .refine(val => !isNaN(Date.parse(val)), {
            message: "O timestamp deve estar em formato ISO 8601 válido",
        })
        .transform(val => new Date(val));

    // Schema feito com o zod para tratativa de erros
    const modalAmbienteSchema = z.object({
        sensor: z
            .number({ invalid_type_error: "O ID do sensor selecionado deve ser um número" })
            .int("O ID do sensor selecionado deve ser um número inteiro")
            .min(-2147483648, "O valor mínimo do ID do sensor permitido é -2.147.483.648")
            .max(2147483647, "Valor máximo do ID do sensor permitido é 2.147.483.647"),

        ambiente: z
            .number({ invalid_type_error: "O ID do ambiente selecionado deve ser um número" })
            .int("O ID do ambiente selecionado deve ser um número inteiro")
            .min(-2147483648, "O valor mínimo do ID do ambiente permitido é -2.147.483.648")
            .max(2147483647, "Valor máximo do ID do ambiente permitido é 2.147.483.647"),

        valor: z
            .number({ invalid_type_error: "O valor deve ser um número" })
            .min(-2147483648, "O valor mínimo permitido é -2.147.483.648")
            .max(2147483647, "Valor máximo é 2.147.483.647"),

        timestamp: timestamp
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
            sensor: selectedHistorico?.sensor?.id ?? undefined,
            ambiente: selectedHistorico?.ambiente?.id ?? undefined,
            valor: selectedHistorico?.valor ?? undefined,
            timestamp: selectedHistorico?.timestamp
                ? formatarParaInput(selectedHistorico.timestamp)
                : ""
        },
    });


    const newHistorico = async (data) => {

        try {
            await axios.post('http://127.0.0.1:8000/api/historicos/',

                {
                    id_sensor: data.sensor,
                    id_ambiente: data.ambiente,
                    valor: data.valor,
                    timestamp: data.timestamp

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


    const editHistorico = async (data) => {
        try {

            await axios.put(`http://127.0.0.1:8000/api/historico/${selectedHistorico.id}/`,
                {
                    id_sensor: data.sensor,
                    id_ambiente: data.ambiente,
                    valor: data.valor,
                    timestamp: data.timestamp
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

    function formatarParaInput(datetimeString) {
        const date = new Date(datetimeString);
        const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return local.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
    }


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[6px] bg-black/75">

            <form
                onSubmit={handleSubmit(selectedHistorico ? editHistorico : newHistorico)}
                className="z-60 bg-white w-[32rem] rounded-[36px] shadow-lg pt-[2rem] flex flex-col items-center justify-center">

                {/* Título do formulário */}
                <span
                    className="font-bold text-[26px] mb-[1rem] place-self-center self-center">
                    {selectedHistorico ? "Editar Histórico!" : "Cadastrar novo histórico!"}
                </span>

                {/* Área dos inputs */}
                <fieldset className="flex items-start justify-center flex-col">

                    <label htmlFor="timestamp">
                        Informe a data e hora
                    </label>
                    <input
                        name="timestamp"
                        type="datetime-local"
                        {...register("timestamp")}
                        onFocus={() => clearErrors("root")}
                        placeholder="Data e hora"
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                    />
                    {errors.timestamp && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.timestamp.message}
                        </p>
                    )}

                    <label htmlFor="valor"
                        className="mt-[2rem]">
                        Informe o valor
                    </label>
                    <input
                        name="valor"
                        type="number"
                        step="any"
                        {...register("valor", { valueAsNumber: true })}
                        onFocus={() => clearErrors("root")}
                        placeholder="Valor de registro"
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem]"
                    />
                    {errors.valor && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.valor.message}
                        </p>
                    )}

                    <label htmlFor="sensor"
                        className="mt-[2rem]">
                        Informe o sensor selecionado
                    </label>

                    <select
                        name="sensor"
                        {...register("sensor", { valueAsNumber: true })}
                        onFocus={() => clearErrors("root")}
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer">
                        {
                            sensores.map((sensor, index) => (
                                <option
                                    key={index}
                                    className="bg-[#298287] text-white"
                                    value={sensor.id}>
                                    {sensor.mac_adress}
                                </option>
                            ))}
                    </select>
                    {errors.sensor && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.sensor.message}
                        </p>
                    )}

                    <label htmlFor="ambiente"
                        className="mt-[2rem]">
                        Informe o ambiente selecionado
                    </label>

                    <select
                        name="ambiente"
                        {...register("ambiente", { valueAsNumber: true })}
                        onFocus={() => clearErrors("root")}
                        className="bg-white text-black border-2 border-black rounded-[12px] w-[25rem] h-[2.5rem] pl-[1rem] pr-[1rem] cursor-pointer">
                        {
                            ambientes.map((ambiente, index) => (
                                <option
                                    key={index}
                                    className="bg-[#298287] text-white"
                                    value={ambiente.id}>
                                    {ambiente.descricao}
                                </option>
                            ))}
                    </select>
                    {errors.ambiente && (
                        <p
                            className="text-red-500 text-sm mt-1"
                            role="alert">
                            {errors.ambiente.message}
                        </p>
                    )}

                </fieldset>

                {/* Área do botão de salvar */}
                <div className="flex items-center justify-center mt-[3rem]">
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
                        onClick={onClose}
                        aria-label="Botão de fechar modal">
                        < IoIosCloseCircle
                            className="text-5xl"
                        />
                    </button>
                </div>

            </form>
        </div>
    )
};