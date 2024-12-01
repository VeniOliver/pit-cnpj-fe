import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask'
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideEnvironmentNgxMask(),
    provideRouter(routes),
    provideAnimationsAsync(),
    ...(NgHcaptchaModule.forRoot().providers || []),
  ],
};
