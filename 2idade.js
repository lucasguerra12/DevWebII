const leitor = require("readline");

const terminal = leitor.createInterface({
    input: process.stdin,
    output: process.stdout
});
let contador = {
    crianca: 0,
    adolescente: 0,
    adulto: 0,
    idoso: 0
};
function classificarIdade() {
    terminal.question("Digite a idade da pessoa: ", (entrada) => {
        let idade = parseInt(entrada);

        if (isNaN(idade) || idade < 0) {
            console.log("Idade inválida. Digite um número válido.\n");
            classificarIdade();
            return;
        }
        if (idade <= 12) {
            contador.crianca++;
            console.log("Faixa etária: Criança\n");
        } else if (idade <= 17) {
            contador.adolescente++;
            console.log("Faixa etária: Adolescente\n");
        } else if (idade <= 59) {
            contador.adulto++;
            console.log("Faixa etária: Adulto\n");
        } else {
            contador.idoso++;
            console.log("Faixa etária: Idoso\n");
        }
        perguntarNovamente();
    });
}
function perguntarNovamente() {
    terminal.question("Deseja classificar outra pessoa? (s/n): ", (resposta) => {
        if (resposta.toLowerCase() === "s") {
            classificarIdade();
        } else {
            console.log("\nResumo das faixas etárias:");
            console.log(` Crianças: ${contador.crianca}`);
            console.log(` Adolescentes: ${contador.adolescente}`);
            console.log(` Adultos: ${contador.adulto}`);
            console.log(` Idosos: ${contador.idoso}`);
            console.log("\nObrigado por usar o programa!");
            terminal.close();
        }
    });
}
classificarIdade();
