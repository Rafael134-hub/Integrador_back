import { MdOutlineNavigateNext } from "react-icons/md";

export function BotaoAvancar({ setPaginaAtual, paginaAtual, totalPaginas }) {

    return (
        <button>
            < MdOutlineNavigateNext

                // Verifica se há páginas para avançar, para que no clique avançe uma página
                onClick={() => {
                    if (paginaAtual !== totalPaginas) {
                        setPaginaAtual(paginaAtual + 1)
                    }
                }
                }
                className={`text-5xl cursor-pointer ${paginaAtual === totalPaginas ? "text-gray-500" : ""}`}
            />
        </button>
    );
};