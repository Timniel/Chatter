import Icon from "./icon";

const BtnLoader = ({ label, icon }: { label?: string; icon?: string }) => (
  <div className="flex items-center justify-center gap-1">
    <Icon
      icon={icon ? icon : "eos-icons:bubble-loading"}
      className="w-4 h-4 text-[#AEB9E1]"
    />

    <span className="inline-block "> {label ? label : "Loading"} ...</span>
  </div>
);

export default BtnLoader;
