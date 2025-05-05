import React, {useState} from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

export default function Home(){
    return(
        <>
            <Header/>

            <main>
                <section>
                    <h1 className="text-center mt-[8vh] text-[40px] font-bold text-sky-600">Welcome to our plataform!</h1>
                    <h2 className="text-center mt-[2vh] text-2xl">What would you like to do?</h2>

                    <div className="flex justify-center items-center mb-[25vh]">
                        <div className="mt-[8vh] w-[70vw] flex justify-between items-cenater text-white">
                            
                            <Link to={"/sensores"}>
                                <div className="bg-teal-700 h-[30vh] w-[15vw] flex items-center justify-center text-center rounded-3xl">
                                    <h3 className="font-bold text-xl">Manage Sensores</h3>
                                </div>
                            </Link>


                            <Link to={"/ambientes"}>
                                <div className="bg-teal-600 h-[30vh] w-[15vw] flex items-center justify-center text-center rounded-3xl">
                                    <h3 className="font-bold text-xl">Manage Ambients</h3>
                                </div>
                            </Link>


                            <Link to={"/historics"}>
                                <div className="bg-sky-600 h-[30vh] w-[15vw] flex items-center justify-center text-center rounded-3xl">
                                    <h3 className="font-bold text-xl">Manage Historics</h3>
                                </div>
                            </Link>

                        </div>
                    </div>
                    
                </section>


            </main>
           

            <Footer />
        </>
    )

}