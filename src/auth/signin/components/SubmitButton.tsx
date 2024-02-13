import BtnLoader from "../../../ui/btnloader";

const SubmitButton: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <div className="text-center">
    <button
      disabled={isLoading}
      className={`w-full px-6 py-3 mb-1 mr-1 text-sm font-bold rounded-md text-white
        transition-all duration-150 ease-linear shadow outline-none
        ${
          isLoading
            ? "bg-primary-600 opacity-50 cursor-not-allowed"
            : "bg-primary-600 hover:shadow-lg"
        }`}
      type="submit"
    >
      {isLoading ? <BtnLoader /> : "Log in"}
    </button>
  </div>
);

export default SubmitButton;
