import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;


export class GameData {


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

}


