import { AuthForm } from "@/components/auth/AuthForm";
import Poster from "@/components/auth/Poster";

export default function SignInPage() {
  return (
    <section className="w-full h-screen flex">
      <article className="w-1/2 flex justify-center items-center">
        <AuthForm type="SIGN_IN" />
      </article>
      <aside className="relative h-screen w-1/2 overflow-hidden">
        <Poster />
      </aside>
    </section>
  );
}