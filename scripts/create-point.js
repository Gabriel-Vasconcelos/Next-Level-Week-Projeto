
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => { /* Pegando os estados pela API do IBGE*/
        
        for(const state of states){
            
            ufSelect.innerHTML += `<option value = "${state.id}"> ${state.nome}</option>`

        }

    })
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value // Pegando o valor do evento passado - do Select

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then(res => res.json())
    .then(cities => { /* Pegando os estados pela API do IBGE*/
        
        for(const city of cities){
            
            citySelect.innerHTML += `<option value = "${city.id}"> ${city.nome}</option>`

        }

        citySelect.disabled  = false

    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)