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
    const date = new Date(item.createdAt).toLocaleString();
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
        const text = rest.join(' ').trim();

        if (!['objetivo', 'ideia'].includes(tipo)) {
            console.log('Use: eco-me add objetivo "texto" OU eco-me add ideia "texto"');
            process.exit(1);
        }

        if (!text) {
            console.log('Você precisa informar qual é o texto. Exemplo: eco-me add objetivo "Ler 10 páginas do livro X"');
            process.exit(1);
        }

        if (tipo === 'objetivo') {
            const saved = addObjetivo(text);
            console.log(`Objetivo salvo: ${saved.text}`);
        } else {
            const saved = addIdeia(text);
            console.log(`Ideia salva: ${saved.text}`);
        }

        process.exit(0);
    }

    if (cmd === 'list') {
        if (tipo === 'objetivos') {
            const list = listObjetivos();

            if (list.length === 0) {
                return console.log('Nenhum objetivo salvo ainda');
            }

            console.log('Objetivos:\n');
            list.forEach((it, i) => console.log(formatItem(it, i)));
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