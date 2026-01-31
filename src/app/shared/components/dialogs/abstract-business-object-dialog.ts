import { inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StringUtil } from '../../../services/string-util';

export abstract class AbstractBusinessObjectDialog<TPayload> {

  protected fb = inject(FormBuilder);
  protected dialogRef = inject(MatDialogRef<any>);
  protected stringUtil = inject(StringUtil);

  protected form!: FormGroup;

  submit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.buildPayload());
  }

  cancel(): void {
    this.dialogRef.close();
  }

  /** Chaque dialog construit son payload */
  protected abstract buildPayload(): TPayload;
}
