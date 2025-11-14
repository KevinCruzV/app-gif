export interface SearchBarProps {
  value: string;
  onChange: (next: string) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}
