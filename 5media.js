const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function calcularMedia() {
    rl.question("Digite a nota da atividade (peso 2): ", (atividade) => {
        rl.question("Digite a nota da prova (peso 5): ", (prova) => {
            rl.question("Digite a nota do trabalho (peso 3): ", (trabalho) => {
                
                atividade = parseFloat(atividade);
                prova = parseFloat(prova);
                trabalho = parseFloat(trabalho);
                
                if (isNaN(atividade) || isNaN(prova) || isNaN(trabalho)) {
                    console.log("Por favor, insira valores numéricos válidos para as notas.");
                    return calcularMedia();
                }

                const media = ((2 * atividade) + (5 * prova) + (3 * trabalho)) / (2 + 5 + 3);
                let classificacao = "";

                if (media >= 9 && media <= 10) {
                    classificacao = "A";
                } else if (media >= 8 && media < 9) {
                    classificacao = "B";
                } else if (media >= 7 && media < 8) {
                    classificacao = "C";
                } else if (media >= 6 && media < 7) {
                    classificacao = "D";
                } else if (media >= 5 && media < 6) {
                    classificacao = "E";
                } else {
                    classificacao = "F";
                }

                console.log(`A média do aluno é = ${media.toFixed(2)} e sua classificação é ${classificacao}`);
                
                rl.question("Deseja calcular a média de outro aluno? (s/n): ", (resposta) => {
                    if (resposta.toLowerCase() === "s") {
                        calcularMedia();
                    } else {
                        console.log("Encerrando o programa. Obrigado!");
                        rl.close();
                    }
                });
            });
        });
    });
}
calcularMedia();
