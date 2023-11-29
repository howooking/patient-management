import Attraction from "./attraction";
import SignupForm from "./signup-form";

export default function SignupPage() {
  return (
    <div className="flex w-full h-screen">
      <SignupForm />
      <Attraction />
    </div>
  );
}
