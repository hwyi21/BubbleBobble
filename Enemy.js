class Enemy extends GameObject{
    constructor(objectId,container,src,width,height,velX,velY,x,y){
        super(objectId,container,src,width,height,velX,velY,x,y);
        this.count=0; //몬스터를 일정 범위 안에서 움직임을 반복하기 위한 변수
        this.colCount=0; //충돌 횟수 누적
    }
    
    tick(){
        this.x+=this.velX; 
        this.y+=this.velY;
        this.count++;

        // 몬스터 움직임 반복
        if(this.count%150==0){
            this.velX=-this.velX;
            this.scaleX=-this.scaleX;
                  
        }
        
        // 맵의 범위 안에서 움직임
        if(this.y<=10){
            this.velY =-this.velY;            
        }
        
        if((this.x+parseInt(this.div.style.width))>=950){
            this.velX=-this.velX;
            this.img.style.transform="scaleX("+this.scaleX+")";
        }
        if(this.x<=60){
            this.velX=-this.velX;
            this.img.style.transform="scaleX("+(-this.scaleX)+")";
            
        }
        if((this.y+parseInt(this.div.style.height))>=590){
            this.velY = -this.velY;
        }

        for(var i=0; i<objectManager.objectArray.length; i++){
            var gameObject=objectManager.objectArray[i];
            // 물풍선에 갇힌 적군의 움직임 제어
            r=r+0.03;
            if(gameObject.objectId=="Enemy1"){
                gameObject.div.style.transform="rotate("+r+"deg)";
            }
              

        }
    }
    render(){
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.img.style.transform="scaleX("+this.scaleX+")";
    }
}