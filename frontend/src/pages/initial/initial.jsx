import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';
export function Initial() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Sidebar />
            <Header />

            <div className="flex-grow pl-[6.5rem]">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}
