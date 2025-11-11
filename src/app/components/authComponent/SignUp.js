import { useForm } from "react-hook-form";

//---------function for signup form-------------
export default function SignUp({ role }) {
  console.log("role", role);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (formData) => {};

  return (
    <div className="min-h-screen bg-(--lightblue)">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center"
      ></form>
    </div>
  );
}
