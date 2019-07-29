import { PasswordDialogComponent } from '../components/dialogs/password-dialog/password-dialog.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { RoomService } from './room.service';
import { ConfirmDialogComponent } from '../components/dialogs/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog, private roomService: RoomService) {}

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30rem'
    });

    return dialogRef.afterClosed().pipe(
      map(userAnswer => {
        if (userAnswer) {
          return true;
        }

        return false;
      })
    );
  }

  passwordValidationDialog(roomKey: string) {
    return this.validatePassword(roomKey);
  }

  validatePassword(roomKey: string): Observable<boolean> {
    return this.openPasswordDialog().pipe(
      switchMap(userInput => {
        return this.roomService.getRoomPassword(roomKey).pipe(
          map(password => {
            if (userInput === password) {
              return true;
            }

            return false;
          })
        );
      })
    );
  }

  openPasswordDialog() {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '30rem'
    });

    return dialogRef.afterClosed();
  }
}
