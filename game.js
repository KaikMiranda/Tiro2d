
const nave = document.getElementById("nave");

const jogo = document.getElementById("jogo");

const pontuacao = document.getElementById("pontuacao");

const vida = document.getElementById("vidas");

let pontos = 0;

let vidas = 3;



nave.style.left = "100px";

nave.style.top = "450px";

let posicaoX = 100;

let posicaoY = 450;

//---------função que pega o teclas do teclado -------\\\\

document.addEventListener("keydown", function(event){

    if (vidas > 0) {

        //------Setas nas 4 direções ----\\\\

        if (event.key === "ArrowRight") {

            posicaoX += 50;

            nave.style.left = posicaoX + "px";

        }else if (event.key === "ArrowLeft") {

            posicaoX -= 50;

            nave.style.left = posicaoX + "px";

        }

        if (event.key === "ArrowUp") {

            posicaoY -= 50;

            nave.style.top = posicaoY + "px";

        }else if(event.key === "ArrowDown") {

            posicaoY += 50;

            nave.style.top = posicaoY + "px";

        }

        //----------------------------------\\\\


        //------- Criação das Tiros ------\\\\

        if (event.key === " ") {

            const tiro = document.createElement("div");

            let BalaY = posicaoY;

            let BalaX = posicaoX;

            tiro.style.left = BalaX + "px";

            tiro.style.top = BalaY + "px";


            //------- Movimento do Tiro ------\\\\

            let intervaloTiro = setInterval(function(){

                BalaY -= 5;

                tiro.style.top = BalaY + "px";


                //------- Verificação de colisão ------\\\\

                const balaRect = tiro.getBoundingClientRect();

                for (let i = 0; i < inimigos.length; i++) {

                    const inimigo = inimigos[i];

                    const inimigoRect =
                        inimigo.element.getBoundingClientRect();


                    if (
                        balaRect.right > inimigoRect.left &&
                        balaRect.left < inimigoRect.right &&
                        balaRect.bottom > inimigoRect.top &&
                        balaRect.top < inimigoRect.bottom
                    ) {

                        tiro.remove();

                        clearInterval(intervaloTiro);

                        inimigo.y = -100;

                        inimigo.element.style.top =
                            inimigo.y + "px";

                        pontos += 1;

                        pontuacao.textContent =
                            "🏆Pontos: " + pontos;

                        break;
                    }
                }


                //------- Remove o tiro quando sair da tela ------\\\\

                if (BalaY < -110) {

                    tiro.remove();

                    clearInterval(intervaloTiro);

                }

                //-----------------------------------------\\\\

            }, 5);


            //-----------------------------------------\\\\


            //------- Tamanho do Tiro ------\\\\

            tiro.style.width = "50px";

            tiro.style.height = "50px";

            tiro.style.backgroundImage =
                'url("sprite/bala.png")';

            tiro.style.backgroundSize = "contain";

            tiro.style.backgroundRepeat = "no-repeat";

            tiro.style.position = "absolute";


            jogo.appendChild(tiro);

        }

        //-----------------------------------------\\\\

    }

})

//-----------------------------------------------\\\\



//-------------------Criação do GameOver----------------------\\\\

const gameOver = document.createElement("div");

gameOver.style.position = "absolute";

gameOver.style.left = "250px";

gameOver.style.top = "250px";

gameOver.style.fontSize = "50px";

gameOver.style.color = "red";

gameOver.style.textAlign = "center";


jogo.appendChild(gameOver);

//-----------------------------------------------\\\\



//-------------------Botão Jogar Novamente----------------------\\\\

const jogarNovamente = document.createElement("button");

jogarNovamente.textContent = "Jogar novamente";

jogarNovamente.style.position = "absolute";

jogarNovamente.style.left = "310px";

jogarNovamente.style.top = "330px";

jogarNovamente.style.fontSize = "20px";

jogarNovamente.style.padding = "10px 20px";

jogarNovamente.style.display = "none";


jogarNovamente.addEventListener("click", function(){

    location.reload();

});

jogo.appendChild(jogarNovamente);

//------------------------------------------------\\\\



//-------------------Criação dos Inimigos----------------------\\\\

let inimigos = [];

for (let i = 0; i < 2; i++) {

    const inimigo = document.createElement("div");

    //------- Posição inicial dos inimigos ------\\\\

    let InimigoY = 50 - (i * 150);

    //---------------------------------------------\\\\


    inimigo.style.left = (100 + i * 150) + "px";

    inimigo.style.top = InimigoY + "px";

    //------- Tamanho do Inimigo ------\\\\

    inimigo.style.width = "70px";

    inimigo.style.height = "70px";

    inimigo.style.position = "absolute";

    inimigo.style.backgroundImage =
        'url("sprite/enemy.png")';

    inimigo.style.backgroundSize = "contain";

    inimigo.style.backgroundRepeat = "no-repeat";


    jogo.appendChild(inimigo);


    inimigos.push({

        element: inimigo,

        y: InimigoY

    });

}

//------------------------------------------------\\\\



//-------------------Movimento dos Inimigos----------------------\\\\

let intervalo = setInterval(function(){

    for (let i = 0; i < inimigos.length; i++) {

        inimigos[i].y += 2;

        inimigos[i].element.style.top =
            inimigos[i].y + "px";


        //------- Verifica se o inimigo chegou ao final ------\\\\

        if (inimigos[i].y > 600) {

            //------- Volta o inimigo para cima ------\\\\

            inimigos[i].y = -100;

            inimigos[i].element.style.top =
                inimigos[i].y + "px";


            //------- Perde uma vida ------\\\\

            vidas -= 1;

            vida.textContent =
                "❤️Vidas: " + vidas;


            //------- Verifica o GameOver ------\\\\

            if (vidas === 0) {

                gameOver.textContent =
                    "GameOver 💀";

                jogarNovamente.style.display =
                    "block";

                clearInterval(intervalo);

            }

        }

    }

}, 5);

//------------------------------------------------\\\\

