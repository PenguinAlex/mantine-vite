"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
function splitMap() {
    return __awaiter(this, void 0, void 0, function* () {
        function splitIntoTiles(path, zoomLevel) {
            return __awaiter(this, void 0, void 0, function* () {
                const image = (0, sharp_1.default)(path, { limitInputPixels: false });
                const metadata = yield image.metadata();
                const width = metadata.width || 0;
                const height = metadata.height || 0;
                const resizedImage = yield image.resize(Math.floor(width / (2 ** (6 - zoomLevel))), Math.floor(height / (2 ** (6 - zoomLevel))));
                const resizedMetadata = yield resizedImage.metadata();
                const resizedWidth = resizedMetadata.width || 0;
                const resizedHeight = resizedMetadata.height || 0;
                const tileWidth = 256;
                const tileHeight = 256;
                const tilesDir = `tiles/${zoomLevel}`;
                fs_1.default.mkdirSync(tilesDir, { recursive: true });
                for (let x = 0; x < resizedWidth; x += tileWidth) {
                    for (let y = 0; y < resizedHeight; y += tileHeight) {
                        const tile = resizedImage.extract({
                            left: x,
                            top: y,
                            width: tileWidth,
                            height: tileHeight,
                        });
                        const tileDir = `${tilesDir}/${Math.floor(x / tileWidth)}`;
                        fs_1.default.mkdirSync(tileDir, { recursive: true });
                        const tilePath = `${tileDir}/${Math.floor(y / tileHeight)}.png`;
                        yield tile.toFile(tilePath);
                    }
                }
            });
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
    });
}
splitMap();
const app = (0, express_1.default)();
const tilesDirectory = path_1.default.join(__dirname, 'tiles'); // Путь к папке с тайлами
app.use(express_1.default.static(tilesDirectory)); // Делаем папку с тайлами доступной как статическое содержимое
app.get('/tiles/:zoom/:x/:y', (req, res) => {
    const { zoom, x, y } = req.params;
    const tilePath = path_1.default.join(tilesDirectory, zoom, x, `${y}.png`); // Путь к запрошенному тайлу
    res.sendFile(tilePath);
});
const port = 8000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
