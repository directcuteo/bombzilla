import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './core/state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './core/state/game/game.effects';
import { BombsEffects } from './core/state/bombs/bombs.effects';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    FlexLayoutModule,
    EffectsModule.forRoot([
      GameEffects,
      BombsEffects,
    ]),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {}
