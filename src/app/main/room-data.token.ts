import { InjectionToken } from '@angular/core';
import { Room } from './models/room.model';

export const ROOM_DATA = new InjectionToken<Room>('ROOM_DATA');
