#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

console.log("Bem-vindo ao BriefMe! Vamos criar seu briefing...\n");

inquirer
  .prompt([
    {
      type: 'input',
      name: 'nomeProjeto',
      message: 'Qual é o nome do projeto?',
    },
    {
      type: 'input',
      name: 'objetivo',
      message: 'Qual é o objetivo principal do projeto?',
    },
    {
      type: 'input',
      name: 'publicoAlvo',
      message: 'Quem é o público-alvo?',
    },
    {
      type: 'input',
      name: 'funcionalidades',
      message: 'Liste as funcionalidades desejadas (separadas por vírgula)',
    },
    {
      type: 'input',
      name: 'tecnologias',
      message: 'Quais tecnologias você gostaria de usar?',
    },
    {
      type: 'input',
      name: 'prazo',
      message: 'Qual é o prazo estimado para entrega?',
    },
    {
      type: 'input',
      name: 'observacoes',
      message: 'Alguma observação adicional?',
    },
  ])
  .then((respostas) => {
    const dataAtual = new Date().toISOString().replace(/[:.]/g, '-');
    const nomeArquivo = `briefing-${respostas.nomeProjeto.replace(/\s+/g, '_')}-${dataAtual}.txt`;

    const conteudo = `

Nome do Projeto: ${respostas.nomeProjeto}

Objetivo:
${respostas.objetivo}

Público-Alvo:
${respostas.publicoAlvo}

Funcionalidades:
${respostas.funcionalidades}

Tecnologias Desejadas:
${respostas.tecnologias}

Prazo Estimado:
${respostas.prazo}

Observações:
${respostas.observacoes}

Criado com BriefMe
`;

    const pastaDestino = path.join(__dirname, 'briefings');
    if (!fs.existsSync(pastaDestino)) {
      fs.mkdirSync(pastaDestino);
    }

    fs.writeFileSync(path.join(pastaDestino, nomeArquivo), conteudo.trim());

    console.log(`\nBriefing salvo com sucesso em: ./briefings/${nomeArquivo}`);
  });
