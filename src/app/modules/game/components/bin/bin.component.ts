import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Bin } from '../../../../core/types/bins/bin.type';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinComponent implements OnInit {

  @Input() bin: Bin;

  constructor() { }

  ngOnInit(): void {
  }

}
