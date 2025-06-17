import { useState, useEffect } from "react";
import { FaPlus } from 'react-icons/fa'
import axios from 'axios';
import { TabelaAmbientes } from "../../components/tabelas/tabelaAmbientes/tabelaAmbientes";
import { ModalAmbientes } from "../../modals/ambients/modal_ambient";
import { BotaoExportar } from "../../components/botoes/botaoExportar/botaoExportar";
import { BotaoCadastrar } from "../../components/botoes/botaoCadastrar/botaoCadastrar";
import { FilterAmbientes } from "../../components/filter/filter_ambients/filter_ambient";
import { IndicadorPagina } from "../../components/indicadorPagina/indicadorPagina";

export function Ambientes() {

    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const [arrow, setArrow] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAmbiente, setSelectedAmbiente] = useState(null);

    // useStates do filtro
    const [sig, setSig] = useState("");
    const [descricao, setDescricao] = useState("");

    // Pega os ambientes atual do banco
    useEffect(() => {

        if (!token) return;
        console.log("Data: ", data);

        const fetchData = async () => {

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/ambientes/?sig=${sig}&descricao=${descricao}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setData(response.data);
                console.log("Datah: ", data);

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [arrow, sig, descricao]);

    // Variáveis da paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPagina = 10;
    const inicioIndice = (paginaAtual - 1) * itensPagina;
    const fimIndice = inicioIndice + itensPagina;
    const itensAtuais = data.slice(inicioIndice, fimIndice);
    const totalPaginas = Math.ceil(data.length / itensPagina);


    return (

        <main>
            {/* Seção do título da página */}
            <section
                aria-label="Área do título da página">

                <div className=" flex items-center justify-center">
                    <div className="flex flex-col items-center mt-[4rem] w-fit">

                        <h1 className="text-[40px] font-bold text-white">
                            Gerencie os <span className="text-[#99FFE1]">{"Ambientes!"}</span>
                        </h1>

                        {/* Elemento decorativo que fica embaixo do título */}
                        <div className="bg-[#99FFE1] h-[0.3rem] w-[3rem] rounded-2xl mr-4 self-start relative right-[0.5rem]" />
                    </div>
                </div>

            </section>

            {/* Área de opções de filtro, exportação e cadastro */}
            <section
                className="flex items-center justify-center mb-[1rem] mt-[6rem]">

                <div
                    className="flex items-center justify-between w-[90%]">

                    <FilterAmbientes
                        sig={sig}
                        setSig={setSig}
                        descricao={descricao}
                        setDescricao={setDescricao}
                    />

                    {/* Área de cadastro e exportar, div usada para alinhar elementos */}
                    <div className="min-w-[14%] gap-[2rem] w-fit flex items-center justify-between">
                        <BotaoCadastrar
                            tituloBotao={"Ambiente"}
                            setOpenModal={setModalOpen}
                            setSelectedSensor={setSelectedAmbiente}
                        />

                        < BotaoExportar
                            urlExportar={`http://127.0.0.1:8000/api/exportar/ambientes/?sig=${sig}&descricao=${descricao}`}
                            nomePlanilha={"ambientes"}
                            tituloBotao={"Ambientes"}
                        />
                    </div>

                </div>

            </section>


            {/* Área da tabela */}
            <section className="flex items-center justify-center mb-[8rem]">

                <div className="flex items-center justify-center flex-col bg-white p-[2rem] rounded-3xl w-[90%]">
                    <TabelaAmbientes
                        data={itensAtuais}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        setSelectedAmbiente={setSelectedAmbiente}
                        setData={setData}
                        setArrow={setArrow}
                        arrow={arrow}
                    />

                    {/* Área de paginação da tabela */}
                    <IndicadorPagina
                        paginaAtual={paginaAtual}
                        setPaginaAtual={setPaginaAtual}
                        totalPaginas={totalPaginas}
                    />

                </div>

            </section>


            {/* Modal de cadastro e edição */}
            <ModalAmbientes
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                selectedAmbiente={selectedAmbiente}
                setSelectedAmbiente={setSelectedAmbiente}
                arrow={arrow}
                setArrow={setArrow}
            />

        </main>

    )

}