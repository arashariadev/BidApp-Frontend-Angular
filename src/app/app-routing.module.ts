import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '@app/authentication/register/register.component';
import { LoginComponent } from '@app/authentication/login/login.component';
import { EventListComponent } from '@app/dashboard/events/event-list/event-list.component';
import { EventDetailComponent } from '@app/dashboard/events/event-detail/event-detail.component';
import { ProfileComponent } from '@app/dashboard/profile/profile.component';
import { AuthGuardService } from '@app/services/auth-guard.service';
import {PageNotFoundComponent} from '@app/dashboard/page-not-found/page-not-found.component';
import { AdminGuardService } from '@app/services/admin-guard.service';
import { AdminComponent } from '@app/dashboard/admin/admin.component';
import { UserUpdateByAdminComponent } from '@app/dashboard/admin/user-update-by-admin/user-update-by-admin.component';
import { EventCreateComponent } from '@app/dashboard/events/event-create/event-create.component';
import { CanAuctionGuardService } from '@app/services/can-auction-guard.service';

const routes: Routes = [
  {'path':'',redirectTo:'/events',pathMatch:'full'},
  {'path':'register',component:RegisterComponent},
  {'path':'login',component:LoginComponent},
  {'path':'admin',component:AdminComponent,canActivate:[AdminGuardService]},
  {'path':'profile',component:ProfileComponent,canActivate:[AuthGuardService]},
  {'path':'events',component:EventListComponent},
  {'path':'create-event',component:EventCreateComponent,canActivate:[CanAuctionGuardService]},
  {'path':'events/:id',component:EventDetailComponent},
  {'path':'**',component:PageNotFoundComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//all components generated are stored in this array to prevent reimporting of all modules....
//this array is imported in app.modules.ts

export const RoutingComponent=[RegisterComponent,
  LoginComponent,
  EventListComponent,
  EventDetailComponent,
  ProfileComponent,
  PageNotFoundComponent,
  AdminComponent,
  UserUpdateByAdminComponent,
  EventCreateComponent
  ]
