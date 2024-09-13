export interface TextInputProps {
  label: string;
  maxlength?: string | number;
  invalid?: boolean;
  errorMessage?: string;
  size?: 'small' | 'large';
  helpTitle?: string;
  helpImg?: string;
  tooltip?: string;
}
