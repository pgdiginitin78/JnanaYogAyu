import { useState } from "react";
import { CheckCircle2, Clock, Eye, EyeOff } from "lucide-react";
import InputField from "../../components/common/forms/InputField";

export function V2FormSection({ title, hint, children }) {
  return (
    <div className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1]/65 p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EDE5D5] pb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="h-4 w-1 rounded-full bg-[#C9A45C] shrink-0" />
          <h4 className="font-serif text-base sm:text-lg text-[#0f3d26]">
            {title}
          </h4>
        </div>
        {hint && (
          <span className="text-[11px] font-medium text-[#8b6534]">
            {hint}
          </span>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function V2SlotSelector({ label, value, onChange, slots, error }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#0f3d26]">
          {label}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#e6efea] px-2.5 py-0.5 text-[10px] font-bold text-[#0f3d26]">
          <Clock className="h-3 w-3 text-[#8b6534]" />
          <span>Select Open Slot</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {slots.map((slot) => {
          const isSelected = value === slot.value;
          return (
            <button
              key={slot.value}
              type="button"
              onClick={() => onChange(slot.value)}
              className={`rounded-2xl border p-3.5 text-left transition-all flex flex-col justify-between gap-2 ${
                isSelected
                  ? "border-[#C9A45C] bg-[#0f3d26] text-[#FAF5E8] shadow-md ring-2 ring-[#C9A45C]/45"
                  : "border-[#0f3d26]/15 bg-[#FFFDF9] text-[#0f3d26] hover:border-[#C9A45C]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-xs font-bold leading-snug ${
                    isSelected ? "text-[#FAF5E8]" : "text-[#0f3d26]"
                  }`}
                >
                  {slot.title}
                </span>
                {isSelected && (
                  <CheckCircle2 className="h-4 w-4 text-[#C9A45C] shrink-0" />
                )}
              </div>

              <p
                className={`text-[11px] font-semibold ${
                  isSelected ? "text-[#E7D7B5]" : "text-[#8b6534]"
                }`}
              >
                {slot.time}
              </p>

              <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-current/10">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isSelected
                      ? "bg-[#C9A45C]/25 text-[#E7D7B5]"
                      : "bg-[#e6efea] text-[#0f3d26]"
                  }`}
                >
                  {slot.availability}
                </span>
                {slot.note && (
                  <span
                    className={`text-[10px] truncate ${
                      isSelected ? "text-[#FAF5E8]/75" : "text-[#0f3d26]/65"
                    }`}
                  >
                    {slot.note}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {error?.message && (
        <p className="mt-1.5 rounded-lg border border-[#C9A45C]/40 bg-[#FAF5E8] px-2.5 py-1 text-[11px] font-semibold text-[#8b6534]">
          {error.message}
        </p>
      )}
    </div>
  );
}

export function V2PasswordInput({
  name,
  label,
  control,
  error,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <InputField
        name={name}
        label={label}
        type={visible ? "text" : "password"}
        control={control}
        dontCapitalize
        shrink
        InputLabelProps={{ shrink: true }}
        error={error}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute right-2.5 top-[18px] -translate-y-1/2 rounded-full p-1 text-[#0f3d26]/70 hover:bg-[#e6efea] hover:text-[#0f3d26] transition-colors"
        aria-label={visible ? `Hide ${label}` : `Show ${label}`}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
