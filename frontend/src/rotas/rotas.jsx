import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { Ambientes } from '../pages/ambients/ambient';
import { Sensores } from '../pages/sensores/sensores';
import { Historicos } from '../pages/historic/historicos';
import { Mapa } from '../pages/mapa/mapa';
import { Initial } from '../pages/initial/initial';
import { Login } from '../pages/login/login';

export function Rotas() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />

            <Route path="/" element={<Initial />}>
                <Route path="home" element={<Home />} />
                <Route path="sensores" element={<Sensores />} />
                <Route path="ambientes" element={<Ambientes />} />
                <Route path="historicos" element={<Historicos />} />
                <Route path="mapa" element={<Mapa />} />
            </Route>
            
        </Routes>
    );
};