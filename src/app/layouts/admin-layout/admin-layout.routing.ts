import { Routes } from '@angular/router';

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


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'adam',        component: AdamComponent },
    { path: 'input',        component: InputComponent },
    { path: 'Web_Service_List',        component: WebServicesListComponent },
    { path: 'Output_generated',        component: OutputGeneratedComponent },
    { path: 'Output_expected',        component: OutputExpectedComponent },
    { path: 'add_attribute',        component: AddAttributeComponent},
    { path: 'Delete_Web_Service',        component: DeleteWebServiceComponent},
    { path: 'Edit_Attribute',        component: EditAttributeComponent},


];
