import { MdOutlineNavigateBefore } from "react-icons/md";

export function BotaoVoltar({ setPaginaAtual, paginaAtual }) {

    return (
        <button>
            < MdOutlineNavigateBefore
                onClick={
                    () => {

                        // Verifica se há páginas para voltar, para que no clique volte uma página
                        if (paginaAtual > 1) {
                            setPaginaAtual(paginaAtual - 1)
                        }
                    }
                }
                className={`text-5xl cursor-pointer ${paginaAtual === 1 ? "text-gray-500" : ""}`}
            />
        </button>
    );
};