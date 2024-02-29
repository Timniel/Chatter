import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export const Filter = () => {
  return (
    <div className="flex flex-col ">
      <Tabs aria-label="Options" size={"md"} variant={"underlined"}>
        <Tab key="photos" title="For you"></Tab>
        <Tab key="music" title="Featured"></Tab>
        <Tab key="videos" title="Recent"></Tab>
      </Tabs>
    </div>
  );
};
