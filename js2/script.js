function jogador(){
    let jogada = parseInt(prompt());
    return jogada;
}

console.log("Bem Vindo ao Jokenpo!");
let pontuacao = 0;
let ganhou = true;

while (ganhou) {
    console.log("Escolha sua Jogada:");
    console.log("1 - Papel\n2 - Pedra\n3 - Tesoura");

    let bot = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    jogador = jogador();


    switch (bot) {
        case 1:
            console.log("Computador jogou Papel!\n");
            if (jogador == 1){
                console.log("A rodada empatou!");

            } else if(jogador == 2){
                console.log("Voce Perdeu! A sua pontuacao foi de " + pontuacao);
                ganhou = false;
            } else if(jogador == 3){
                console.log("Voce Ganhou!");
                pontuacao += 1;
            }
            break;
        case 2: 
            console.log("Computador jogou Pedra!\n");
            if (jogador == 1){
                console.log("Voce Ganhou!");
                pontuacao += 1;

            } else if(jogador == 2){
                console.log("A rodada empatou!");

            } else if(jogador == 3){
                console.log("Voce Perdeu! A sua pontuacao foi de " + pontuacao);
                ganhou = false;
            }
            break;
        case 3:
            console.log("Computador jogou Tesoura!\n");
            if (jogador == 1){
                console.log("Voce Perdeu! A sua pontuacao foi de " + pontuacao);
                ganhou = false;

            } else if(jogador == 2){
                console.log("Voce Ganhou!");
                pontuacao += 1;

            } else if(jogador == 3){
                console.log("A rodada empatou!");
            }
            break;
            
    }
}



