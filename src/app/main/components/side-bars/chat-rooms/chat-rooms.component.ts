import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

import { Room } from '../../../models/room.model';

@Component({
  selector: 'app-chat-rooms-bar',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatRoomsComponent {
  @Input() rooms: Room[];
  @Input() user: User;
  @Output() addRoomEmitter: EventEmitter<void> = new EventEmitter();
  @Output() editRoomEmitter: EventEmitter<Room> = new EventEmitter();
  @Output() deleteRoomEmitter: EventEmitter<string> = new EventEmitter();
  @Output() openRoomEmitter: EventEmitter<Room> = new EventEmitter();

  constructor() {}

  addRoom() {
    this.addRoomEmitter.emit();
  }

  editRoom(room: Room) {
    this.editRoomEmitter.emit(room);
  }

  deleteRoomBy(roomKey) {
    this.deleteRoomEmitter.emit(roomKey);
  }

  open(room: Room): void {
    this.openRoomEmitter.emit(room);
  }
}
