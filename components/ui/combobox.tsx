import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ComboboxProps {
  options: string[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  allowCustom?: boolean;
  onAddNew?: (value: string) => void;
  className?: string;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  allowCustom = false,
  onAddNew,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(value || "");
  const [filteredOptions, setFilteredOptions] = React.useState(options);

  React.useEffect(() => {
    if (value) {
      setSearchValue(value);
    }
  }, [value]);

  React.useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchValue, options]);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setSearchValue(selectedValue);
    setOpen(false);
  };

  const handleAddCustom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (searchValue.trim() && !options.includes(searchValue.trim())) {
      onAddNew?.(searchValue.trim());
      handleSelect(searchValue.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!open) {
      setOpen(true);
    }
  };

  const handleInputFocus = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (open && !target.closest(".combobox-container")) {
        setOpen(false);
        // Reset to selected value if no selection was made
        if (value && searchValue !== value) {
          setSearchValue(value);
        }
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open, value, searchValue]);

  return (
    <div className={cn("relative combobox-container", className)}>
      <div className="relative">
        <Input
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="pr-8"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => {
              setOpen(false);
              if (value) {
                setSearchValue(value);
              }
            }}
          />
          <div className="absolute z-20 mt-1 w-full rounded-md border bg-popover shadow-md">
            <div className="max-h-60 overflow-auto p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(option);
                    }}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                      value === option && "bg-accent"
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </div>
                ))
              ) : (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  No options found
                </div>
              )}
              {allowCustom &&
                searchValue.trim() &&
                !options.includes(searchValue.trim()) && (
                  <div
                    onMouseDown={handleAddCustom}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground text-primary"
                  >
                    <span className="mr-2">+</span>
                    Add "{searchValue.trim()}"
                  </div>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
