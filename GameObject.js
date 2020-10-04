// 앞으로 게임에 등장하게 될 모든 종류의 오브젝트를 표현하는 객체를 정의한다
class GameObject{
    constructor(objectId,container,src,width,height,velX,velY,x,y){
        this.objectId=objectId; //객체를 구분하기 위한 식별값
        this.container=container;
        this.div= document.createElement("div");
        this.img=document.createElement("img");
        this.src=src;
        this.width=width;
        this.height=height;
        this.velX=velX;
        this.velY=velY;
        this.x=x;
        this.y=y;
        this.g=0.6;
        this.scaleX=1;

        // 스타일 적용
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.position="absolute";
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";

        // 이미지의 크기를 기본적으로 div와 일치시킴...
        this.img.src = this.src;
        this.img.style.width = this.width + "px";
        this.img.style.height = this.height + "px";
        

        // 부모컨테이너에 부착!
        this.div.appendChild(this.img); //div에 이미지 부착!
        this.container.appendChild(this.div);
    }


    tick(){

    }
    
    render(){

    }
}