const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularIMC() {
    rl.question("Digite seu peso (kg): ", (peso) => {
        rl.question("Digite sua altura (m): ", (altura) => {
            peso = parseFloat(peso);
            altura = parseFloat(altura);
            
            if (isNaN(peso) || isNaN(altura) || altura <= 0) {
                console.log("Valores inválidos. Tente novamente.\n");
                calcularIMC();
                return;
            }
            
            let imc = peso / (altura * altura);
            let classificacao = "";
            
            if (imc < 16) {
                classificacao = "Baixo peso muito grave";
            } else if (imc >= 16 && imc < 17) {
                classificacao = "Baixo peso grave";
            } else if (imc >= 17 && imc < 18.5) {
                classificacao = "Baixo peso";
            } else if (imc >= 18.5 && imc < 25) {
                classificacao = "Peso normal";
            } else if (imc >= 25 && imc < 30) {
                classificacao = "Sobrepeso";
            } else if (imc >= 30 && imc < 35) {
                classificacao = "Obesidade grau I";
            } else if (imc >= 35 && imc < 40) {
                classificacao = "Obesidade grau II";
            } else {
                classificacao = "Obesidade grau III";
            }
            
            console.log(`\nSeu IMC é: ${imc.toFixed(2)} - ${classificacao}\n`);
            perguntarNovamente();
        });
    });
}

function perguntarNovamente() {
    rl.question("Deseja calcular outro IMC? (s/n): ", (resposta) => {
        if (resposta.toLowerCase() === "s") {
            calcularIMC();
        } else {
            console.log("Obrigado por usar o cálculo de IMC! Até mais.");
            rl.close();
        }
    });
}
calcularIMC();
