import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Sidebar } from '../../components/sidebar/sidebar';
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export function Initial() {

    const navigate = useNavigate();

    // Verifica sempre se há token, para se não avisar o usuário e ir para Home
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Sua sessão expirou, faça Login novamente.")
            navigate('/login');
        };

    }, [navigate]);

    return (
        <div className='flex flex-col justify-between w-full min-h-screen'>
            <Sidebar />

            <div
                className='pl-[6.5rem] flex flex-col'>
                <Header />

                <div className="flex-grow">
                    <Outlet />
                </div>

                <Footer />
            </div>

        </div>
    );
}
