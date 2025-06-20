import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

export function MapaSenai() {

    return (
        <div className="h-[93%] w-[96%] rounded-2xl overflow-hidden">
            <MapContainer
                center={[-22.914444, -47.068194]}
                zoom={16}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; OpenStreetMap'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />

                <Marker position={[-22.914444, -47.068194]}>
                    <Popup>

                        <p>
                            SENAI Roberto Mange
                        </p>

                        <p>
                            Rua Dr. Roberto Mange, Campinas
                        </p>

                    </Popup>
                </Marker>
            </MapContainer>
        </div>

    )
};