import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export const Filter = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col ">
      <Tabs
        aria-label="Options"
        size={"md"}
        variant={"underlined"}
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key)}
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
