import { Toaster, toast } from "react-hot-toast";
import { Transition } from "@headlessui/react";

const tailwindStyles = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-400",
  normal: "bg-blue-500",
};

const ToastMessage = ({ toast }) => {
  const bgColor = tailwindStyles[toast.type] || tailwindStyles.normal;
  return (
    <Transition
      appear
      show={toast.visible}
      className={`transform p-4 flex items-center ${bgColor} text-white rounded shadow-lg`}
      enter="transition-all duration-150"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <p className="px-2">{toast.message}</p>
    </Transition>
  );
};

const TailwindToaster = () => {
  return (
    <Toaster
      toastOptions={{ success: {}, error: {}, warning: {}, duration: 5000 }}
      position="top-right"
      children={(t) => <ToastMessage toast={t} />}
    />
  );
};

export default function App() {
  return (
    <div className="m-8 space-y-2">
      <button
        className="p-4 text-white bg-blue-500 rounded"
        onClick={() => toast("This is a normal message")}
      >
        Normal Toast
      </button>
      <button
        className="p-4 text-white bg-green-500 rounded"
        onClick={() => toast.success("This is a success message!")}
      >
        Success Toast
      </button>
      <button
        className="p-4 text-white bg-red-500 rounded"
        onClick={() => toast.error("This is an error message!")}
      >
        Error Toast
      </button>
      <button
        className="p-4 text-white bg-yellow-400 rounded"
        onClick={() =>
          toast("This is a warning message!", { icon: "⚠️", id: "warning" })
        }
      >
        Warning Toast
      </button>
      <TailwindToaster />
    </div>
  );
}
