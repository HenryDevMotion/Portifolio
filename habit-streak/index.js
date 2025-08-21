#!/usr/bin/env node

import { addHabit, listHabit, markDone } from "./src/habit-streak.js";

const [,, comand, ...args] = process.argv;

switch (comand) {
    case "add":
        addHabit(args.join(" "));
        break;
    case "list":
        listHabit();
        break;
    case "done":
        markDone(args.join(" "));
        break;
    default:

    console.log("Comandos disponíveis: add, list, done")
}