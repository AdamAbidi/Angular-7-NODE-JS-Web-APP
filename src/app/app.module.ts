import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { InputComponent } from './input/input.component';
import { WebServicesListComponent } from './web-services-list/web-services-list.component';
import { OutputGeneratedComponent } from './output-generated/output-generated.component';
import { OutputExpectedComponent } from './output-expected/output-expected.component';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { DeleteWebServiceComponent } from './delete-web-service/delete-web-service.component';
import { EditAttributeComponent } from './edit-attribute/edit-attribute.component';


@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
