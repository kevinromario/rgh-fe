import { CloseButton, Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { LightMode } from "./ColorMode";

export function SearchInput({
  value,
  onChange,
  onClear,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <LightMode>
      <InputGroup
        endElement={
          value ? (
            <CloseButton
              size="xs"
              onClick={() => {
                onClear();
                inputRef.current?.focus();
              }}
              me="-2"
            />
          ) : undefined
        }
      >
        <Input
          ref={inputRef}
          value={value}
          placeholder="Enter username"
          backgroundColor="gray.200"
          onChange={(e) => onChange(e.target.value)}
        />
      </InputGroup>
    </LightMode>
  );
}
