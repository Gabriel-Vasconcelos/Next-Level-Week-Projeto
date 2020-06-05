
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => { /* Pegando os estados pela API do IBGE*/
        
        for(const state of states){
            
            ufSelect.innerHTML += `<option value = "${state.id}"> ${state.nome}</option>` //adicionando os estados

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

    citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then(cities => { /* Pegando os estados pela API do IBGE*/
        

        for(const city of cities){
            
            citySelect.innerHTML += `<option value = "${city.nome}"> ${city.nome}</option>`

        }

        citySelect.disabled  = false

    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de Coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for( let item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
 
    // Adicionar/remover uma classe com JS
    // itemLi.classList.add --> Adiciona a classe
    // itemLi.classList.remove --> Remove a classe
    // itemLi.classList.toggle --> Adiciona ou remove a classe
    itemLi.classList.toggle("selected")


    const itemId = itemLi.dataset.id
    

    // verficar se existem itens seleciondados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    } )

    // se já estiver selecionado, tirar da seleção

    if(alreadySelected >= 0){
        
        const filteredItems = selectedItems.filter( item => {
            //tirar da seleção
            const itemIsDifferent = item != itemId 
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
        //se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)

    }    
    
   


    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
    
    console.log(collectedItems)
}