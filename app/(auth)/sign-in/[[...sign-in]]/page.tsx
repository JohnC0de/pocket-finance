import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <article className="prose text-center">
        <h1>Welcome to Pocket Finance!</h1>
        <p>
          To get started, please sign-in with your email address and password.
        </p>
      </article>

      <SignIn />
    </div>
  )
}
