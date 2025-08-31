import fs from "fs";
import path from "path";

const dataPath = path.resolve("data/fiis.json");

function loadData() {
    if(!fs.existsSync(dataPath)) {
        return { fiis: [], meta: [] };
    }

    const raw = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(raw);
}

function saveData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
}

export function addFii(nome, quantidade) {
    const data = loadData();

    if (data.fiis.some(f => f.nome.toLowerCase() === nome.toLowerCase())) {
        console.log(`O Fundo ${nome} já existe na sua carteira.`);
        return;
    }
    data.fiis.push({nome, quantidade});
    saveData(data);
    console.log(`Adicionado ${quantidade} em cotas do fundo ${nome}`);
}

export function listFiis() {
     const data = loadData();
     if(data.fiis.length === 0) {
        console.log("Nenhum fundo adicionado.");
        return;
     }

     console.log("Seus FIIS:");
     data.fiis.forEach(f => {
        console.log(`- ${f.nome} | ${f.quantidade} cotas`);
     });
}

export function addMeta(descricao, objetivo) {
    const data = loadData();
    data.metas.push({descricao,objetivo, atingido: false});
    saveData(data);
    console.log(`Meta adicionada: ${descricao} (objetivo: ${objetivo})`);
}

export function listMetas() {
    const data= loadData();
    if (data.metas.length === 0) {
        console.log("Nenhuma meta definida");
        return;
    }

    console.log("Suas metas:");
    data.metas.forEach((m, i) => {
        console.log(`- ${i + 1}, ${m.descricao} | objetivo: ${m.objetivo} | Status: ${m.atingido ? "Concluído" : "Em andamento"}`);
    });
}