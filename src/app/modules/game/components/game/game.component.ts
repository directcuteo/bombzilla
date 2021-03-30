import { Component, OnInit } from '@angular/core';
import { Bin } from '../../../../core/types/bins/bin.type';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  bins: Bin[] = [
    { color: 'red' },
    { color: 'blue' },
    { color: 'green' },
  ];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}
