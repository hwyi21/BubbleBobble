/*
화면에 등장과 소멸될 객체들을 관리
and tick(), render() 까지 알아서 처리
*/

class ObjectManager{
    constructor(){
        // 게임에 등장할 모든 객체를 대상으로 tick() render() 처리하려면 반복문으로 처리 
        //  따라서 객체들은 순서가 있는 배열화
        this.objectArray=[]; //모든 오브젝트가 다 들어갈 예정
        // ex) 총알, 아이템, 주인공, 적군 등등....
    }
    // 화면에 등장할 객체 등록
    addObject(obj){
        this.objectArray.push(obj);
    }
    // 제거될 객체처리
    removeObject(){

    }
    // 게임에 등장하는 모든 객체들에 대한 tick(), render()
    tick(){
        // 모든 오브젝트들을 대상으로 this.tick()
        for(var i=0;i<this.objectArray.length;i++){
            this.objectArray[i].tick();
        }
    }
    render(){
        for(var i=0;i<this.objectArray.length;i++){
            this.objectArray[i].render();
        }
    }
}