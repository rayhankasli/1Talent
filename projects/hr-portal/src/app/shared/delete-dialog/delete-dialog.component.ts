/**
 * @author - Bhumi Desai
 * @createdDate 03-04-2019
 * @description - This file is used to close and delete dialog box.
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

/**
 * This component file is use to close and delete dialog box.
 */

@Component({
  selector: 'one-talent-delete-dialog',
  styleUrls: ['./delete-dialog.component.scss'],
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {
  /** message of the modal */
  public modelMessangeText:string;
  constructor (
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { 
      this.modelMessangeText = data;
    }

  /**
   * closeDeleteDialog close delete dialog box
   * @author: Bhumi Desai
   * @created date: 05/04/2019
   */
  public closeDeleteDialog (): void {
    this.dialogRef.close({ data: false });

  }
  /**
   * deleteData delete data
   * @author: Bhumi Desai
   * @created date: 05/04/2019
   */
  public deleteData (): void {
    this.dialogRef.close({ data: true });
  }

}
