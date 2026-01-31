import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-business-object-dialog-shell',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './business-object-dialog-shell.html',
  styleUrls: ['./business-object-dialog-shell.css']
})
export class BusinessObjectDialogShell {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) submit!: () => void;
  @Input({ required: true }) cancel!: () => void;
}
