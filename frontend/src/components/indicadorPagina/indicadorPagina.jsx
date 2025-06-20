import { BotaoAvancar } from "../botoes/botaoAvancar/botaoAvancar";
import { BotaoVoltar } from "../botoes/botaoVoltar/botaoVoltar";

export function IndicadorPagina({ paginaAtual, setPaginaAtual, totalPaginas }) {

    return (
        <nav
            className="flex items-center justify-between w-[30%] mt-[2rem]">

            <BotaoVoltar
                setPaginaAtual={setPaginaAtual}
                paginaAtual={paginaAtual}

            />

            {/* Área do indicativo da página atual */}
            <div className="flex items-center justify-between w-[30%]">

                {/* Área de indicativo da página atual alterável para o usuário */}
                <input
                    value={paginaAtual}

                    // Valida se o valor digitado pelo usuário é válido
                    onChange={(e) => {
                        if (e.target.value < 1) {
                            setPaginaAtual(1)
                        } else if (e.target.value > totalPaginas) {
                            setPaginaAtual(totalPaginas)
                        } else {
                            setPaginaAtual(Number(e.target.value));
                        }
                    }}
                    type="number"
                    min={1}
                    max={totalPaginas}
                    className="w-[3rem] text-center"
                >
                </input>

                <span>
                    de
                </span>

                <span>
                    {totalPaginas}
                </span>

            </div>

            <BotaoAvancar
                setPaginaAtual={setPaginaAtual}
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
            />

        </nav>
    );
};