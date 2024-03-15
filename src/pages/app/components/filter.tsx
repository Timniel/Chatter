import { Tabs, Tab } from "@nextui-org/react";

interface FilterProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const Filter = ({ activeTab, setActiveTab }: FilterProps) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col ">
      <Tabs
        aria-label="Options"
        size={"md"}
        variant={"underlined"}
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
      >
        <Tab key="forYou" title="For you"></Tab>
        <Tab
          key="featured"
          title="Featured"
          onClick={() => handleTabClick("featured")}
        ></Tab>
        <Tab
          key="recent"
          title="Recent"
          onClick={() => handleTabClick("recent")}
        ></Tab>
      </Tabs>
    </div>
  );
};
