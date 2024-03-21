import { XMarkIcon } from "@heroicons/react/20/solid";
import * as RadixToast from "@radix-ui/react-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  ElementRef,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react";

const ToastContext = createContext<{
  showToast: (
    text: string,
    toastStatus: "success" | "warning" | "danger" | "normal"
  ) => void;
}>({
  showToast: () => {
    throw new Error(
      "You can't call showToast() outside of a <ToastProvider> – add it to your tree."
    );
  },
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<
    {
      id: string;
      text: string;
      toastStatus?: "success" | "warning" | "danger" | "normal";
    }[]
  >([]);

  function showToast(
    text: string,
    toastStatus: "success" | "warning" | "danger" | "normal" = "success"
  ) {
    setMessages((toasts) => [
      ...toasts,
      {
        id: window.crypto.randomUUID(),
        text,
        toastStatus,
      },
    ]);
  }

  return (
    <RadixToast.Provider>
      <ToastContext.Provider value={{ showToast }}>
        {children}
      </ToastContext.Provider>

      <AnimatePresence mode="popLayout">
        {messages.map((toast) => (
          <Toast
            key={toast.id}
            text={toast.text}
            toastStatus={toast.toastStatus}
            onClose={() =>
              setMessages((toasts) => toasts.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </AnimatePresence>

      <RadixToast.Viewport className="fixed flex flex-col-reverse gap-3 top-4 right-4 w-80" />
    </RadixToast.Provider>
  );
}

const Toast = forwardRef<
  ElementRef<typeof RadixToast.Root>,
  {
    onClose: () => void;
    text: string;
    toastStatus?: "success" | "warning" | "danger" | "normal";
  }
>(function Toast({ onClose, text, toastStatus = "normal" }, forwardedRef) {
  let width = 320;
  let margin = 16;

  const toastBgColorClasses = {
    success: "bg-[#171717]",
    warning: "bg-warning-800",
    danger: "bg-danger-800",
    normal: "bg-gray-800",
  };

  const toastBorderColorClasses = {
    success: "border-[#d4d4d4]",
    warning: "border-warning-600",
    danger: "border-danger-600",
    normal: "border-gray-600",
  };

  const textColorClasses = {
    success: "text-white",
    warning: "text-warning-500",
    danger: "text-danger-500",
    normal: "text-gray-500", // Default
  };

  const hoverBgColorClasses = {
    success: "hover:bg-[#171717]",
    warning: "hover:bg-warning-700/30",
    danger: "hover:bg-danger-700/30",
    normal: "hover:bg-gray-800/30",
  };

  const hoverTextColorClasses = {
    success: "hover:text-white",
    warning: "hover:text-warning-300",
    danger: "hover:text-danger-300",
    normal: "hover:text-gray-300",
  };

  const activeTextColorClasses = {
    success: "active:text-success-200",
    warning: "active:text-warning-200",
    danger: "active:text-danger-200",
    normal: "active:text-white",
  };

  const borderLeftColorClasses = {
    success: "border-l-success-600/50",
    warning: "border-l-warning-600/50",
    danger: "border-l-danger-600/50",
    normal: "border-l-gray-600/50",
  };

  const bgColorClassName = toastBgColorClasses[toastStatus];
  const borderColorClassName = toastBorderColorClasses[toastStatus];

  return (
    <RadixToast.Root
      ref={forwardedRef}
      asChild
      forceMount
      onOpenChange={onClose}
      duration={2500}
    >
      <motion.li
        layout
        initial={{ x: width + margin }}
        animate={{ x: 0 }}
        exit={{
          opacity: 0,
          zIndex: -1,
          transition: {
            opacity: {
              duration: 0.2,
            },
          },
        }}
        transition={{
          type: "spring",
          mass: 1,
          damping: 30,
          stiffness: 200,
        }}
        style={{ width, WebkitTapHighlightColor: "transparent" }}
      >
        <div
          className={`
            flex items-center justify-between overflow-hidden 
            text-sm text-white ${bgColorClassName} 
            border ${borderColorClassName} 
            rounded-lg shadow-sm whitespace-nowrap backdrop-blur z-[10000000]
          `}
        >
          <RadixToast.Description className="p-4 truncate">
            {text}
          </RadixToast.Description>
          <RadixToast.Close
            className={`p-4 ${textColorClasses[toastStatus]} transition 
            border-l ${borderLeftColorClasses[toastStatus]} 
            ${hoverBgColorClasses[toastStatus]} ${hoverTextColorClasses[toastStatus]} 
            ${activeTextColorClasses[toastStatus]}`}
          >
            <XMarkIcon className="w-5 h-5" />
          </RadixToast.Close>
        </div>
      </motion.li>
    </RadixToast.Root>
  );
});
