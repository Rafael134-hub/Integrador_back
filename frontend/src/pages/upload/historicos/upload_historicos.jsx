import { useState } from "react";
import { Header } from "../../../components/header/header";
import { Footer } from "../../../components/footer/footer";
import axios from "axios";

export function Upload_historicos() {
    const [file, setFile] = useState(null);
    const [mensagem, setMensagem] = useState('');

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/api/upload-xlsx-historicos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMensagem(response.data.mensagem || "Upload concluído!");
        } catch (error) {
            setMensagem('Erro ao importar dados, U.U');
        }
    };

    return (
        <>
            <Header />

            <main>

                <section>
                    <div className="h-screen bg-gradient-to-bl from-sky-900 via-teal-400 to-green-400">
                        <div className="h-[100vh] flex items-center justify-center">
                            <form className="bg-white w-[24vw] h-[54vh] flex flex-col items-center justify-center rounded-4xl text-black mb-[15vh]">
                                <h1 className="mb-6 text-4xl text-sky-500 font-bold">Importar históricos</h1>
                                <input
                                    type="file"
                                    className="w-[18vw] h-[4vh] p-[1rem] rounded-xl mt-[4vh] bg-blue-100 focus:outline-0 shadow-none"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <p>{mensagem}</p>
                                <button
                                    className="mt-[8vh] bg-teal-500 rounded-2xl w-[12vw] h-[4vh] text-white font-bold cursor-pointer hover:scale-110 transition-all ease-in duration-75"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleUpload();
                                    }}
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
