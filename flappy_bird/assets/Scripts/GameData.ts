import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;


export class GameData {
    private static readonly BESTSCORE: string = "BestScore";


    private static _score: number = 0;

    public static addScore(count: number = 1) {
        this._score += count;
    }

    public static getScore(): number {
        return this._score;
    }

    public static resetScore() {
        this._score = 0;
    }


    public static getBestScore() {
        let score = localStorage.getItem(this.BESTSCORE);
        if (score) {
            return parseInt(score);
        } else {
            return 0;
        }
    }

    public static saveScore() {
        let curScore = this.getScore();
        let bestScore = this.getBestScore();
        if (curScore > bestScore) {

            localStorage.setItem(this.BESTSCORE, curScore.toString());

        }

    }
}


