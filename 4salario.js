const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularSalario() {
    rl.question("Informe o salário mínimo vigente: R$ ", (salarioMinimo) => {
        salarioMinimo = parseFloat(salarioMinimo);
        if (isNaN(salarioMinimo) || salarioMinimo <= 0) {
            console.log("Salário mínimo inválido! Digite um valor positivo.\n");
            return calcularSalario();
        }
        cadastrarFuncionarios(salarioMinimo);
    });
}

function cadastrarFuncionarios(salarioMinimo) {
    function perguntarDados() {
        rl.question("\nInforme o código do funcionário: ", (codigo) => {
            rl.question("Número de horas trabalhadas no mês: ", (horas) => {
                horas = parseFloat(horas);
                if (isNaN(horas) || horas <= 0) {
                    console.log("Horas inválidas! Digite um número positivo.");
                    return perguntarDados();
                }

                rl.question("Turno de trabalho (M - Matutino, V - Vespertino, N - Noturno): ", (turno) => {
                    turno = turno.toUpperCase();
                    if (!["M", "V", "N"].includes(turno)) {
                        console.log("Turno inválido! Escolha entre M, V ou N.");
                        return perguntarDados();
                    }

                    rl.question("Categoria do funcionário (F - Funcionário, G - Gerente): ", (categoria) => {
                        categoria = categoria.toUpperCase();
                        if (!["F", "G"].includes(categoria)) {
                            console.log("Categoria inválida! Escolha F ou G.");
                            return perguntarDados();
                        }

                        // Determinar o valor da hora trabalhada
                        let valorHora = 0;

                        switch (categoria) {
                            case "F": // Funcionário
                                if (turno === "M") valorHora = 0.10 * salarioMinimo;
                                else if (turno === "V") valorHora = 0.15 * salarioMinimo;
                                else if (turno === "N") valorHora = 0.20 * salarioMinimo;
                                break;
                            case "G": // Gerente
                                if (turno === "M") valorHora = 0.30 * salarioMinimo;
                                else if (turno === "V") valorHora = 0.35 * salarioMinimo;
                                else if (turno === "N") valorHora = 0.40 * salarioMinimo;
                                break;
                        }

                        // Cálculo do salário inicial
                        let salarioInicial = valorHora * horas;

                        // Cálculo do auxílio-alimentação
                        let auxilioAlimentacao = 0;
                        if (salarioInicial <= 800) {
                            auxilioAlimentacao = salarioInicial * 0.25;
                        } else if (salarioInicial <= 1200) {
                            auxilioAlimentacao = salarioInicial * 0.20;
                        } else {
                            auxilioAlimentacao = salarioInicial * 0.15;
                        }

                        // Cálculo do salário final
                        let salarioFinal = salarioInicial + auxilioAlimentacao;

                        // Exibir os resultados
                        console.log("\n===== Resumo da Folha de Pagamento =====");
                        console.log(`Código do funcionário: ${codigo}`);
                        console.log(`Horas trabalhadas: ${horas}`);
                        console.log(`Turno de trabalho: ${turno}`);
                        console.log(`Categoria: ${categoria}`);
                        console.log(`Valor da hora trabalhada: R$ ${valorHora.toFixed(2)}`);
                        console.log(`Salário inicial: R$ ${salarioInicial.toFixed(2)}`);
                        console.log(`Auxílio-alimentação: R$ ${auxilioAlimentacao.toFixed(2)}`);
                        console.log(`Salário final: R$ ${salarioFinal.toFixed(2)}`);
                        console.log("========================================\n");

                        // Perguntar se deseja cadastrar outro funcionário
                        rl.question("Deseja cadastrar outro funcionário? (s/n): ", (resposta) => {
                            if (resposta.toLowerCase() === "s") {
                                perguntarDados();
                            } else {
                                console.log("Encerrando o sistema. Obrigado!");
                                rl.close();
                            }
                        });
                    });
                });
            });
        });
    }

    perguntarDados();
}

calcularSalario();
