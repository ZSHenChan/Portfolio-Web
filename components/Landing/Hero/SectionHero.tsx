import { Lamp } from "@/components/Landing/Hero/Lamp";

export function SectionHero({ id }: { id: string }) {
  return (
    <div id={id}>
      <Lamp />
    </div>
  );
}
