import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

import { TodoListService } from "./todo-list.service";
import {HttpModule} from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import {CdkTableModule} from '@angular/cdk/table';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DateAdapter, NativeDateAdapter} from '@angular/material';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import { TaskModalComponent, TaskModalComponentForm } from './task-modal/task-modal.component';
import { TaskModalModificationComponent } from './task-modal-modification/task-modal-modification.component';

const appRoutes: Routes = [
  {
    path: 'lists',
    // canActivate: [AuthService],
    component: ListsComponent,
    data: { /*title: ''*/ }
  }
];

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})

export class PlunkerMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    ListsComponent,
    TaskModalComponent,
    TaskModalComponentForm,
    TaskModalModificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    PlunkerMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true} )
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent, TaskModalComponent, TaskModalComponentForm]
})
export class AppModule {
  constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('fr-FR');
  }
}
