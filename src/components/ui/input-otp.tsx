import * as React from "react"
import { MinusIcon } from "lucide-react"

import { cn } from "../../lib/utils"

type OTPSlot = {
  char: string
  isActive: boolean
  hasFakeCaret: boolean
}

type OTPContextValue = {
  slots: OTPSlot[]
}

const OTPInputContext = React.createContext<OTPContextValue | null>(null)

interface InputOTPProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string
  onChange?: (value: string) => void
  maxLength?: number
  containerClassName?: string
}

function InputOTP({
  className,
  containerClassName,
  value = "",
  onChange,
  maxLength = 6,
  children,
  ...props
}: React.PropsWithChildren<InputOTPProps>) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const normalizedValue = value.slice(0, maxLength)
  const slots = React.useMemo(
    () =>
      Array.from({ length: maxLength }, (_, index) => {
        const char = normalizedValue[index] ?? ""
        const isActive = index === normalizedValue.length && normalizedValue.length < maxLength
        return {
          char,
          isActive,
          hasFakeCaret: isActive && document.activeElement === inputRef.current,
        }
      }),
    [maxLength, normalizedValue]
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.replace(/\D/g, "").slice(0, maxLength)
    onChange?.(nextValue)
  }

  return (
    <OTPInputContext.Provider value={{ slots }}>
      <div
        data-slot="input-otp"
        className={cn("relative inline-flex items-center", containerClassName)}
        onClick={() => inputRef.current?.focus()}
      >
        {children}
        <input
          ref={inputRef}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={maxLength}
          value={normalizedValue}
          onChange={handleChange}
          className={cn(
            "absolute inset-0 h-full w-full cursor-text border-0 bg-transparent text-transparent caret-transparent outline-none",
            className
          )}
          {...props}
        />
      </div>
    </OTPInputContext.Provider>
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-lime-500 data-[active=true]:ring-lime-200 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-slate-200 relative flex h-11 w-11 items-center justify-center rounded-2xl border bg-white text-base font-semibold text-slate-950 shadow-sm transition-all outline-none data-[active=true]:ring-4",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-pulse bg-slate-950" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" className="px-2 text-slate-400" {...props}>
      <MinusIcon className="h-4 w-4" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, OTPInputContext }
