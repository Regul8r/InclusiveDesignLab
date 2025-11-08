import { Link } from "react-router-dom";

const Arcade = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row lg:py-16">
        {/* Left: title + tasks */}
        <div className="flex-1 space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Prototykes · Inclusive Design Lab
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Are you designing with everyone in mind?
            </h1>
            <p className="max-w-xl text-sm text-slate-300">
              Try these short accessibility tasks to see how your interfaces feel in
              real-life conditions — from color contrast to tap targets and task flows.
            </p>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {/* Task 1: Contrast */}
            <article className="glass-card">
              <h2 className="text-lg font-semibold">Color & Text Contrast Check</h2>
              <p className="mt-1 text-sm text-slate-200/80">
                Test your text and background colors so more people can read comfortably,
                even on older screens or in bright light.
              </p>
              <Link
                to="/arcade/contrast-quest"
                className="mt-4 inline-flex items-center rounded-xl bg-slate-50/10 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-50/20 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                Test your accessibility
              </Link>
            </article>

            {/* Task 2: Tap targets */}
            <article className="glass-card">
              <h2 className="text-lg font-semibold">Tap Target Comfort Check</h2>
              <p className="mt-1 text-sm text-slate-200/80">
                Adjust button size and feel the difference once targets reach around
                44–48 px on touch screens.
              </p>
              <Link
                to="/arcade/tap-target-tuner"
                className="mt-4 inline-flex items-center rounded-xl bg-slate-50/10 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-50/20 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                Try this task
              </Link>
            </article>

            {/* Task 3: Task flow */}
            <article className="glass-card md:col-span-2 xl:col-span-1">
              <h2 className="text-lg font-semibold">Task Flow Clarity Check</h2>
              <p className="mt-1 text-sm text-slate-200/80">
                Arrange a simple shopping journey and see how flow order affects clarity
                and user confidence.
              </p>
              <Link
                to="/arcade/story-flow-shuffle"
                className="mt-4 inline-flex items-center rounded-xl bg-slate-50/10 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-50/20 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                Try this task
              </Link>
            </article>
          </section>

          <footer className="text-[11px] text-slate-400">
            No logins, no tracking — these tasks run in the browser so you can focus on
            how the experience feels for different users.
          </footer>
        </div>

        {/* Right: use dead space on larger screens */}
        <aside className="hidden w-full max-w-sm space-y-4 rounded-3xl border border-slate-700/60 bg-slate-900/60 p-5 shadow-[0_0_40px_rgba(15,23,42,0.75)] backdrop-blur-xl lg:block">
          <h2 className="text-sm font-semibold text-slate-100">
            What these tasks show about my practice
          </h2>
          <ul className="mt-2 space-y-2 text-xs text-slate-300">
            <li>• I design with WCAG-style contrast and readability in mind.</li>
            <li>• I consider thumb ergonomics and platform touch guidelines.</li>
            <li>• I think in flows and journeys, not just single screens.</li>
            <li>• I build interactive tools to help others feel accessibility issues.</li>
          </ul>
          <div className="mt-4 rounded-2xl border border-sky-500/40 bg-sky-500/10 px-3 py-3 text-xs text-sky-100">
            Recruiter view: this isn't a "game" — it's an accessibility lab that
            demonstrates product thinking, interaction design, and teaching mindset.
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Arcade;
