let texto = document.getElementById("texto")
const botao = document.getElementById("adicionar")
const lista = document.getElementById("lista")

botao.addEventListener("click",criarLista)
texto.addEventListener("keydown",funcaoEnter)
window.addEventListener("load", carregarTarefas)

function funcaoEnter(tecla){
    if(tecla.key === "Enter"){
        tecla.preventDefault()
        criarLista()
    }
}

function criarLista(){

    //Impedindo tarefa vazia

if(tarefaVazia(texto.value)){
    return
 }   

    //Impedindo tarefas iguais

if(tarefaIguais(texto.value)){
    return
}

    //Primeira letra maiuscula

let textoValue = formatarTexto(texto.value)

    //Adicionando tarefa

adicionarTarefa(textoValue)
}

function tarefaVazia(valor){
if(valor.trim() === ""){
    window.alert("Digite uma tarefa!")
    texto.value = ""
    texto.focus()
    return true
}
    return false

    }

function tarefaIguais(valor){

    let tarefas = document.getElementsByClassName("tarefa")

for(let i=0;i<tarefas.length;i++){

    let textoExistente = tarefas[i]
        .querySelector("span")
        .innerText
        .trim()
        .toLowerCase()

    let checarTexto = valor
        .toLowerCase()
        .trim()

    if(textoExistente === checarTexto){
        window.alert("Essa tarefa ja existe!")
        texto.value = ""
        texto.focus()
        return true
    }
    }
        return false     
}

function formatarTexto(valor){
    valor = valor.trim()

    return valor.charAt(0).toUpperCase() + valor.slice(1)
}

function adicionarTarefa(valor, concluida = false, salvar = true){

    const li = document.createElement("li")
    li.classList.add("tarefa")

    let span = document.createElement("span")
    span.append(valor) 

    if(concluida){
        span.style.textDecoration = "line-through"
    }

    const botaoApagar = document.createElement("button")
    botaoApagar.textContent = "Apagar"

    const botaoConcluir = document.createElement("button")
    botaoConcluir.textContent = "Concluir"

    botaoApagar.addEventListener("click",removerTarefa)
    botaoConcluir.addEventListener("click",concluirTarefa)

    li.append(span, botaoApagar, botaoConcluir)
    lista.append (li)

    if(salvar){
    salvarTarefas()}

    texto.value = ""
    texto.focus()
}
function removerTarefa(){
    this.parentElement.remove()
    salvarTarefas()
}

function concluirTarefa(){
    let tarefa = this.parentElement.querySelector("span")

    if( tarefa.style.textDecoration === "line-through"){
        tarefa.style.textDecoration = "none"}

    else{ tarefa.style.textDecoration = "line-through"}
    
    salvarTarefas()
}

// Salvando tarefas no Localstorage

function salvarTarefas(){
    let tarefas = []

    let elementos = document.getElementsByClassName("tarefa")

    for(let i = 0; i< elementos.length; i++){

        let span = elementos[i].querySelector("span")

        tarefas.push({
            texto: span.textContent,
            concluida: span.style.textDecoration === "line-through"
        })
    }

    localStorage.setItem("tarefa", JSON.stringify(tarefas))
}
function carregarTarefas(){
    let tarefasSalvas = localStorage.getItem("tarefa")

    if(tarefasSalvas){
        let tarefas = JSON.parse(tarefasSalvas)

    
    for(let i = 0;i<tarefas.length;i++){
        let trf = tarefas[i].texto
        let status = tarefas[i].concluida

        adicionarTarefa(trf,status, false)
        
        
        }    
    }
}
