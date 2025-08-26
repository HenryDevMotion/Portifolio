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

export function addHabit(nome) {
    const habits = loadHabits();

    if (habits.some(h => h.nome.toLowerCase() === nome.toLowerCase())) {
        console.log(`O hábito "${nome}" já existe!`);
        return;
    }

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

export function listHabit() {
    const habits = loadHabits();

    if (habits.length === 0) {
        console.log("Nada cadastrado ainda");
        return;
    }

    habits.forEach(h => {
        console.log(`- ${h.nome} | streak: ${h.streak} | última vez ${h.lastDone || "nunca"}`);
    });
}

export function markDone(nome) {
    const habits = loadHabits();

    const habito = habits.find(h => h.nome.toLowerCase() === nome.toLoweCase());

    if (!habito) {
        console.log(`Hábito "${nome}" não encontrado.`);
        return;
    }

    const hoje = new Date().toISOString().slice(0, 10);

    const ultimaVez = habito.lastDone ? habito.lastDone.slice(0, 10) : null;

    if (ultimaVez === hoje) {
        console.log(`Você já marcou o hábito "${nome}" hoje`);
    } else if (ultimaVez === new Date(Date.now() - 86400000).toISOString().slice(0, 10)) {
        habito.streak += 1;
    } else {
        habito.streak = 1;
    }

    habito.lastDone = new Date().toISOString();
    saveHabits(habits);

    console.log(`Hábito "${nome}" foi concluído! Streak atual: ${habito.streak}`);
}