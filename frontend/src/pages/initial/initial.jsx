import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';


export function Initial() {
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
