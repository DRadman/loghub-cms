import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { APP_INITIALIZER, isDevMode } from '@angular/core';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appEfects, appReducers } from './core/state/app.state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './core/state/auth/auth.reducer';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    provideClientHydration(),
    {
        provide: APP_INITIALIZER,
        useFactory: () => {
            inject({ mode: isDevMode() ? 'development' : 'production' });
            injectSpeedInsights();
        },
    },
    provideAnimations(),
    TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        },
    }).providers!,
    provideStore({auth: authReducer}),
    provideEffects(appEfects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
