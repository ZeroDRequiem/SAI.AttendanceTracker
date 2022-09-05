import { Style } from "../../enums";

export interface AlertDialogData {
  title: string;
  description: string;
  confirmText: string;
  confirmStyle: Style;
}
