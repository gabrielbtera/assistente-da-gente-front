import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { WebsocketService } from './services/websocket.service';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), WebsocketService],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
