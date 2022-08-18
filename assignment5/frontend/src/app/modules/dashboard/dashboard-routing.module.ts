import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardResolver } from './dashboard.resolvers';


const routes: Routes = [
  {
    path: 'analytics',  
    component: AnalyticsComponent,
    resolve  : {
      data: DashboardResolver
  }
  },
  {
    path: 'dashboard',
    component: AnalyticsComponent,
    resolve: {
      data: DashboardResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], 
  providers: []
})
export class DashboardRoutingModule { }
