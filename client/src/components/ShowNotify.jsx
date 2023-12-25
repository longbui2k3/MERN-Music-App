import { Alert, AlertIcon } from "@chakra-ui/react";

export function ShowNotify({
  type,
  message,
  className,
  variant,
  link,
  linkUrl,
}) {
  return (
    <Alert status={type} className={className} variant={variant}>
      <AlertIcon />
      <div>
        {message}{" "}
        <a href={linkUrl} className="underline">
          {link}
        </a>
        {link ? "." : ""}
      </div>
    </Alert>
  );
}
