const elementForm = document.querySelector('.block-nova-transacao form');
elementForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!elementForm.checkValidity()) {
        alert("Preencha todos os tados da Operacao");
        return;
    }
    const inputTipoTransacao = elementForm.querySelector("#tipoTransacao");
    const inputValor = elementForm.querySelector("#valor");
    const inputData = elementForm.querySelector("#data");
    let tipoTransacao = inputTipoTransacao.value;
    let valor = Number(inputValor.valueAsNumber);
    let data = new Date(inputData.value);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data,
    };
    elementForm.reset();
});
export {};
