import { MdHistory, MdPlace, MdOutlineSensors } from "react-icons/md";
import { BiSolidMapAlt } from "react-icons/bi";
import { CardHome } from "../../components/cardHome/cardHome";

// Classe dos elementos de card
class Card {
    constructor(descricao, link, icone) {
        this.descricao = descricao;
        this.link = link;
        this.icone = icone;
    }
}

export function Home() {

    // Pega o nome do usuário do localStorage
    const username = localStorage.getItem("usuario");

    // Lista dos elementos de cada card de funcionalidade
    const elementosCard = [
        new Card("Monitorar sensores!", "/sensores", <MdOutlineSensors className="w-[5rem] h-[5rem]" />),
        new Card("Monitorar ambientes!", "/ambientes", <MdPlace className="w-[5rem] h-[5rem]" />),
        new Card("Visualizar o histórico!", "/historicos", <MdHistory className="w-[5rem] h-[5rem]" />),
        new Card("Visualizar o mapa!", "/mapa", <BiSolidMapAlt className="w-[5rem] h-[5rem]" />)
    ];

    return (

        <main>

            {/* Seção do título da página */}
            <section
                aria-label="Área do título da página">

                <div className=" flex items-center justify-center">
                    <div className="flex flex-col items-center mt-[4rem] w-fit">

                        <h1 className="text-[40px] font-bold text-white">
                            Olá <span className="text-[#99FFE1]">{`${username || "Usuário"}!`}</span> o que você gostaria de fazer?
                        </h1>

                        {/* Elemento decorativo que fica embaixo do título */}
                        <div className="bg-[#99FFE1] h-[0.3rem] w-[3rem] rounded-2xl mr-4 self-start relative right-[0.5rem]" />
                    </div>
                </div>

            </section>

            {/* Área dos cards da Home */}
            <section
                aria-label="Área dos cards de opção da página"
                className="flex items-center justify-center w-full mt-[4rem]">

                {/* Grid para alinhar a disposição dos elementos */}
                <div
                    className="grid grid-cols-2 w-[70%] gap-[4rem] place-items-center mb-[8rem]">
                    {
                        elementosCard.map((card, index) => (
                            <CardHome
                                key={index}
                                cardIcon={card.icone}
                                cardLink={card.link}
                                cardText={card.descricao}
                            />
                        ))}

                </div>

            </section>

        </main>

    )

};