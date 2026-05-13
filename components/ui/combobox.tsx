"use client";

import * as React from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  className,
  disabled,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(search.toLowerCase()) ||
      option.description?.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <SelectPrimitive.Root
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        className={cn(
          "group relative flex h-12 w-full items-center justify-between rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-black/50 px-4 py-3 text-left text-sm backdrop-blur-xl transition-all duration-300",
          "hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
          "focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20",
          "data-[placeholder]:text-gray-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <div className="flex items-center gap-3">
          {selectedOption?.icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-pink-400">
              {selectedOption.icon}
            </div>
          )}
          <div>
            {selectedOption ? (
              <span className="font-medium text-white">{selectedOption.label}</span>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
            {selectedOption?.description && (
              <p className="mt-0.5 text-xs text-gray-500">{selectedOption.description}</p>
            )}
          </div>
        </div>
        <SelectPrimitive.Icon>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(
            "relative z-50 w-[calc(100%-2rem)] overflow-hidden rounded-2xl border border-white/10",
            "bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl",
            "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_40px_rgba(236,72,153,0.1)]",
            "animate-in fade-in-0 zoom-in-95 duration-200"
          )}
          position="popper"
          sideOffset={8}
        >
          {/* Glow effect */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/5 to-purple-500/5" />

          <div className="relative p-2">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                  "flex h-10 w-full rounded-xl border border-white/10 bg-white/5 px-10 py-2 text-sm text-white placeholder:text-gray-500",
                  "focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20",
                  "transition-all duration-200"
                )}
                onFocus={() => setOpen(true)}
              />
            </div>
          </div>

          <SelectPrimitive.Viewport className="p-2">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No options found
              </div>
            ) : (
              <div className="space-y-1">
                {filteredOptions.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm outline-none",
                      "transition-all duration-150",
                      "data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-pink-500/20 data-[highlighted]:to-purple-500/20",
                      "data-[highlighted]:text-white data-[highlighted]:shadow-[0_0_15px_rgba(236,72,153,0.2)]",
                      "data-[state=checked]:text-pink-400 data-[state=checked]:font-medium"
                    )}
                  >
                    {option.icon && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-gray-400 data-[state=checked]:bg-pink-500/20 data-[state=checked]:text-pink-400">
                        {option.icon}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      {option.description && (
                        <div className="mt-0.5 text-xs text-gray-500">{option.description}</div>
                      )}
                    </div>
                    <SelectPrimitive.ItemIndicator className="absolute right-3">
                      <Check className="h-4 w-4 text-pink-400" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </div>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive>
  );
}

// Demo usage
export function ComboboxDemo() {
  const [value, setValue] = React.useState("");

  const options = [
    {
      value: "design",
      label: "Design",
      description: "Creative and visual work",
      icon: <span className="text-sm">🎨</span>,
    },
    {
      value: "code",
      label: "Code",
      description: "Development and programming",
      icon: <span className="text-sm">💻</span>,
    },
    {
      value: "music",
      label: "Music",
      description: "Audio production and composition",
      icon: <span className="text-sm">🎵</span>,
    },
    {
      value: "video",
      label: "Video",
      description: "Film and animation",
      icon: <span className="text-sm">🎬</span>,
    },
    {
      value: "photo",
      label: "Photography",
      description: "Photo capture and editing",
      icon: <span className="text-sm">📷</span>,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-8">
      <div className="w-full max-w-sm">
        <label className="mb-2 block text-sm font-medium text-gray-400">
          Category
        </label>
        <Combobox
          options={options}
          value={value}
          onValueChange={setValue}
          placeholder="Choose a category..."
          searchPlaceholder="Search categories..."
        />
      </div>
    </div>
  );
}