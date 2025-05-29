import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmacaoDialogData {
  mensagem: string;
}

@Component({
  selector: 'app-dialog-delete',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss',
})
export class DialogDeleteComponent {
   
  
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: ConfirmacaoDialogData
  ) {}

  clickSim(): void {
    this.dialogRef.close(true);
  }

  clickNao(): void {
    this.dialogRef.close(false);
  }
}
