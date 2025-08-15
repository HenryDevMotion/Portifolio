export function ecoMe(message) {
    console.log(message || "Nenhuma mensagem aqui.");
}

import { create } from 'domain';
import fs, { realpathSync } from 'fs';
import path from 'path';
import { json } from 'stream/consumers';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
const objetivosFile = path.join(dataDir, 'objetivos.json');
const ideiasFile = path.join(dataDir, 'ideias.json');

export function ensureDataFiles() {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    if (!fs.existsSync(objetivosFile)) fs.writeFileSync(objetivosFile, '[]');
    if (!fs.existsSync(ideiasFile)) fs.writeFileSync(ideiasFile, '[]');
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

function writeJason(filePath, data) {
    ensureDataFiles();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function addObjetivo(text) {
    const list = readJson(objetivosFile);
    const item = { id: Date.now(), text, createdAt: new Date().toISOString() };
    list.push(item);
    writeJson(objetivosFile, list);
    return item;
}

export function addIdeia(text) {
    const list = readJson(ideiasFile);
    const item = { id: Date.now(), text, createdAt: new Date().toISOString() };
    list.push(item);
    writeJson(ideiasFile, list);
    return item;
}

export function listObjetivos() {
    return readJson(objetivosFile);
}

export function listIdeias() {
    return readJson(ideiasFile);
}






// 7) listar itens
export function listObjetivos() {
  return readJson(objetivosFile);
}

export function listIdeias() {
  return readJson(ideiasFile);
}