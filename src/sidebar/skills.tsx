import { Chip } from "@nextui-org/react";
export const Skills = () => {
  return (
    <div className="space-y-2 ">
      <h2>Skills</h2>
      <div>
        <div className="flex flex-wrap gap-2">
          <Chip size="md" variant="flat" color="default">
            Copywriting
          </Chip>
          <Chip size="md" variant="flat" color="default">
            Research
          </Chip>{" "}
          <Chip size="md" variant="flat" color="default">
            Focus
          </Chip>
          <Chip size="md" variant="flat" color="default">
            Adaptability
          </Chip>
          <Chip size="md" variant="flat" color="default">
            Conciseness
          </Chip>
        </div>{" "}
      </div>
    </div>
  );
};
