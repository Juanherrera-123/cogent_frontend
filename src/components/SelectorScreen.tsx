import FormSelector from "./FormSelector";

interface Props {
  onSelect: (form: "A" | "B") => void;
}

export default function SelectorScreen({ onSelect }: Props) {
  return <FormSelector onSelect={onSelect} />;
}
