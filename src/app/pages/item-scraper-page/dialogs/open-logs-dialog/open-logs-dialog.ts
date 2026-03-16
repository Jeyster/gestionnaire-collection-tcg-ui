import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ScrapingService } from '../../../../services/scraping-service';
import { Subject, switchMap, timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-open-logs-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './open-logs-dialog.html',
  styleUrls: [
    './open-logs-dialog.css',
    '../../../../shared/components/dialogs/business-object-dialog-shell/business-object-dialog-shell.css'
  ]
})
export class OpenLogsDialog {

  @Output() stopScraping = new EventEmitter<void>();

  private scrapingService = inject(ScrapingService);
  private dialogRef = inject(MatDialogRef<OpenLogsDialog>);

  logs$ = timer(0, 1000).pipe(
    switchMap(() => this.scrapingService.getLogs())
  );

  protected close() {
    this.dialogRef.close();
  }

  protected stop() {
    this.stopScraping.emit();
  }

}
