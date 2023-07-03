import express from 'express';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
async function splitMap(){


    async function splitIntoTiles(path: string, zoomLevel: number) {
        const image = sharp(path,{limitInputPixels:false});
        const metadata = await image.metadata();
        const width = metadata.width || 0;
        const height = metadata.height || 0;
        const resizedImage = await image.resize(Math.floor(width / (2 ** (6 - zoomLevel))), Math.floor(height / (2 ** (6 - zoomLevel))));
        const resizedMetadata = await resizedImage.metadata();
        const resizedWidth = resizedMetadata.width || 0;
        const resizedHeight = resizedMetadata.height || 0;
        const tileWidth = 256;
        const tileHeight = 256;
        const tilesDir = `tiles/${zoomLevel}`;

        fs.mkdirSync(tilesDir, { recursive: true });

        for (let x = 0; x < resizedWidth; x += tileWidth) {
            for (let y = 0; y < resizedHeight; y += tileHeight) {
                const tile = resizedImage.extract({
                    left: x,
                    top: y,
                    width: tileWidth,
                    height: tileHeight,
                });

                const tileDir = `${tilesDir}/${Math.floor(x / tileWidth)}`;
                fs.mkdirSync(tileDir, { recursive: true });
                const tilePath = `${tileDir}/${Math.floor(y / tileHeight)}.png`;
                await tile.toFile(tilePath);
            }
        }
    }

    const imagePath = 'C:\\map.png';
    for (let i = 0; i < 7; i++) {
        splitIntoTiles(imagePath, i)
            .then(() => {
                console.log(`Tiles generated for zoom level ${i}`);
            })
            .catch((error) => {
                console.error(`Error generating tiles for zoom level ${i}:`, error);
            });
    }

}
splitMap();
const app = express();
const tilesDirectory = path.join(__dirname, 'tiles'); // Путь к папке с тайлами

app.use(express.static(tilesDirectory)); // Делаем папку с тайлами доступной как статическое содержимое

app.get('/tiles/:zoom/:x/:y', (req, res) => {
    const { zoom, x, y } = req.params;
    const tilePath = path.join(tilesDirectory, zoom, x, `${y}.png`); // Путь к запрошенному тайлу

    res.sendFile(tilePath);
});

const port = 8000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
