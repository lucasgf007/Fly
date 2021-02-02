// recuperando a altura e largura da pag, para que o jogo nunca saia da dimensão da tela(qd estiver exibindo em outros aparelhos)
    
// logica para manter as info da dimensão da pag smp atualizada
var altura = 0  // var criada fora do escopo da funcion, pois se n ela n poderia medir as diemensões pois ia se limitar somente a funcion
var largura = 0
var vidas = 1
var tempo = 15 // para o cronometro

var criaMosquitoTempo = 1500


var nivel = window.location.search  // recuperando o href da pag selecionada de acordo com o nivel, mas com o search, ele recupera apenas o parametro dado (niel)
nivel = nivel.replace('?', '') // trocando o ? 'vazio'

if(nivel === 'Normal'){
    // 1500 s
    criaMosquitoTempo = 1500
} else if(nivel === 'Hard'){
    // 1000 s
    criaMosquitoTempo = 1000
} else if(nivel === 'mthard'){
// 750 s
    criaMosquitoTempo = 750
}else if(nivel === 'Impossible'){
    // 550 s
    criaMosquitoTempo = 690
}




function ajusteTamanho(){
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(altura, largura)
}
// no body do html vms chamar a funcion pra que ela seja smp atualizada de acordo com o bady
// com o atributo: onresize=""
ajusteTamanho()

// ------------cronometro
var cronometro = setInterval(function(){
    tempo -= 1 // recupera a var tempo e dimnui do seu valor original

    if(tempo < 0){
        clearInterval(cronometro) // vai eliminar a função da memoria, e forçar a parada
        clearInterval(criarMosca)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo // vai atribuir um novo valor a cada repetição para o ID cronometro
                                            //  vai inserir oq vc quiser dentro da <tag>
    }


}, 1000)
// --------------------


// ---movimento randomico----
function posicaoRandomica() { // a função foi criada para ser chamada somente apos a execução do body, para que funcione

    // remover o mosquito anterior (caso exista)
    if(document.getElementById('mosca')){ //if para selecionar se a remoção existe, pois na primeira execução, ele não vai exixtir, pois o cod que faz a mosca exixtir é executado dps
        document.getElementById('mosca').remove()
        
        if(vidas > 3){   // qd atingir o limite dos corações lobira o game over
            window.location.href = 'fim_de_jogo.html'
            

        }else if(vidas <= 3){
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png" // muda a imagam qd ela passar por essa função | concatena com a var vida para poder mudar de imagem
            vidas++
        }
        
    }
    if(document.getElementById('mosca1')){
        document.getElementById('mosca1').remove()
    }



    // vai gerar uma posição aleatória (proém smp dentro dos limites)
    var posicaoY = Math.floor(Math.random() * altura) - 90 //(-90, para dar o desconto do 50px, do tamanho da mosca) multiplica pela altura para gerar um valor dentro dos parametros da altura(da msm forma com a largura)
    var posicaoX = Math.floor(Math.random() * largura) - 90 // Math.floor= vai retirar as casas  decimais apos o ponto

    posicaoX = posicaoX < 0 ? 0 : posicaoX // ajusta a probabilidade de posições negativas
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoY, posicaoX)

    // ----- criando elementos html apartir do js -----

    var mosca = document.createElement('img') // nos permite criar elemetos no html porem do js, atravez do DOM
    mosca.src = 'imagens/mosca.png' // recuperamos a var, e em seguida atribuimos a ela uma imagem
    mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio()//chamando a function que ira escolher de forma aleatoria o estilo | mais um espaço pra não misturar as classes |acessando o estilo desejado | concatenando o lado aleatorio da mosca
    mosca.style.left = posicaoX + 'px'// o style.left, se refere ao lado esquerdo, ent concatenamos a nossa posicaoX ao px da pag, para que possa morver a foto(mosca)
    mosca.style.top = posicaoY + 'px'
    mosca.style.position = 'absolute'
    mosca.id = 'mosca' // ID para a remoção das moscas repetidas
    mosca.onclick = function(){
        this.remove()      //o this. fez referencia ao proprio elemento html que executa a função  |o remove vai remover o a osca clicada
        

        // ----------- esmaga mosca
        var mosca = document.createElement('img')

        mosca.src = 'imagens/mosca_morta.png' 
        mosca.className = 'esmagaMosca' + ' ' +  ladoAleatorio()
        mosca.style.left = posicaoX + 'px'
        mosca.style.top = posicaoY + 'px'
        mosca.style.position = 'absolute'
        mosca.id = 'mosca1'

        document.body.appendChild(mosca)
        // fim do esmaga mosca-------------
    }


    document.body.appendChild(mosca) //inserindo no body do html


}

// ------------ tamanhos randomicos --------------

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3) // valores entre 1 e mt prox de 0, ent multiplica por 3 e tira as casas decimais apos o ponto e em seguida vc terá valores entre 2 e 0

    switch(classe){
        case 0: 
            return 'mosca'// não precisa do break
// pois apos o return ser acionado a function ja eh interrompida, retorna o valor de onde ele foi chaamado

        case 1:
            return 'mosca2'

        case 2:
            return 'mosca3'

    }
}

// -------- crinando um lado aleatorio -------

function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2) // valores entre 1 e mt prox de 0, ent multiplica por 2 e tira as casas decimais apos o ponto e em seguida vc terá valores entre 1 e 0

    switch(classe){
        case 0: 
            return 'ladoA'// não precisa do break
// pois apos o return ser acionado a function ja eh interrompida, retorna o valor de onde ele foi chaamado

        case 1:
            return 'ladoB'


    }
}

