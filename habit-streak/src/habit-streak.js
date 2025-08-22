import fs from "fs";
import path from "path";
import { createDeflate } from "zlib";

const filePath = path.resolve("data", "habits.json");

function loadHabits() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
}

function saveHabits(habits) {
    fs.writeFileSync(filePath, JSON.stringify(habits, null, 2), "utf-8");
}

export function addHabits(nome) {
    const habits = loadHabits();

    const novoHabito = {
        id: Date.now(),
        nome,
        createdeAt: new Date().toISOString(),
        streak: 0,
        lastDone: null
    };

    habits.push(novoHabito);
    saveHabits(habits);

    console.log(`Novo hábito "${nome}" adicionado com sucesso.`)
}

