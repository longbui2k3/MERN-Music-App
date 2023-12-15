import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export function ShowNotify({ type, message, className }) {
  return (
    <Alert status={type} className={className}>
      <AlertIcon />
      {message}
    </Alert>
  );
}
