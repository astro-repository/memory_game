const game = document.querySelector('#game')

let board = []
let player = 1
board = generateBoardArray(3)

/**
 * @description : genère un tableau de 2 dimension initialisé de zéro
 * @param {Integer} number 
 * @returns {Array}
 */
function generateBoardArray (number) {
    const arr = new Array(number).fill([])
    const zero = new Array(number).fill(0)

    for (let i = 0; i < number; i++)
        arr[i] = [...zero]

    return [...arr]
}
/**
 * @description : renvoie un nombre aléatoire compris entre min et max
 * @param {Integer} min 
 * @param {Integer} max 
 * @returns {Integer} random
 */
const rand = (min, max) => Math.floor(Math.random() * max + min)
/**
 * @description : renvoie un tableau aleatoire de n dimension
 * @param {Array} arr 
 * @returns {Array} tab
 */
const generateTab = (arr) => {

    arr.forEach(v => {
        a = rand(0, arr.length)
        b = rand(0, arr.length)

        while (arr[a][b] === 1){
            a = rand(0, arr.length)
            b = rand(0, arr.length)
        }
        arr[a][b] = 1
    })

    return arr
}

var player_click = 0

/**
 * @description: supprime tout les éléments contenu dans la div#id
 */
const cleanBoard = () => {
    while (game.firstChild)
        game.removeChild(game.firstChild)
}
/**
 * @description : permet de verifié que deux tableau de dimension 2 sont egales
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @return boolean
 */
const equals = (arr1, arr2) => {
    try {
        for (let i = 0; i < arr1.length; i++)
            for (let j = 0; j < arr1[i].length; j++)
                if (arr1[i][j] !== arr2[i][j])
                    return false

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

/**
 * @description: génère l'interface de jeu
 * @param {Array} board 
 */
const generateBoard = (board) => {
    cleanBoard(board)

    board.forEach((line, lineIndex) => {
        const lineDiv = document.createElement('div')

        lineDiv.classList.add('line')
        game.appendChild(lineDiv)

        line.forEach((value, squareIndex) => {

            const square = document.createElement('div')

            square.classList.add('square')
            square.dataset.state = value
            lineDiv.appendChild(square)

            
            square.addEventListener('click', () => {
                if (value !== 0) return

                player_click++
                board[lineIndex][squareIndex] = player
                generateBoard(board)
            })
            square.addEventListener('dblclick', () => {
                if (value !== 0) return
                
                board[lineIndex][squareIndex] = 2

                generateBoard(board)

                board = generateBoardArray(n)
            })
        })
        let ligne = document.querySelectorAll('.line')
        ligne.forEach((v, index) => {
            v.setAttribute('style', `height: ${(100/n)*1}%`)

            for (let j = 0; j < v.children.length; j++) {
                v.children[j].addEventListener('click', (function(i, j) {
        
                    return async () => {
                        player_choice[i][j] = 1
                        if (player_click === board.length && equals(player_choice, tab)){
                            generateBoard(board)
                            n++
                            player_click = 0
                            game.setAttribute('style', `width: ${(n*100)/10}%; height: ${(n*100)/10}%`)
                            tab = generateTab(generateBoardArray(n))

                            await setTimeout(() => {
                                generateBoard(generateBoardArray(n))
                                bot(tab)
                            }, 1000);
                        }
                        else if (player_click === board.length){
                            newGame = generateBoardArray(n)
                            player_choice = [...newGame]
                            /**
                             * @todo : Régénerer un nouveau tableau (tab)
                             */
                            generateBoard([...newGame])
                            bot(tab)
                        }
                        else if (player_click > board.length)
                            player_click = 1
                    };

                })(index, j));
            }
        })
    });
}
var n = 3

let tab = []
tab = generateTab(generateBoardArray(n))
generateBoard(generateBoardArray(n))

ligne = document.querySelectorAll('.line')

var player_choice = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

const detect = async (i, ind, time) => {

    await setTimeout(() => {

        ligne = document.querySelectorAll('.line')
        ligne[i].children[ind].dispatchEvent(new MouseEvent('dblclick'))
        player_click = 0
        player_choice = generateBoardArray(n)

    }, time);

    await setTimeout(() => {

        generateBoard(generateBoardArray(n))

    }, time+700);

}

const bot = (tab) => {
    time = 1000
    tab.forEach((v, i) => {

        v.forEach((val, ind) => {
            if (val === 1) {
                detect(i, ind, time)
                time += 1700
            }
        })
    })
}

bot(tab)
