import { useText } from "@/app/context/TextContext";

//-----function for footer---------
export default function Footer() {
   const TEXT = useText();
  return (
    <div>
      <h1>{TEXT.FOOTER}</h1>
    </div>
  );
}