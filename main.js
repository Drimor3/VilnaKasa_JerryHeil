window.onload = () => {
    let app = new PIXI.Application({
        width: 800,
        height: 1050
    })

    let speedX = 0;
    let i =0;

    const arrowleft = new PIXI.Graphics();
    const arrowright = new PIXI.Graphics();

    let arrowLeftN =[100, 525, 200, 420, 200, 480, 380, 480, 380, 585, 200, 585, 200, 645]
    arrowleft.lineStyle(2, 0xFEEB77, 1);
    arrowleft.beginFill(0x650A5A, 1);
    arrowleft.drawPolygon(arrowLeftN);
    arrowleft.endFill();

    let arrowRightN =[700, 525, 600, 420, 600, 482, 420, 480, 420, 585, 600, 585, 600, 645]
    arrowright.lineStyle(2, 0xFEEB77, 1);
    arrowright.beginFill(0x650A5A, 1);
    arrowright.drawPolygon(arrowRightN);
    arrowright.endFill();

    arrowleft.interactive = true;
    arrowleft.buttonMode = true;

    arrowright.interactive = true;
    arrowright.buttonMode = true;

    arrowleft.on('touchstart', moveL);
    arrowleft.on('touchend', moveLS);

    arrowright.on('touchstart', moveR);
    arrowright.on('touchend', moveRS);

    function moveL(){
        speedX = -3;
    }

    function moveLS(){
        speedX = 0;
    }
    function moveR(){
        speedX = 3;
    }

    function moveRS(){
        speedX = 0;
    }

    let squareArr = [];
    let numbersY = [];
    let numbersX = [];

    let ticker = PIXI.Ticker.shared;
    ticker.autoStart = false;
    ticker.stop();
    ticker.start();

    let PW = PIXI.Sprite.from('wall left.png');
    PW.height = 15;
    PW.width = 100;
    PW.position.x = 350;
    PW.position.y = 30;

    let EW = PIXI.Sprite.from('right wall.png');
    EW.height = 15;
    EW.width = 100;
    EW.position.x = 350;
    EW.position.y = 1020;


    const GC = new PIXI.Container();

    document.body.appendChild(app.view)

    GC.addChild(arrowleft, arrowright, PW, EW);
    app.stage.addChild(GC)

    function createSquare() {
        let square = PIXI.Sprite.from('square.png');
        squareArr.push(square)
        square.height = 40;
        square.width = 40;
        square.position.x = 380;
        square.position.y = 510;
        app.stage.addChild(square);

        let arrmove = [-2, 2, 3, -3 , 2.1, -2.1];
        let movesquareY = arrmove[Math.floor(Math.random() * (arrmove.length))];
        numbersY.unshift(movesquareY)
        let arrmove2 = [-1, 1, 2, -2];
        let movesquareX = arrmove2[Math.floor(Math.random() * (arrmove2.length))];
        numbersX.unshift(movesquareX)
        ticker.add(() => {
            square.position.x += numbersX[0]
            square.position.y += numbersY[0]
            // EW.position.x = square.position.x - 17.5
        })
    }

    createSquare()

//21 ???? ?? ????????
    ticker.add(() => {
        squareArr.forEach((square, i)=>{
            if(square.position.y < -40 || square.position.y > 1090){
                squareArr.splice(i, 1)
                app.stage.removeChild(square);
                createSquare();
            }
        })
    })
    //rickoshet
    ticker.add(()=>{
        if(squareArr[0].position.x < 0 || squareArr[0].position.x > 760){
            numbersX[0] *= -1
        }
    })

    //move it move it
    document.addEventListener('keydown', (e)=>{
        switch (e.keyCode){
            case 37: speedX = -3
                break

            case 39: speedX = 3
                break
        }

    })

 // move it move it stop
    document.addEventListener('keyup', (e)=>{
        switch (e.keyCode){
            case 37: speedX = 0
                break
            case 39: speedX = 0
                break
        }
    })

    document.addEventListener('keydown', (e)=>{
        switch (e.keyCode){
            case 65: speedX = -3
                break

            case 68: speedX = 3
                break
        }

    })

 // move it move it stop
    document.addEventListener('keyup', (e)=>{
        switch (e.keyCode){
            case 65: speedX = 0
                break
            case 68: speedX = 0
                break
        }
    })

    //tut move it
    ticker.add(()=>{
        PW.position.x += speedX
        EW.position.x = squareArr[0].position.x
    })

    //pause tipa
    document.addEventListener('keydown', (e)=>{
        switch (e.keyCode){
            case 32:
                if(i === 0){
                ticker.stop()
                i++

            }
            else if(i === 1){
                ticker.start()
                i--
            }
        }

    })
//touch start
    ticker.add(()=>{
        if(EW.position.x + EW.width > squareArr[0].position.x
        &&
        EW.position.y + EW.height > squareArr[0].position.y
        &&
        EW.position.y < squareArr[0].position.y + squareArr[0].width
        &&
        EW.position.x < squareArr[0].position.x + squareArr[0].height){
        console.log('fuck')
        numbersY[0] *= -1
    }

    })

    ticker.add(()=>{
        if(PW.position.x + PW.width > squareArr[0].position.x
            &&
            PW.position.y + PW.height > squareArr[0].position.y
            &&
            PW.position.y < squareArr[0].position.y + squareArr[0].width
            &&
            PW.position.x < squareArr[0].position.x + squareArr[0].height){
            numbersY[0] *= -1
        }

    })
//touch end

    document.addEventListener('keydown', (e)=>{
        switch (e.keyCode){
            case 32:
                console.log(squareArr)
                console.log(numbersY)
                break
        }

    })

    ticker.add(()=>{
        if(PW.position.x < 0){
            PW.position.x = 0
        }
        else if(PW.position.x > 700){
            PW.position.x = 700
        }
    })
}