export default function Login() {
  return (
    <div class="flex flex-col items-center justify-center min-h-[60vh] bg-base-200">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <h1 class="card-title text-3xl mb-2">Login Page</h1>
          <p class="mb-4">This is a placeholder for the login page, styled with DaisyUI Card and Button components.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary w-full">Login</button>
            <button class="btn btn-outline w-full">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}