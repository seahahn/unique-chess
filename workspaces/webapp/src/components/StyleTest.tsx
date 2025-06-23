import { JSX } from "solid-js";

/**
 * StyleTest component renders a button and card using Tailwind and DaisyUI classes
 * to verify that both are working correctly.
 */
export default function StyleTest(): JSX.Element {
  return (
    <div class="flex flex-col items-center gap-6 p-8">
      <button class="btn btn-primary">DaisyUI Primary Button</button>
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">DaisyUI Card</h2>
          <p class="text-gray-700">This card uses DaisyUI and Tailwind classes.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-secondary">Secondary Action</button>
          </div>
        </div>
      </div>
    </div>
  );
}