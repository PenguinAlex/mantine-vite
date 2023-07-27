import {MapContainer, Rectangle, TileLayer,Tooltip} from 'react-leaflet'
import {CRS, LatLngBoundsExpression} from "leaflet";



const Tiledmap = () => {
const step = 4
    const kuant: LatLngBoundsExpression = [
        [-36*step,74*step],
        [-34*step,72*step]
    ]

    return (
        <MapContainer
            center={[0,0]}
            zoom={3}
            crs={CRS.Simple}
            style={{ height:'100vh', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                noWrap
                url="http://31.129.99.231:8000/tiles/{z}/{x}/{y}"
                attribution="Game Map"
            />
            <Rectangle bounds={kuant}>
                <Tooltip>Кванториум</Tooltip>
            </Rectangle>

        </MapContainer>
    );
};

export default Tiledmap;