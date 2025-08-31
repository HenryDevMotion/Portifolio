#!/usr/bin/env node

import { addFii, listFiis, addMeta, listMetas } from "./src/fii-metas.js";

const [,, cmd, ...args] = process.argv;

switch (cmd) {
    case "add-fii":
        addFii (args[0], Number([1]) || 0);
        break;
    case "list-fii":
        listFiis ();
        break;
    case "add-meta":
        addMeta (args[0], args[1] || "");
        break;
    case "list-metas":
        listMetas();
        break;
        default:
            console.log(`Comandos disponíveis:
                add-fii <nome> <quantidade>       -> Adiciona um novo fundo
                list-fii                          -> Lista os seus FII's
                add-meta <descrição> <objetivos>  -> Adiciona uma meta 
                list-metas                        -> Lista as metas
                `);      
}