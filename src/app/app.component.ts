import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog} from '@angular/material/dialog';
import { CaptchaComponent } from './captcha/captcha.component'
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMaskDirective,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})

export class AppComponent {
  public cnpj = new FormControl('', [Validators.required])
  public response!: any
  public origin!: string
  public dialog = inject(MatDialog)

  constructor(public http: HttpService, public snackBar: MatSnackBar) {
  }

  public find(): any {
    this.response = null
    if (!this.cnpj.value || this.cnpj.value == '') return this.snackBar.open('Por favor, informe um CNPJ.', 'Fechar', { duration: 10000 })
    this.http.get<any[]>(`cnpj/${this.cnpj.value}`).subscribe({
      next: (res: any) => {
        if (res?.captcha) return this.openCaptcha(res.captcha)
        this.response = res
        this.origin = 'Consulta salva no Banco de Dados'
      },
      error: (error) => {
        this.snackBar.open(error?.message, 'Fechar', { duration: 10000 })
      },
    })
  }

  public openCaptcha(captcha: any) {
    let dialog = this.dialog.open(CaptchaComponent, {
      disableClose: true,
      data: {
        cnpj: this.cnpj?.value,
        captcha: captcha
      }
    })
    dialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.response = result
        this.origin = 'Receita Federal do Brasil - RFB'
      }
    })
  }
}
