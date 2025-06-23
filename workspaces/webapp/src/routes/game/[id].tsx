import { useParams } from "@solidjs/router";

export default function Game() {
  const params = useParams();
  return (
    <div class="flex flex-col items-center justify-center min-h-[60vh] bg-base-200">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <h1 class="card-title text-3xl mb-2">Game Page</h1>
          <p class="mb-2">Game ID: <span class="font-mono">{params.id}</span></p>
          <p class="mb-4">This is a placeholder for the game page, styled with DaisyUI Card.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Join Game</button>
            <button class="btn btn-outline">Spectate</button>
          </div>
        </div>
      </div>
    </div>
  );
}