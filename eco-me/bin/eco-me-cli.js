#!/usr/bin/env node

import {
    ensureDataFiles,
    addObjetivo,
    addIdeia,
    listIdeias,
    listObjetivos
} from '../src/eco-me.js';

const args = process.argv.slice(2);

function showHelp() {
    console.log(`
    eco-me - comandos disponíveis:
        
    eco-me add objetivo "texto do objetivo"
    eco-me add ideia "texto da ideia"

    eco-me list objetivos
    eco-me list ideias
    `);
}

function formatItem(item, index) {
    const date = new Date(item.createdAt).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    if (item. tipo) {
        return `${index + 1}. [${item.id}] ${item.text} (${item.tipo}) - ${date}`
    }

    return `${index + 1}. [${item.id}] ${item.text} (${date})`;
}

(async function main() {
    ensureDataFiles();

    const [cmd, tipo, ...rest] = args;

    if (!cmd) {
        showHelp();
        process.exit(0);
    }

    if (cmd === 'add') {
        let prazo = "curto";
        if (rest.length > 1) {
            const possivelPrazo = rest[rest.length - 1].toLowerCase();
            if (["curto", "longo"].includes(possivelPrazo)) {
                prazo = possivelPrazo;
                rest.pop;
            }
        }

        const text = rest.join(' ').trim();

    if (!text) {
        console.log('Você deve informar qual é o texto. Ex.: eco-me add objetivo "Ler 10 páginas por dia do livro X"');
        process.exit(1);
    }

    const isObjetivo = ['objetivo', 'objetivos'].includes(tipo);
    const isIdeia = ['ideia', 'ideias'].includes(tipo);

    if (!isObjetivo && !isIdeia) {
        console.log('Use: eco-me add objetivo "texto" OU eco-me add ideia "texto"');
        process.exit(1);
    }

    if (isObjetivo) {
        const saved = addObjetivo(text, prazo);
        console.log(`Objetivo salvo [${saved.id}] em ${new Date(saved.createdAt).toLocaleString()}: ${saved.text}`);
    } else {
        const saved = addIdeia(text);
        console.log(`Ideia salva [${saved.id}] em ${new Date(saved.createdAt).toLocaleString()}: ${saved.text}`);
    }

    process.exit(0);

}

    if (cmd === 'list') {
        if (tipo === 'objetivos') {
            const list = listObjetivos();

            if (list.length === 0) {
                return console.log('Nenhum objetivo salvo ainda');
            }

            console.log('Objetivos:\n---------\n');
            list.forEach((it, i) => console.log(formatItem(it, i) + "\n"));
            process.exit(0);
        }

        if (tipo === 'ideias') {
            const list = listIdeias();

            if (list.length === 0) {
                return console.log('Nenhuma ideia salva ainda');
            }

            console.log('Ideias:\n');
            list.forEach((it, i) => console.log(formatItem(it, i)));
            process.exit(0);
        }

        console.log('Use: eco-me list objetivos OU eco-me list ideias');
        process.exit(1);
    }

    showHelp();
    process.exit(1);

})();