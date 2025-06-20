import { MapaSenai } from "../../components/mapa/mapaSenai"

export function Mapa() {

    return (

        <main>

            {/* Seção do título da página */}
            <section
                aria-label="Área do título da página">

                <div className=" flex items-center justify-center">
                    <div className="flex flex-col items-center mt-[4rem] w-fit">

                        <h1 className="text-[40px] font-bold text-white">
                            Visualize o <span className="text-[#99FFE1]">Mapa do Senai!</span>
                        </h1>

                        {/* Elemento decorativo que fica embaixo do título */}
                        <div className="bg-[#99FFE1] h-[0.3rem] w-[3rem] rounded-2xl mr-4 self-start relative right-[0.5rem]" />
                    </div>
                </div>

            </section>

            {/* Área do mapa do Senai*/}
            <section className="flex items-center justify-center w-full mt-[4rem] mb-[8rem]">

                <div
                    className="w-[80%] h-[40rem] bg-[#99FFE1] shadow-[0_20px_24px_0_rgba(255,255,255,0.25)] flex items-center justify-center rounded-2xl">
                    <MapaSenai />
                </div>

            </section>


        </main>

    )

};