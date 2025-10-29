import { useText } from "@/app/context/TextContext";

//-----function for header---------
export default function Header() {
  const TEXT = useText();

  return (
    <div>
      <h1>{TEXT.HEADER}</h1>
    </div>
  );
}
