import React from "react";
import { Link } from "react-router-dom";

export function CardHome({ cardIcon, cardText, cardLink }) {

    return (
        <Link

            // Define o destino da rota
            to={cardLink}
            className="w-fit">

            {/* Card de funcionalidade da Home */}
            <article className="bg-[#298287] text-white w-[30rem] h-[12rem] rounded-xl flex items-center justify-center shadow-[0_14px_16px_0_rgba(255,255,255,0.25)] transition-all duration-200 ease-in-out hover:scale-110">
                {cardIcon}

                <h2 className="ml-[2rem] text-[32px] font-bold w-[50%]">{cardText}</h2>
            </article>

        </Link>

    )
};