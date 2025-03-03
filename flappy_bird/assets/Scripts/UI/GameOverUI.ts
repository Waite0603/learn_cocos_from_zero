import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    private static _instance: GameOverUI = null;
    public static get instance(): GameOverUI {
        return GameOverUI._instance;
    }

    protected onLoad(): void {
        GameOverUI._instance = this;
    }

    @property(Label)
    curScoreLabel: Label = null;
    @property(Label)
    bestScoreLabel: Label = null;

    @property(Node)
    newSprite: Node = null;

    @property([Node])
    medalArray: Node[] = [];

    public show(curScore: number, bestScrore: number) {
        this.node.active = true;
        this.curScoreLabel.string = curScore.toString();
        this.bestScoreLabel.string = bestScrore.toString();
        // if(curScore>bestScrore){
        //     this.newSprite.active = true;
        // }else{
        //     this.newSprite.active = false;
        // }

        // //0-9 
        // const index = curScore/10;//1.2
        // let indexInt = Math.floor(index);
        // if(indexInt>3){
        //     indexInt = 3;
        // }
        // this.medalArray[indexInt].active=true;

    }

    public hide() {
        if (this.node.active == true) {
            this.node.active = false;
        }
    }

    public onPlayButtonClick() {
        console.log('onPlayButtonClick');
        console.log('director:', director);
        director.loadScene('Game');
    }

}


