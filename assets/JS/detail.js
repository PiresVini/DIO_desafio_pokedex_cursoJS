function geraStatus(status) { // Função que concatena os campos lista de status pokemon
    var status = status.stats
    var campoStrings = []
    for (let i = 0; i < status.length; i++) {
        let liName = status[i].stat.name
        let liValue = status[i].base_stat
        campoStrings += `<li class="liParam">${liName}: ${liValue}</li>
        <div class="progress-container">
            <div class="progress-bar liParam${liName}" style="width: ${liValue}%;"></div>
        </div>`
    }

    return campoStrings
}

function openDetail(n) {  // Função que busca na pokeAPI os dados necessários e concatena no DOM
    const listaDetalhes = document.getElementById('listStatus')
    return fetch(`https://pokeapi.co/api/v2/pokemon/${n}/`)
        .then((response) => response.json())
        .then((responseBody) => geraStatus(responseBody))
        .then((responseList) => responseList)
        .then((resposta) => {
            console.log(resposta)
            listaDetalhes.innerHTML = resposta
        }).catch((error) => (console.error(error)))

}
