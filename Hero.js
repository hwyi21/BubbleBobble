class Hero extends GameObject{
    constructor(objectId,container,src,width,height,velX,velY,x,y){
        super(objectId,container,src,width,height,velX,velY,x,y);
        this.jump=false;
        
    }

    tick(){
        // 좌우 움직임
        this.x+=this.velX;

        // 중력 적용
        this.velY+=this.g; //가속도 표현
        this.y += this.velY; //방향은 y축으로 함으로써, 중력가속도 표현

        // 주인공의 움직임 범위
        if((this.y+parseInt(this.div.style.height))>=590 && this.jump==false){
            this.velY=0;
            this.y = 590-this.height;
        }
        if(this.velY>0){ //다시 떨어지는 시점..
            this.jump=false;
        }
        if((this.x+parseInt(this.div.style.width))>=950){
            this.x = 950-this.width;
        }
        if(this.x<=60){
            this.x = 60;
        }if(this.y<=12){
            this.velY=-this.velY;
        }
        
        for(var i=0;i<objectManager.objectArray.length;i++){
            var gameObject=objectManager.objectArray[i];
            // 벽돌과 충돌 체크 : 배열에 들어있는 요소가 섞여있기 때문에, 객체에 심어 놓은 objectId를 이용하여 구분지은 후, 벽돌위에 서있게 처리
            if(gameObject.objectId=="Block"){
                var onBlock = collisionCheck(this.div,gameObject.div);

                if(onBlock && this.jump==false){ //벽돌과 마주쳤을 때 주인공의 위치
                    this.velY=0;
                    this.y=gameObject.y-this.height;    
                }

                if(this.velY>0){ //다시 떨어지는 시점..
                    this.jump=false;
                }
            }

            // 물풍선에 갇힌 적군과 충돌 체크 : 부딪친경우 20점 추가 / 아이템 등장
            if(gameObject.objectId=="Enemy1"){
                var result = collisionCheck(this.div, gameObject.div);
                if(result){                     
                    gameObject.container.removeChild(gameObject.div);

                    // 배열 명단에서도 제거
                    objectManager.objectArray.splice(i,1); 

                    enemyCount++; //제거한 적군 숫자 누적

                    // 점수 추가
                    myScore += 20;
                    getScore();

                    // 아이템 생성
                    var item = new Item("Item",container, itemImg[getRandom(0,2)],50,50,0,0,gameObject.x+30,gameObject.y-30);
                    objectManager.addObject(item);
    
                }

            }

            // 아이템과 충돌 체크
            if(gameObject.objectId=="Item"){
                var result = collisionCheck(this.div, gameObject.div);
                if(result){ 
                    
                    // 화면에서 제거(부모요소에서 제거) 
                    gameObject.container.removeChild(gameObject.div);

                    // 배열 명단에서도 제거
                    objectManager.objectArray.splice(i,1);
                    
                    if(gameObject.src==itemImg[0]){
                        myScore+=30;
                        getScore();
                    }else if(gameObject.src==itemImg[1]){
                        myScore+=50;
                        getScore();
                    }else if(gameObject.src==itemImg[2]){
                        myScore+=100;
                        getScore();
                    }
                    
                    
                }

            }
           
            // 게임 실행 시 생성된 적군과 부딪힌 경우 생명감소
            // 생명이 0이 되면 게임 오버
            if(gameObject.objectId=="Enemy"){
                var result = collisionCheck(this.div, gameObject.div);
                if(result){
                    gameObject.colCount+=1; // 충돌 횟수 누적
                    if(gameObject.colCount==3){
                        lifeCount.removeChild(life[0]);
                        life.splice(0,1);
                    }   
                }else{
                    gameObject.colCount=0;
                } 
                                
                if(life.length==0){
                    loopFlag=false;
                    var div = document.createElement("div");
                    div.style.position="absolute";
                    div.style.width=220+"px";
                    div.style.height=220+"px";
                    div.style.left=430+"px";
                    div.style.top=200+"px";
                    div.style.fontSize=30+"pt";
                    div.style.color="white";
                    div.innerHTML="GAME OVER";
                    container.appendChild(div);

                }
            }

        }
        
    }
    
    render(){
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.img.style.transform="scaleX("+this.scaleX+")";
    }
}