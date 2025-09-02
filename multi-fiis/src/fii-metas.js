import fs from "fs";
import path from "path";

const dataDir = path.resolve("./data");
const fiiPath = path.join(dataDir, "fiis.json");
const metaPath = path.join(dataDir, "meta.json");

if(!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

function carregarArquivos(filePath) {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function salvarArquivos(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

}

export function addFii(nome, quantidade) {
    const fiis = carregarArquivos(fiiPath);
    fiis.push({ nome, quantidade });
    salvarArquivos(fiiPath, fiis);
    console.log(`Foram adicionadas ${quantidade} cotas do fundo $`);
}

export function listFiis() {
    const fiis = carregarArquivos(fiiPath);
    if (fiis.length === 0) {
        console.log("Nenhum fundo adicionado.");
        return;
    }
    
    console.log("Sua lista de Fundos:");
    fiis.forEach((f, i) => {
        console.log(`- ${i + 1}`)
    })
}

export function addMeta(descricao, objetivo) {
    const metas = carregarArquivos(metaPath);
    metas.push({
        descricao, 
        objetivo, 
        atingido: false
    });
    salvarArquivos(metaPath, metas);
    console.log(`Meta adicionada: "${descricao}" objetivo: "${objetivo}"`);
}

export function listMetas() {
    const metas = carregarArquivos(metasPath);
    if (metas.length === 0) {
        console.log("Nenhuma meta definida");
        return;
    }


console.log("Suas Metas:");
    metas.forEach((m, i) => {
        console.log(
            `- ${i + 1}. ${m.descricao} | objetivo: ${m.objetivo} | Status: ${m.atingido ? "Concluído" : "Em andamento"}`
        );
    });
}