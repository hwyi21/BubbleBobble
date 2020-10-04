// 공격할 물풍선 
class Bullet extends GameObject{
    constructor(objectId,container,src,width,height,velX,velY,x,y){
        super(objectId,container,src,width,height,velX,velY,x,y);
    }
    tick(){

        this.x += this.velX;
        this.y += this.velY;
        
        for(var i=0; i<objectManager.objectArray.length; i++){
            var gameObject=objectManager.objectArray[i];

            // 1. 적군과 충돌 체크
            if(gameObject.objectId=="Enemy"){ 
                var result = collisionCheck(this.div, gameObject.div);
                if(result){                     
                    // 화면에서 제거(부모요소에서 제거)
                    this.container.removeChild(this.div);
                    gameObject.container.removeChild(gameObject.div);
    
                    // 배열 명단에서도 제거
                    var index = objectManager.objectArray.indexOf(this.div);
                    objectManager.objectArray.splice(index,1);
                    objectManager.objectArray.splice(i,1); 

                    // 
                    enemyArray.splice(0,1);
                    // 처음 등장한 몬스터가 총알에 맞은 경우 10점 추가
                    myScore+=10;
                    getScore();

                    // 몬스터가 물풍선에 맞았을 경우 
                    // 물풍선에 갇힌 enemy1을 새롭게 생성
                    var enemy1 = new Enemy("Enemy1",container,"./images/enemy-mighta04.png",60,60,0,-1,gameObject.x,gameObject.y);
        
                    objectManager.addObject(enemy1); 
                    // 게임 오버 기능을 위해 제거한 몬스터와 생성된 몬스터의 개수가 일치하는 지 확인하기위해 enemy1Array 배열에 보관
                    enemy1Array.push(enemy1); 
                    
                }

            }
        }
    }
    render(){
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        
    }
}