import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VisualComponent } from './visual/visual.component';
import { SettingsComponent } from './settings/settings.component';
 
const routes:Routes = [
  { path: '', component: VisualComponent },
  { path: 'settings', component: SettingsComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
