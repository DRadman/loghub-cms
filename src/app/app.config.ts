import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_INITIALIZER, isDevMode } from "@angular/core";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        inject({ mode: isDevMode() ? 'development' : 'production' });
        injectSpeedInsights()
      },
    },
  ],
};
