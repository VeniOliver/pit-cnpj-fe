import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [
    NgHcaptchaModule,
    MatSnackBarModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaComponent {
  public data = inject(MAT_DIALOG_DATA)
  readonly dialogRef = inject(MatDialogRef<CaptchaComponent>)


  constructor(public http: HttpService, public snackBar: MatSnackBar) {
  }

  public onVerify(token: string) {
    //get data
    this.http.post<any[]>('cnpj/rfb', {
      registration_number: this.data?.cnpj,
      captcha_response: token
    }).subscribe({
      next: (res: any) => {
        this.dialogRef.close(res)
      },
      error: (error) => {
        this.dialogRef.close()
        this.snackBar.open(error?.message, 'Fechar', { duration: 10000 })
      },
    })
  }

  public onExpired(response: any) {
    console.log(response)
    this.snackBar.open('Captcha expirou.', 'Fechar', { duration: 10000 })
  }

  public onError(error: any) {
    console.log(error)
    this.snackBar.open(`Ocorreu um erro: ${error?.message}`, 'Fechar', { duration: 10000 })
  }

}
