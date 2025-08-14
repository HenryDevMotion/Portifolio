export function ecoMe(message) {
    console.log(message || "Nenhuma mensagem aqui.");
}

import fs, { realpathSync } from 'fs';
import path from 'path';
import { json } from 'stream/consumers';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
const objetivosFile = path.join(dataDir, 'objetivos.json');
const ideasFile = path.join(dataDir, 'ideas.json');

export function ensureDataFiles() {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    if (!fs.existsSync(objetivosFile)) fs.writeFileSync(objetivosFile, '[]');
    if (!fs.existsSync(ideasFile)) fs.writeFileSync(ideasFile, '[]');
}

function readJson(filePath) {
    ensureDataFiles();
    const raw = fs.readFileSync(filePath, 'utf-8');
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

functionwriteJason(filePath, data) {
    ensureDataFiles();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function addObjetivo