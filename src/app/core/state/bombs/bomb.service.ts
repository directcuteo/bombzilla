import { Injectable } from '@angular/core';
import { Bomb } from '../../types/bombs/bomb.type';
import { Game } from '../../types/game/game.type';

@Injectable({ providedIn: 'root' })
export class BombService {

  constructor() { }

  plantNewBomb(game: Game): Bomb {
    return {
      id: BombService.getRandomInteger(),
      lifetime: BombService.getRandomInteger(6, 11),
      color: ['red', 'blue', 'green'][BombService.getRandomInteger(0, 2)],
      xPosition: BombService.getXPosition(game.bombZoneWidth),
      yPosition: BombService.getYPosition(game.bombZoneHeight)
    } as Bomb;
  }

  private static getXPosition(bombZoneWidth: number): number {
    const bombSize = 80;
    return BombService.getRandomInteger(0, bombZoneWidth - bombSize);
  }

  private static getYPosition(bombZoneHeight: number): number {
    const bombSize = 80;
    return BombService.getRandomInteger(0, bombZoneHeight - bombSize);
  }

  private static getRandomInteger(min: number = 1, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
