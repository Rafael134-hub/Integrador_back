import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { Ambientes } from '../pages/ambients/ambient';
import { Sensores } from '../pages/sensores/sensores';
import { Historicos } from '../pages/historic/historicos';
import { Mapa } from '../pages/mapa/mapa';
import { Importar } from '../pages/importar/importar';
import { Initial } from '../pages/initial/initial';
import { Login } from '../pages/login/login';
import { Cadastro } from '../pages/cadastro/cadastro';

export function Rotas() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            <Route path="/" element={<Initial />}>
                <Route path="importar" element={<Importar />} />
                <Route path="home" element={<Home />} />
                <Route path="sensores" element={<Sensores />} />
                <Route path="ambientes" element={<Ambientes />} />
                <Route path="historicos" element={<Historicos />} />
                <Route path="mapa" element={<Mapa />} />
            </Route>
            
        </Routes>
    );
};