import { gerarSenha } from "./src/safe-pass-gen.js";

const args = process.argv.slice(2);

const tamanho = parseInt(args[0]) || 12;

const senha = gerarSenha(tamanho);

console.log(`Sua senha é: ${senha}`);