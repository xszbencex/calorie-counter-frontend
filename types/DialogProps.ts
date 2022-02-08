export type DialogProps = {
  open: boolean;
  onClose: (data?: any) => void;
  data?: any;
  modifier?: string;
}
