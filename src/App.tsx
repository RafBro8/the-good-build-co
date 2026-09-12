import { FormEvent, useState } from 'react';

const services = [
  {
    title: 'Residential remodels',
    text: 'Whole-home updates, room reworks, and thoughtful upgrades that respect the bones of the house.',
  },
  {
    title: 'Kitchens and baths',
    text: 'High-use spaces planned around clean sequencing, durable finishes, and daily-life details.',
  },
  {
    title: 'Additions and conversions',
    text: 'Bedrooms, mudrooms, offices, basements, and flex spaces built to feel original to the home.',
  },
  {
    title: 'Porches, decks, and exterior work',
    text: 'Curb appeal, outdoor living, and structural improvements that make the home work harder.',
  },
];

const projects = [
  {
    title: 'Craftsman kitchen reset',
    type: 'Kitchen remodel',
    detail: 'Cabinet refacing, new prep lighting, walnut shelves, and a tighter daily-use layout.',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=82',
  },
  {
    title: 'Rear addition and family room',
    type: 'Home addition',
    detail: 'A brighter family room, better backyard connection, and framing planned around the original roofline.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=82',
  },
  {
    title: 'Quiet primary suite upgrade',
    type: 'Interior renovation',
    detail: 'A calmer suite with storage, trim continuity, and finish choices that feel built-in, not bolted on.',
    image:
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1100&q=82',
  },
];

const processSteps = ['Walkthrough', 'Scope and estimate', 'Build schedule', 'Craft closeout'];

const siteStandards = [
  'Written scope before demo starts',
  'Daily jobsite reset',
  'Material decisions tracked early',
  'Final punch list, not guesswork',
];

function App() {
  return (
    <main className="min-h-screen bg-bone text-ink">
      <Header />
      <Hero />
      <TrustBand />
      <Services />
      <Projects />
      <Process />
      <Estimate />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-bone/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <a className="font-display text-2xl font-semibold text-ink" href="#top">
          The Good Build Co.
        </a>
        <nav
          aria-label="Main navigation"
          className="flex gap-2 overflow-x-auto text-sm font-semibold text-ink/66"
        >
          {['Services', 'Projects', 'Process', 'Estimate'].map((item) => (
            <a
              className="whitespace-nowrap border border-ink/10 bg-plaster px-3 py-2 transition hover:border-clay hover:text-clay"
              href={`#${item.toLowerCase()}`}
              key={item}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt="Modern residential construction interior with warm wood details"
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=84"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/82 to-ink/26" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-10 px-5 py-20 text-white sm:px-8 lg:grid-cols-[0.92fr_0.62fr] lg:items-end lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">
            Residential construction and remodeling
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] sm:text-7xl">
            Good work. Good people. Good builds.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
            The Good Build Co. is a modern contractor demo for homeowners who want a
            clear scope, a respectful crew, and residential work that feels considered
            from framing to finish.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="bg-copper px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-clay"
              href="#estimate"
            >
              Request an estimate
            </a>
            <a
              className="border border-white/28 bg-white/10 px-6 py-3 text-center text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink"
              href="#projects"
            >
              View project style
            </a>
          </div>
        </div>

        <div className="border border-white/16 bg-white/12 p-5 backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-copper">
            Built around trust
          </p>
          <dl className="mt-6 grid gap-px overflow-hidden bg-white/16 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ['18+', 'years of crew experience'],
              ['42', 'sample projects planned'],
              ['100%', 'scope-first planning'],
            ].map(([stat, label]) => (
              <div className="bg-ink/52 p-5" key={label}>
                <dt className="font-display text-4xl font-semibold">{stat}</dt>
                <dd className="mt-1 text-sm text-white/68">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  return (
    <section className="border-y border-ink/10 bg-plaster">
      <div className="mx-auto grid max-w-7xl gap-px bg-ink/10 px-5 sm:px-8 md:grid-cols-3">
        {['Scope-led estimates', 'Respectful jobsite standards', 'Residential-first craftsmanship'].map(
          (item) => (
            <div className="bg-plaster py-6 text-sm font-bold uppercase tracking-[0.16em] text-pine" key={item}>
              {item}
            </div>
          ),
        )}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="What we build"
          title="A contractor site that feels calm, capable, and easy to trust."
          text="The service structure is broad enough for general residential contractors while still giving homeowners clear entry points."
        />
        <div className="mt-10 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-2">
          {services.map((service) => (
            <article className="bg-plaster p-7" key={service.title}>
              <div className="mb-7 h-2 w-16 bg-clay" />
              <h3 className="font-display text-3xl font-semibold text-ink">{service.title}</h3>
              <p className="mt-4 leading-7 text-ink/66">{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-ink py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="Project style"
          inverted
          title="Warm residential work, presented like a premium portfolio."
          text="This first demo pass uses editorial project cards. Later, we can add filters, before/after sliders, and individual case-study pages."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article className="group overflow-hidden bg-white/8" key={project.title}>
              <img
                alt={project.title}
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                src={project.image}
              />
              <div className="p-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-copper">
                  {project.type}
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold">{project.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/62">{project.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="border-b border-ink/10 bg-plaster py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="How it works"
          title="A clear path from first walkthrough to final punch list."
          text="Contractor websites win when the homeowner understands what happens next. This flow is simple enough for a demo and useful enough for a real client."
        />
        <div className="mt-10 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <article className="bg-bone p-6" key={step}>
              <p className="font-display text-5xl font-semibold text-clay">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-8 text-lg font-bold text-ink">{step}</h3>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-4">
          {siteStandards.map((standard) => (
            <div className="bg-plaster p-5 text-sm font-bold text-pine" key={standard}>
              {standard}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Estimate() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="estimate" className="py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-clay">Estimate</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink">
            Tell us what needs to work better at home.
          </h2>
          <p className="mt-5 leading-7 text-ink/66">
            This frontend-only estimate flow shows how a contractor site can collect the
            essentials without making homeowners work too hard.
          </p>
          {submitted ? (
            <div className="mt-6 border border-pine/18 bg-plaster p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-pine">
                Demo request ready
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/66">
                In a later stage this can connect to email, a CRM, or a lightweight lead
                dashboard. For now, it proves the customer experience.
              </p>
            </div>
          ) : null}
        </div>

        <form className="grid gap-5 border border-ink/10 bg-plaster p-6 shadow-soft" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" placeholder="Your name" />
            <Field label="Phone" placeholder="(555) 555-1234" />
          </div>
          <Field label="Email" placeholder="you@example.com" />
          <label className="grid gap-2 text-sm font-bold text-ink">
            Project type
            <select className="h-12 border border-ink/12 bg-bone px-3 text-sm font-medium text-ink outline-none focus:border-clay">
              <option>Kitchen or bath</option>
              <option>Addition or conversion</option>
              <option>Whole-home remodel</option>
              <option>Deck, porch, or exterior</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Project notes
            <textarea
              className="min-h-32 border border-ink/12 bg-bone px-3 py-3 text-sm font-medium text-ink outline-none focus:border-clay"
              placeholder="Tell us about the home, timeline, budget range, and what you want to change."
            />
          </label>
          <button
            className="bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-clay"
            type="submit"
          >
            {submitted ? 'Request previewed' : 'Preview request'}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <input
        className="h-12 border border-ink/12 bg-bone px-3 text-sm font-medium text-ink outline-none focus:border-clay"
        placeholder={placeholder}
      />
    </label>
  );
}

function SectionIntro({
  eyebrow,
  inverted = false,
  text,
  title,
}: {
  eyebrow: string;
  inverted?: boolean;
  text: string;
  title: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
      <div>
        <p
          className={`text-sm font-bold uppercase tracking-[0.18em] ${
            inverted ? 'text-copper' : 'text-clay'
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight ${
            inverted ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </div>
      <p className={`max-w-xl leading-7 ${inverted ? 'text-white/66' : 'text-ink/66'}`}>{text}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm text-white/62 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-xl font-semibold text-white">The Good Build Co.</p>
        <p>Good work. Good people. Good builds.</p>
      </div>
    </footer>
  );
}

export default App;
