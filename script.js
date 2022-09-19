window.onload = ( () =>{

    let arrmove = [-2, 2];
    let movesquareY = arrmove[Math.floor(Math.random()*(arrmove.length))];
    let arrmove2 = [-1, 1];
    let movesquareX = arrmove2[Math.floor(Math.random()*(arrmove2.length))];
    let speedWall = 3;
    let sppedBallX = 4;
    let sppedBallY = 4;
    let speedsquare = 5;
    let moveit = false;
    let i = 0;
    let ii = 0;
    let iii = 0;
    const screenWidth = 700;
    const screenHeight = 400;
    let sqplace = [];

    let ticker = PIXI.Ticker.shared;
    ticker.autoStart = false;
    ticker.stop();
    ticker.start();

    let app = new PIXI.Application({
        width: screenWidth,
        height: screenHeight,
        margin: 0,
        padding: 0
    })
    document.body.appendChild(app.view)

    let wallLeft = new PIXI.Sprite.from('wall left.png')
    wallLeft.height = 100;
    wallLeft.width = 20;
    wallLeft.position.x = 10;
    wallLeft.position.y = (screenHeight / 2) - (wallLeft.height / 2);

    let wallRight = new PIXI.Sprite.from('right wall.png')
    wallRight.height = 100;
    wallRight.width = 20;
    wallRight.position.x = screenWidth - wallRight.width - 10 ;
    wallRight.position.y = screenHeight / 2;

    const gameContainer = new PIXI.Container();
    gameContainer.addChild(wallLeft, wallRight)
    app.stage.addChild(gameContainer)

    function createsquar(){
        let square = new PIXI.Sprite.from('square.png')
        sqplace.push(square)
        square.height = 30;
        square.width = 30;
        gameContainer.addChild(square)
        square.position.x = screenWidth / 2;
        square.position.y = screenHeight / 2;
            ticker.add(()=>{
                sqplace[0].position.x -= speedsquare * movesquareX;
                sqplace[0].position.y += movesquareY;
            })

    }

    createsquar()

    ticker.add(()=>{
        sqplace.forEach((square, a)=>{
            if(square.position.x < 0 - square.width){
                sqplace.splice(a, 1)
                gameContainer.removeChild(square)
                createsquar();
            }
        })

    })

    document.addEventListener('touchend', (george) =>{
            if(i === 0){
                ticker.add(()=>{
                    wallLeft.position.y += sppedBallY;
                })
                i++
            }
            else if(i > 0){
                ticker.add(()=>{
                    wallLeft.position.y -= (sppedBallY * 2);
                })
                i -=2
            }
            else if (i<0){
                ticker.add(()=>{
                    wallLeft.position.y += (sppedBallY * 2);
                })
                i +=2
            }

    })

    // тікер начала move it move it квадрата, і його зміна швидкості при ударяння в стенкі
    ticker.add(()=>{

    if(wallLeft.position.x + wallLeft.width > sqplace[0].position.x
        &&
        wallLeft.position.y + wallLeft.height > sqplace[0].position.y
        &&
        wallLeft.position.y < sqplace[0].position.y + sqplace[0].width
        &&
        wallLeft.position.x < sqplace[0].position.x + sqplace[0].height)
    {
        ticker.add(()=>{
            sqplace[0].position.x += speedsquare * 2
        })
    }
    else if(wallRight.position.x + wallRight.width > sqplace[0].position.x
        &&
        wallRight.position.y + wallRight.height > sqplace[0].position.y
        &&
        wallRight.position.y < sqplace[0].position.y + sqplace[0].width
        &&
        wallRight.position.x < sqplace[0].position.x + sqplace[0].height
    ){
        ticker.add(()=>{
            sqplace[0].position.x -= speedsquare * 2
        })
    }
    })

    ticker.add(()=>{
        wallRight.position.y = sqplace[0].position.y
        if(sqplace[0].position.y > screenHeight - sqplace[0].height){
            movesquareY = 0
            ticker.add(()=>{
                sqplace[0].position.y -= 2
            })
        }
        else if(sqplace[0].position.y < 0){
            movesquareY = 0
            ticker.add(()=>{
                sqplace[0].position.y += 2
            })

        }
    })

})
