import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import CancelButtonModal from "../../components/common/buttons/CancelButtonModal";
import { ModalStyle } from "../../components/common/modals/ModalStyle";

export function FieldError({ error }) {
  if (!error?.message) return null;
  return (
    <p className="mt-1.5 inline-flex w-full items-center gap-1.5 rounded-lg border border-[#C9A45C]/40 bg-[#FAF5E8] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#8b6534]">
      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[#8b6534]" />
      <span>{error.message}</span>
    </p>
  );
}

const DIALOG_WIDTH_MAP = {
  sm: "sm:w-[440px]",
  md: "sm:w-[520px]",
  lg: "sm:w-[580px]",
  xl: "md:w-[660px]",
  "2xl": "md:w-[740px]",
  "3xl": "lg:w-[860px]",
};

export default function V2ModalShell({
  open,
  onClose,
  badge,
  title,
  subtitle,
  maxWidthClass = "2xl",
  darkHeader = true,
  children,
}) {
  const widthKey = String(maxWidthClass || "2xl");
  const resolvedDialogWidth =
    DIALOG_WIDTH_MAP[widthKey] || "md:w-[740px]";
  const handleModalClose = (_event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      disableEscapeKeyDown
      closeAfterTransition
    >
      <Box
        sx={ModalStyle}
        data-lenis-prevent="true"
        className={`relative w-[calc(100vw-24px)] ${resolvedDialogWidth} max-h-[90vh] rounded-3xl border border-[#C9A45C]/40 bg-[#FFFDF9] overflow-y-auto shadow-[0_32px_90px_rgba(7,30,20,0.45)]`}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <CancelButtonModal onClick={() => onClose?.()} />

              <div
                className={`relative px-6 sm:px-8 pt-7 pb-6 border-b ${
                  darkHeader
                    ? "bg-gradient-to-br from-[#071E14] via-[#0D3323] to-[#12432D] border-[#C9A45C]/30 text-[#FAF5E8]"
                    : "bg-[#F9F6EE] border-[#EDE5D5] text-[#0D3323]"
                }`}
              >
                {badge && (
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${
                      darkHeader
                        ? "border-[#C9A45C]/45 bg-[#C9A45C]/15 text-[#E7D7B5]"
                        : "border-[#0f3d26]/20 bg-[#e6efea] text-[#0f3d26]"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]" />
                    {badge}
                  </span>
                )}
                {title && (
                  <h3
                    className={`mt-3 pr-10 font-serif text-xl sm:text-2xl font-normal leading-snug ${
                      darkHeader ? "text-[#FAF5E8]" : "text-[#0f3d26]"
                    }`}
                  >
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p
                    className={`mt-1.5 text-xs sm:text-sm leading-relaxed ${
                      darkHeader ? "text-[#FAF5E8]/75" : "text-[#0f3d26]/70"
                    }`}
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="px-6 sm:px-8 py-6">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Modal>
  );
}
