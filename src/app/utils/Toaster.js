import { toast } from "react-toastify";

export default function Toster(text, status) {
  const renderToastContent = (heading, message) => (
    <div>
      <strong>{heading}</strong>
      <div>{message}</div>
    </div>
  );

  if (status === "success") {
    return toast.success(renderToastContent("Success", text), {
      autoClose: 4000,
      toastId: text,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  } else if (status === "error") {
    return toast.error(renderToastContent("Error", text), {
      autoClose: 4000,
      toastId: text,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  } else if (status === "info") {
    return toast.info(renderToastContent("Info", text), {
      autoClose: 4000,
      toastId: text,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  }
  return null;
}