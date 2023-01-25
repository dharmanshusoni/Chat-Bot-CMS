import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SessionTableComponent } from './session-table/session-table.component';
import { SessionAnalysisComponent } from './session-analysis/session-analysis.component';
import { IntentAnalysisComponent } from './intent-analysis/intent-analysis.component';
import { FormsUserDataComponent } from './forms-user-data/forms-user-data.component';
import { MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatInputModule } from '@angular/material/input'; 

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { TableListComponent } from './table-list/table-list.component';
// import { TypographyComponent } from './typography/typography.component';
// import { IconsComponent } from './icons/icons.component';
// import { MapsComponent } from './maps/maps.component';
// import { NotificationsComponent } from './notifications/notifications.component';
// import { UpgradeComponent } from './upgrade/upgrade.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeComponent,
    SessionTableComponent,
    SessionAnalysisComponent,
    IntentAnalysisComponent,
    FormsUserDataComponent,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
