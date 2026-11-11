import { AuthForm } from "@/components/auth/AuthForm";
import Poster from "@/components/auth/Poster";

export default function SignUpPage() {
  return (
    <section className="w-full h-screen flex">
      <aside className="relative h-screen w-1/2 overflow-hidden">
        <Poster />
      </aside>
      <article className="w-1/2 flex justify-center items-center">
        <AuthForm type="SIGN_UP" />
      </article>
    </section>
  );
}
