import { Link } from "react-router-dom";

const Arcade = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Inclusive Design Lab
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            Are you designing with everyone in mind?
          </h1>
          <p className="text-base text-slate-600">
            Use these short accessibility tasks to see how your interfaces feel in
            real-life conditions — from color contrast to tap targets and task flows.
          </p>
        </header>

        <section className="space-y-5">
          {/* Task 1: Contrast */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Color & Text Contrast Check</h2>
            <p className="mt-2 text-base text-slate-700">
              Test your text and background colors so more people can read comfortably,
              even on older screens or in bright light.
            </p>
            <Link
              to="/arcade/contrast-quest"
              className="mt-4 inline-flex items-center rounded-xl border border-slate-900 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              Test your accessibility
            </Link>
          </article>

          {/* Task 2: Tap targets */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Tap Target Comfort Check</h2>
            <p className="mt-2 text-base text-slate-700">
              Adjust button size and feel the difference once targets reach around
              44–48 px on touch screens.
            </p>
            <Link
              to="/arcade/tap-target-tuner"
              className="mt-4 inline-flex items-center rounded-xl border border-slate-900 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              Try this task
            </Link>
          </article>

          {/* Task 3: Task flow */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Task Flow Clarity Check</h2>
            <p className="mt-2 text-base text-slate-700">
              Arrange a simple shopping journey and see how flow order affects clarity
              and user confidence.
            </p>
            <Link
              to="/arcade/story-flow-shuffle"
              className="mt-4 inline-flex items-center rounded-xl border border-slate-900 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              Try this task
            </Link>
          </article>
        </section>

        <footer className="pt-1 text-xs text-slate-500">
          No logins, no tracking — these tasks run in the browser so you can focus on how
          the experience feels for different users.
        </footer>
      </div>
    </main>
  );
};

export default Arcade;
