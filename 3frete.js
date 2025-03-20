const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function calcularFrete() {
    rl.question("Informe a distância da entrega (km): ", (distancia) => {
        distancia = parseFloat(distancia);

        if (isNaN(distancia) || distancia <= 0) {
            console.log("Distância inválida! Digite um número positivo.\n");
            calcularFrete();
            return;
        }

        rl.question("Informe a quantidade de peças a serem transportadas: ", (quantidade) => {
            quantidade = parseInt(quantidade);

            if (isNaN(quantidade) || quantidade <= 0) {
                console.log("Quantidade inválida! Digite um número válido.\n");
                calcularFrete();
                return;
            }

            perguntarRegiao((valorPorPeca) => {
                aplicarCobranca(valorPorPeca, distancia, quantidade);
            });
        });
    });
}
function perguntarRegiao(callback) {
    rl.question("Informe a região de destino (1-Sudeste, 2-Sul, 3-Centro-Oeste): ", (regiao) => {
        let valorPorPeca;

        switch (regiao) {
            case "1":
                valorPorPeca = 1.20;
                break;
            case "2":
                valorPorPeca = 1.30;
                break;
            case "3":
                valorPorPeca = 1.50;
                break;
            default:
                console.log("Região inválida! Escolha entre 1, 2 ou 3.");
                return perguntarRegiao(callback); 
        }

        callback(valorPorPeca); 
    });
}
function aplicarCobranca(valorPorPeca, distancia, quantidade) {
    let custoPecas;

    if (quantidade <= 1000) {
        custoPecas = quantidade * valorPorPeca;
    } else {
        let precoNormal = 1000 * valorPorPeca;
        let precoDesconto = (quantidade - 1000) * (valorPorPeca * 0.88);
        custoPecas = precoNormal + precoDesconto;
    }

    let custoPorKM = distancia * 1;
    let rastreamentoCusto = 0;

    rl.question("Deseja rastreamento do pedido? (s/n): ", (resposta) => {
        if (resposta.toLowerCase() === "s") {
            rastreamentoCusto = 200.00;
        }

        let totalFrete = custoPecas + custoPorKM + rastreamentoCusto;

        console.log("\n===== Detalhes do Frete =====");
        console.log(`Taxa de rastreamento: R$ ${rastreamentoCusto.toFixed(2)}`);
        console.log(`Custo do frete pelas peças: R$ ${custoPecas.toFixed(2)}`);
        console.log(`Custo do frete por km: R$ ${custoPorKM.toFixed(2)}`);
        console.log(`Total do frete: R$ ${totalFrete.toFixed(2)}`);
        console.log("============================\n");

        perguntarNovoPedido();
    });
}
function perguntarNovoPedido() {
    rl.question("Deseja calcular outro frete? (s/n): ", (resposta) => {
        if (resposta.toLowerCase() === "s") {
            calcularFrete();
        } else {
            console.log("Obrigado por utilizar o sistema de fretes!");
            rl.close();
        }
    });
}
calcularFrete();
