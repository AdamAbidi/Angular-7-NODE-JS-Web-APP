import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AdamComponent } from '../../adam/adam.component';
import { InputComponent } from '../../input/input.component';
import { WebServicesListComponent } from '../../web-services-list/web-services-list.component';
import { OutputGeneratedComponent } from '../../output-generated/output-generated.component';
import { OutputExpectedComponent } from '../../output-expected/output-expected.component';
import { AddAttributeComponent } from '../../add-attribute/add-attribute.component';
import { DeleteWebServiceComponent } from '../../delete-web-service/delete-web-service.component';
import { EditAttributeComponent } from '../../edit-attribute/edit-attribute.component';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AdamComponent,
    InputComponent,
    WebServicesListComponent,
    OutputGeneratedComponent,
    OutputExpectedComponent,
    AddAttributeComponent,
    DeleteWebServiceComponent,
    EditAttributeComponent,
  ]
})

export class AdminLayoutModule {}
