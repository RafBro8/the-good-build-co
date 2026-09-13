import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';

type PagePath = '/' | '/services' | '/projects' | '/process' | '/about' | '/contact';

type Service = {
  title: string;
  text: string;
  detail: string;
  fit: string;
};

type Project = {
  category: ProjectCategory;
  challenge: string;
  materials: string[];
  result: string;
  scope: string[];
  title: string;
  type: string;
  detail: string;
  stats: string;
  image: string;
};

type ProjectCategory =
  | 'All'
  | 'Kitchens and baths'
  | 'Additions'
  | 'Whole-home'
  | 'Exterior living';

type Metadata = {
  title: string;
  description: string;
};

type EstimateFormState = {
  budgetRange: string;
  contactMethod: string;
  email: string;
  name: string;
  neighborhood: string;
  notes: string;
  phone: string;
  projectType: string;
  timeline: string;
};

type EstimateErrors = Partial<Record<keyof EstimateFormState, string>>;

const pagePaths = new Set<PagePath>([
  '/',
  '/services',
  '/projects',
  '/process',
  '/about',
  '/contact',
]);

const siteUrl = 'https://thegoodbuildco.com';
const socialImageUrl = `${siteUrl}/og-image.svg`;

const navItems: { href: PagePath; label: string }[] = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Estimate' },
];

const metadata: Record<PagePath, Metadata> = {
  '/': {
    title: 'The Good Build Co. | Residential Construction',
    description:
      'A premium residential construction and remodeling demo website for The Good Build Co.',
  },
  '/services': {
    title: 'Services | The Good Build Co.',
    description:
      'Residential remodeling, kitchens, baths, additions, conversions, porches, decks, and exterior construction services.',
  },
  '/projects': {
    title: 'Projects | The Good Build Co.',
    description:
      'Explore residential construction project examples for kitchens, additions, primary suites, and outdoor living.',
  },
  '/process': {
    title: 'Process | The Good Build Co.',
    description:
      'A clear residential construction process from walkthrough and scope to schedule, jobsite standards, and closeout.',
  },
  '/about': {
    title: 'About | The Good Build Co.',
    description:
      'A trustworthy residential construction brand built around good work, good people, and good builds.',
  },
  '/contact': {
    title: 'Estimate | The Good Build Co.',
    description:
      'Request a frontend-only estimate preview for a residential construction or remodeling project.',
  },
};

const services: Service[] = [
  {
    title: 'Residential remodels',
    text: 'Whole-home updates, room reworks, and thoughtful upgrades that respect the bones of the house.',
    detail:
      'Ideal for homeowners who need a better layout, cleaner finishes, improved flow, or a phased plan that keeps the project realistic.',
    fit: 'Whole-home updates, interior reworks, finish refreshes',
  },
  {
    title: 'Kitchens and baths',
    text: 'High-use spaces planned around clean sequencing, durable finishes, and daily-life details.',
    detail:
      'The demo positions kitchens and baths as premium lead drivers with attention to layout, storage, lighting, surfaces, and clean closeout.',
    fit: 'Kitchens, baths, laundry rooms, mudrooms',
  },
  {
    title: 'Additions and conversions',
    text: 'Bedrooms, mudrooms, offices, basements, and flex spaces built to feel original to the home.',
    detail:
      'A broader construction lane for contractors who handle framing, structural coordination, roofing tie-ins, and livable new square footage.',
    fit: 'Additions, basements, garages, offices, suites',
  },
  {
    title: 'Porches, decks, and exterior work',
    text: 'Curb appeal, outdoor living, and structural improvements that make the home work harder.',
    detail:
      'A warm residential category that keeps the site useful for seasonal exterior work, curb appeal upgrades, and outdoor living projects.',
    fit: 'Decks, porches, entries, siding, exterior repairs',
  },
];

const projects: Project[] = [
  {
    category: 'Kitchens and baths',
    title: 'Craftsman kitchen reset',
    type: 'Kitchen remodel',
    challenge:
      'The existing kitchen had good bones but poor prep space, tired lighting, and storage that made everyday cooking feel cramped.',
    detail: 'Cabinet refacing, new prep lighting, walnut shelves, and a tighter daily-use layout.',
    materials: ['Walnut shelving', 'Painted shaker fronts', 'Quartz counters', 'Layered task lighting'],
    result:
      'A warmer kitchen with better working zones, cleaner storage, and a finish package that still feels right for the house.',
    scope: ['Cabinet refacing', 'Lighting plan', 'Countertop replacement', 'Open shelf millwork'],
    stats: '6 week demo timeline',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=82',
  },
  {
    category: 'Additions',
    title: 'Rear addition and family room',
    type: 'Home addition',
    challenge:
      'The family needed more living space without making the rear elevation look like an afterthought.',
    detail:
      'A brighter family room, better backyard connection, and framing planned around the original roofline.',
    materials: ['Matched roofline', 'Wide plank oak', 'Black window package', 'Low-profile recessed lighting'],
    result:
      'New square footage that feels connected to the original home and creates a stronger indoor-outdoor rhythm.',
    scope: ['Foundation coordination', 'Framing and roof tie-in', 'Window package', 'Interior finish work'],
    stats: '480 sq ft planned',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=82',
  },
  {
    category: 'Whole-home',
    title: 'Quiet primary suite upgrade',
    type: 'Interior renovation',
    challenge:
      'The suite had enough square footage, but the storage, trim language, and lighting did not feel calm or intentional.',
    detail:
      'A calmer suite with storage, trim continuity, and finish choices that feel built-in, not bolted on.',
    materials: ['Custom closet buildout', 'Soft white oak', 'Stone-look porcelain', 'Warm dimming fixtures'],
    result:
      'A quieter primary suite with better storage, more useful lighting, and a finish palette that carries across rooms.',
    scope: ['Closet rework', 'Bath finish update', 'Trim continuity', 'Lighting and fixture coordination'],
    stats: '3 rooms coordinated',
    image:
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=82',
  },
  {
    category: 'Exterior living',
    title: 'Covered porch and entry refresh',
    type: 'Exterior living',
    challenge:
      'The entry needed better shelter, safer steps, and a more settled first impression from the street.',
    detail:
      'A covered threshold, safer steps, better lighting, and a front elevation that feels more settled.',
    materials: ['Cedar trim', 'Composite decking', 'Architectural rail', 'Low-glare entry lighting'],
    result:
      'A more useful front porch with stronger curb appeal and a safer, more welcoming path into the home.',
    scope: ['Porch cover framing', 'Step rebuild', 'Rail and trim package', 'Entry lighting'],
    stats: '4 trade scopes',
    image:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=82',
  },
];

const projectCategories: ProjectCategory[] = [
  'All',
  'Kitchens and baths',
  'Additions',
  'Whole-home',
  'Exterior living',
];

const processSteps = [
  {
    title: 'Walkthrough',
    text: 'Listen first, inspect the home, identify constraints, and define what success should feel like.',
  },
  {
    title: 'Scope and estimate',
    text: 'Translate the walkthrough into clear line items, allowances, exclusions, and decision points.',
  },
  {
    title: 'Build schedule',
    text: 'Sequence demo, rough-in, inspections, materials, finish work, and homeowner check-ins.',
  },
  {
    title: 'Craft closeout',
    text: 'Resolve the punch list, confirm finishes, clean the site, and leave the homeowner with next steps.',
  },
];

const siteStandards = [
  'Written scope before demo starts',
  'Daily jobsite reset',
  'Material decisions tracked early',
  'Final punch list, not guesswork',
];

const proofPoints = [
  ['18+', 'years of crew experience'],
  ['42', 'sample projects planned'],
  ['100%', 'scope-first planning'],
];

const projectTypeOptions = [
  'Kitchen or bath',
  'Addition or conversion',
  'Whole-home remodel',
  'Deck, porch, or exterior',
];

const timelineOptions = ['Planning now', '1 to 3 months', '3 to 6 months', 'Flexible'];

const budgetRangeOptions = ['Under $25k', '$25k to $75k', '$75k to $150k', '$150k+'];

const contactMethodOptions = ['Phone call', 'Email', 'Text message'];

const initialEstimateForm: EstimateFormState = {
  budgetRange: budgetRangeOptions[0],
  contactMethod: contactMethodOptions[0],
  email: '',
  name: '',
  neighborhood: '',
  notes: '',
  phone: '',
  projectType: projectTypeOptions[0],
  timeline: timelineOptions[0],
};

function App() {
  const [currentPath, setCurrentPath] = useState<PagePath>(() =>
    getPagePath(window.location.pathname),
  );

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(getPagePath(window.location.pathname));
      window.scrollTo({ top: 0 });
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function navigate(path: PagePath) {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0 });
    }
  }

  return (
    <main className="min-h-screen bg-bone text-ink">
      <PageMetadata metadata={metadata[currentPath]} path={currentPath} />
      <Header currentPath={currentPath} onNavigate={navigate} />
      {currentPath === '/' ? <HomePage onNavigate={navigate} /> : null}
      {currentPath === '/services' ? <ServicesPage onNavigate={navigate} /> : null}
      {currentPath === '/projects' ? <ProjectsPage onNavigate={navigate} /> : null}
      {currentPath === '/process' ? <ProcessPage onNavigate={navigate} /> : null}
      {currentPath === '/about' ? <AboutPage onNavigate={navigate} /> : null}
      {currentPath === '/contact' ? <ContactPage /> : null}
      <Footer onNavigate={navigate} />
    </main>
  );
}

function PageMetadata({ metadata: pageMetadata, path }: { metadata: Metadata; path: PagePath }) {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}${path === '/' ? '/' : path}`;

    document.title = pageMetadata.title;
    setCanonicalLink(canonicalUrl);
    setMetaTag('name', 'description', pageMetadata.description);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', pageMetadata.title);
    setMetaTag('name', 'twitter:description', pageMetadata.description);
    setMetaTag('name', 'twitter:image', socialImageUrl);
    setMetaTag('property', 'og:site_name', 'The Good Build Co.');
    setMetaTag('property', 'og:title', pageMetadata.title);
    setMetaTag('property', 'og:description', pageMetadata.description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', socialImageUrl);
  }, [pageMetadata, path]);

  return null;
}

function Header({
  currentPath,
  onNavigate,
}: {
  currentPath: PagePath;
  onNavigate: (path: PagePath) => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-pine/15 bg-plaster/94 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <a
          className="font-display text-2xl font-semibold text-ink"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            onNavigate('/');
          }}
        >
          The Good Build Co.
        </a>
        <nav
          aria-label="Main navigation"
          className="flex gap-2 overflow-x-auto text-sm font-semibold text-ink/66"
        >
          {navItems.map((item) => (
            <a
              className={`whitespace-nowrap border px-3 py-2 transition ${
                currentPath === item.href
                  ? 'border-brass bg-pine text-white'
                  : 'border-pine/12 bg-limestone/55 hover:border-brass hover:text-pine'
              }`}
              href={item.href}
              key={item.href}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HomePage({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <TrustBand />
      <HomeServices onNavigate={onNavigate} />
      <HomeProjects onNavigate={onNavigate} />
      <HomeProcess onNavigate={onNavigate} />
      <HomeCta onNavigate={onNavigate} />
    </>
  );
}

function Hero({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt="Modern residential construction interior with warm wood details"
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=84"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-pine/84 to-steel/24" />
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
            <RouteButton label="Request an estimate" path="/contact" tone="solid" onNavigate={onNavigate} />
            <RouteButton label="View project style" path="/projects" tone="ghost" onNavigate={onNavigate} />
          </div>
        </div>

        <div className="border border-white/18 bg-pine/42 p-5 shadow-soft backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">
            Built around trust
          </p>
          <dl className="mt-6 grid gap-px overflow-hidden bg-white/18 sm:grid-cols-3 lg:grid-cols-1">
            {proofPoints.map(([stat, label]) => (
              <div className="bg-ink/46 p-5" key={label}>
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
  const trustItems = [
    {
      label: 'Scope-led estimates',
      text: 'Clear work descriptions before numbers start moving.',
    },
    {
      label: 'Respectful jobsite standards',
      text: 'Daily reset expectations and homeowner-friendly communication.',
    },
    {
      label: 'Residential-first craftsmanship',
      text: 'Details chosen for real homes, real routines, and long-term use.',
    },
  ];

  return (
    <section className="border-b border-pine/12 bg-limestone text-ink">
      <div className="mx-auto grid max-w-7xl gap-px bg-pine/12 px-5 py-px sm:px-8 md:grid-cols-3">
        {trustItems.map((item, index) => (
          <article className="grid gap-4 bg-plaster px-5 py-7 sm:grid-cols-[auto_1fr]" key={item.label}>
            <p className="font-display text-3xl font-semibold text-clay">
              {String(index + 1).padStart(2, '0')}
            </p>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-pine">
                {item.label}
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink/62">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomeServices({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  return (
    <section className="bg-bone py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="What we build"
          title="A contractor site that feels calm, capable, and easy to trust."
          text="The homepage stays scannable while deeper pages carry the service detail."
        />
        <div className="mt-10 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-2">
          {services.slice(0, 4).map((service) => (
            <ServiceCard service={service} key={service.title} />
          ))}
        </div>
        <div className="mt-8">
          <RouteButton label="Explore services" path="/services" tone="dark" onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
}

function HomeProjects({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  return (
    <section className="bg-gradient-to-br from-ink via-pine to-graphite py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="Project style"
          inverted
          title="Warm residential work, presented like a premium portfolio."
          text="Project previews make the demo feel more custom than a generic contractor homepage."
        />
        <ProjectGrid projects={projects.slice(0, 3)} />
        <div className="mt-8">
          <RouteButton label="View all projects" path="/projects" tone="light" onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
}

function HomeProcess({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  return (
    <section className="border-b border-pine/12 bg-plaster py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="How it works"
          title="A clear path from first walkthrough to final punch list."
          text="Contractor websites win when the homeowner understands what happens next."
        />
        <ProcessGrid compact />
        <div className="mt-8">
          <RouteButton label="See the process" path="/process" tone="dark" onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
}

function HomeCta({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  return (
    <section className="bg-bone py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-clay">Estimate</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight">
            Tell us what needs to work better at home.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-ink/66">
            The contact page now carries the full frontend-only estimate experience.
          </p>
        </div>
        <RouteButton label="Start estimate" path="/contact" tone="solidDark" onNavigate={onNavigate} />
      </div>
    </section>
  );
}

function ServicesPage({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Residential construction services with a scope-first point of view."
        text="This page gives the demo room to explain contractor services without weighing down the homepage."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-2">
            {services.map((service) => (
              <article className="bg-plaster p-7" key={service.title}>
                <div className="mb-7 h-2 w-16 bg-clay" />
                <h2 className="font-display text-3xl font-semibold text-ink">{service.title}</h2>
                <p className="mt-4 leading-7 text-ink/66">{service.text}</p>
                <p className="mt-5 text-sm leading-6 text-ink/58">{service.detail}</p>
                <p className="mt-7 border-t border-ink/10 pt-4 text-xs font-bold uppercase tracking-[0.16em] text-pine">
                  {service.fit}
                </p>
              </article>
            ))}
          </div>
          <ScopeBoard />
          <div className="mt-10">
            <RouteButton label="Request an estimate" path="/contact" tone="solidDark" onNavigate={onNavigate} />
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectsPage({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(projects[0].title);
  const filteredProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );
  const selectedProject =
    filteredProjects.find((project) => project.title === selectedProjectTitle) || filteredProjects[0];

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Real project storytelling, not just a grid of pretty rooms."
        text="A contractor portfolio should show what changed, how the scope was shaped, and why the final result feels right for the home."
      />
      <section className="bg-gradient-to-br from-ink via-pine to-graphite py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {projectCategories.map((category) => (
              <button
                className={`whitespace-nowrap border px-4 py-2 text-sm font-bold transition ${
                  activeCategory === category
                    ? 'border-copper bg-copper text-white'
                    : 'border-white/14 bg-white/8 text-white/72 hover:border-copper hover:text-white'
                }`}
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  const nextProject =
                    category === 'All'
                      ? projects[0]
                      : projects.find((project) => project.category === category);
                  setSelectedProjectTitle(nextProject?.title || projects[0].title);
                }}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <ProjectGrid
            activeTitle={selectedProject.title}
            onProjectSelect={setSelectedProjectTitle}
            projects={filteredProjects}
          />

          <ProjectCaseStudy project={selectedProject} />

          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {['Before/after ready', 'Scope-led writing', 'Service fit tags'].map((item) => (
              <div className="bg-ink p-6" key={item}>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-copper">
                  Portfolio feature
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold">{item}</h2>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <RouteButton label="Talk through a project" path="/contact" tone="light" onNavigate={onNavigate} />
          </div>
        </div>
      </section>
    </>
  );
}

function ProcessPage({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="Homeowners know what happens next, before the first wall opens."
        text="A clear process page helps the demo feel trustworthy and client-ready."
      />
      <section className="bg-plaster py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ProcessGrid />
          <div className="mt-8 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-4">
            {siteStandards.map((standard) => (
              <div className="bg-bone p-5 text-sm font-bold text-pine" key={standard}>
                {standard}
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-clay">
                Jobsite standard
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
                Clean communication is part of the craft.
              </h2>
            </div>
            <p className="leading-7 text-ink/66">
              The demo positions construction quality as more than finish work. It includes
              how the contractor writes scope, protects the home, handles changes, sequences
              decisions, and closes the project without loose ends.
            </p>
          </div>
          <div className="mt-10">
            <RouteButton label="Start with a walkthrough" path="/contact" tone="solidDark" onNavigate={onNavigate} />
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A contractor brand built around good work and straight answers."
        text="The about page gives the demo a human center without inventing a fake founder story."
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <img
              alt="Residential construction materials and framing detail"
              className="aspect-[4/3] w-full object-cover"
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=82"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-clay">
              Good work. Good people. Good builds.
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
              Trust is designed into the customer experience.
            </h2>
            <p className="mt-5 leading-7 text-ink/66">
              The Good Build Co. is a portfolio demo for residential contractors who need
              to look capable, organized, and easy to contact. The copy is warm, but the
              structure is practical: services, projects, process, and estimate flow.
            </p>
            <div className="mt-8 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {proofPoints.map(([stat, label]) => (
                <div className="bg-plaster p-5" key={label}>
                  <p className="font-display text-4xl font-semibold text-clay">{stat}</p>
                  <p className="mt-1 text-sm text-ink/62">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <RouteButton label="Plan a project" path="/contact" tone="solidDark" onNavigate={onNavigate} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [form, setForm] = useState<EstimateFormState>(initialEstimateForm);
  const [errors, setErrors] = useState<EstimateErrors>({});
  const [submittedRequest, setSubmittedRequest] = useState<EstimateFormState | null>(null);

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    const fieldName = name as keyof EstimateFormState;

    setForm((current) => ({
      ...current,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((current) => ({
        ...current,
        [fieldName]: undefined,
      }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateEstimateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmittedRequest(null);
      return;
    }

    setSubmittedRequest(form);
  }

  function resetForm() {
    setForm(initialEstimateForm);
    setErrors({});
    setSubmittedRequest(null);
  }

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-copper">
              Estimate
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight">
              Start with the work that matters most.
            </h1>
            <p className="mt-5 max-w-xl leading-7 text-white/68">
              Share the project type, timing, budget range, and what is not working at
              home. The first step is not a sales pitch. It is a clearer scope.
            </p>

            <div className="mt-9 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['1', 'Tell us what needs to change.'],
                ['2', 'We shape the first scope.'],
                ['3', 'You get a clearer next step.'],
              ].map(([number, text]) => (
                <div className="bg-ink/46 p-5" key={text}>
                  <p className="font-display text-4xl font-semibold text-brass">{number}</p>
                  <p className="mt-2 text-sm leading-6 text-white/64">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {submittedRequest ? (
              <EstimateConfirmation request={submittedRequest} onReset={resetForm} />
            ) : (
              <form
                className="grid gap-5 border border-white/14 bg-plaster p-6 text-ink shadow-soft"
                onSubmit={handleSubmit}
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">
                    Project snapshot
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold">
                    Tell us about the home.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-ink/62">
                    Keep it rough. A few useful details are enough for a first conversation.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    error={errors.name}
                    label="Name"
                    name="name"
                    onChange={updateField}
                    placeholder="Your name"
                    value={form.name}
                  />
                  <Field
                    error={errors.phone}
                    label="Phone"
                    name="phone"
                    onChange={updateField}
                    placeholder="(555) 555-1234"
                    value={form.phone}
                  />
                </div>
                <Field
                  error={errors.email}
                  label="Email"
                  name="email"
                  onChange={updateField}
                  placeholder="you@example.com"
                  type="email"
                  value={form.email}
                />
                <div className="grid gap-5 md:grid-cols-2">
                  <SelectField
                    label="Project type"
                    name="projectType"
                    onChange={updateField}
                    options={projectTypeOptions}
                    value={form.projectType}
                  />
                  <SelectField
                    label="Timeline"
                    name="timeline"
                    onChange={updateField}
                    options={timelineOptions}
                    value={form.timeline}
                  />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <SelectField
                    label="Budget range"
                    name="budgetRange"
                    onChange={updateField}
                    options={budgetRangeOptions}
                    value={form.budgetRange}
                  />
                  <Field
                    error={errors.neighborhood}
                    label="Neighborhood"
                    name="neighborhood"
                    onChange={updateField}
                    placeholder="Town or neighborhood"
                    value={form.neighborhood}
                  />
                </div>
                <SelectField
                  label="Preferred contact"
                  name="contactMethod"
                  onChange={updateField}
                  options={contactMethodOptions}
                  value={form.contactMethod}
                />
                <TextareaField
                  error={errors.notes}
                  label="Project notes"
                  name="notes"
                  onChange={updateField}
                  placeholder="Tell us about the home, timeline, budget range, and what you want to change."
                  value={form.notes}
                />
                <button
                  className="bg-pine px-6 py-3 text-sm font-bold text-white transition hover:bg-clay"
                  type="submit"
                >
                  Preview request
                </button>
              </form>
            )}

            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
              {['Review request', 'Schedule walkthrough', 'Shape first scope'].map((step) => (
                <div className="bg-ink/46 p-5 text-sm font-bold uppercase tracking-[0.14em] text-white/72" key={step}>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-pine/12 bg-limestone py-12">
        <div className="mx-auto grid max-w-7xl gap-px bg-pine/12 px-5 sm:px-8 md:grid-cols-3">
          {['No pressure walkthrough', 'Scope before numbers', 'Plain-language next steps'].map(
            (item) => (
              <div className="bg-plaster p-5 text-sm font-bold uppercase tracking-[0.16em] text-pine" key={item}>
                {item}
              </div>
            ),
          )}
        </div>
      </section>
    </>
  );
}

function PageHero({ eyebrow, text, title }: { eyebrow: string; text: string; title: string }) {
  return (
    <section className="border-b border-pine/20 bg-gradient-to-br from-ink via-pine to-graphite py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-copper">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-tight">
            {title}
          </h1>
        </div>
        <p className="max-w-xl leading-7 text-white/66">{text}</p>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="bg-plaster p-7">
      <div className="mb-7 h-2 w-16 bg-clay" />
      <h3 className="font-display text-3xl font-semibold text-ink">{service.title}</h3>
      <p className="mt-4 leading-7 text-ink/66">{service.text}</p>
    </article>
  );
}

function ProjectGrid({
  activeTitle,
  onProjectSelect,
  projects: projectItems,
}: {
  activeTitle?: string;
  onProjectSelect?: (title: string) => void;
  projects: Project[];
}) {
  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-3">
      {projectItems.map((project) => (
        <article
          className={`group overflow-hidden border transition ${
            activeTitle === project.title
              ? 'border-copper bg-white/12'
              : 'border-white/0 bg-white/8 hover:border-white/18'
          }`}
          key={project.title}
        >
          <img
            alt={project.title}
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            src={project.image}
          />
          <div className="p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-copper">
              {project.type} / {project.category}
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold">{project.title}</h3>
            <p className="mt-4 text-sm leading-6 text-white/62">{project.detail}</p>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-[0.16em] text-white/56">
              {project.stats}
            </p>
            {onProjectSelect ? (
              <button
                className="mt-5 border border-white/16 px-4 py-2 text-sm font-bold text-white/74 transition hover:border-copper hover:text-copper"
                onClick={() => onProjectSelect(project.title)}
                type="button"
              >
                View case notes
              </button>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <section className="mt-10 border border-white/10 bg-white/8">
      <div className="grid gap-px bg-white/10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-ink p-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-copper">
            Featured case notes
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
            {project.title}
          </h2>
          <p className="mt-5 leading-7 text-white/66">{project.challenge}</p>
          <div className="mt-8 grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2">
            <div className="bg-ink p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-copper">
                Before
              </p>
              <p className="mt-2 text-sm leading-6 text-white/64">
                A useful home with a pain point the project had to solve.
              </p>
            </div>
            <div className="bg-ink p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-copper">
                After
              </p>
              <p className="mt-2 text-sm leading-6 text-white/64">{project.result}</p>
            </div>
          </div>
        </div>

        <div className="bg-plaster p-6 text-ink">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">
                Scope
              </p>
              <ul className="mt-4 grid gap-3">
                {project.scope.map((item) => (
                  <li className="border-b border-ink/10 pb-3 text-sm font-bold text-ink/72" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">
                Finish notes
              </p>
              <ul className="mt-4 grid gap-3">
                {project.materials.map((item) => (
                  <li className="border-b border-ink/10 pb-3 text-sm font-bold text-ink/72" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 border border-ink/10 bg-bone p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-pine">
              Good build detail
            </p>
            <p className="mt-3 leading-7 text-ink/66">
              Each case study is structured around the homeowner problem, the construction
              scope, and the practical result. That is what makes the portfolio feel
              custom instead of template-made.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mt-10 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-4">
      {processSteps.map((step, index) => (
        <article className="bg-bone p-6" key={step.title}>
          <p className="font-display text-5xl font-semibold text-clay">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-8 text-lg font-bold text-ink">{step.title}</h3>
          {!compact ? <p className="mt-3 text-sm leading-6 text-ink/62">{step.text}</p> : null}
        </article>
      ))}
    </div>
  );
}

function ScopeBoard() {
  return (
    <div className="mt-10 grid gap-8 border border-pine/20 bg-gradient-to-br from-pine to-ink p-6 text-white lg:grid-cols-[0.78fr_1.22fr]">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-copper">Scope board</p>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
          The service page sells clarity, not just capability.
        </h2>
      </div>
      <div className="grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2">
        {['What changes', 'What stays', 'What decisions matter', 'What can wait'].map((item) => (
          <div className="bg-white/8 p-5 text-sm font-bold text-white/76" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function EstimateConfirmation({
  onReset,
  request,
}: {
  onReset: () => void;
  request: EstimateFormState;
}) {
  const summary = [
    ['Project type', request.projectType],
    ['Timeline', request.timeline],
    ['Budget range', request.budgetRange],
    ['Neighborhood', request.neighborhood],
    ['Preferred contact', request.contactMethod],
    ['Contact', `${request.name} / ${request.phone}`],
    ['Email', request.email],
    ['Notes', request.notes],
  ];

  return (
    <section className="border border-white/12 bg-plaster p-6 text-ink shadow-soft">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-pine">
        Request previewed
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold">
        Here is the project snapshot.
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink/62">
        This frontend demo now behaves like a real estimate intake: it checks the
        required details and returns a clear summary before anything is sent.
      </p>

      <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
        {summary.map(([label, value]) => (
          <div className="grid gap-2 py-3 md:grid-cols-[0.32fr_0.68fr]" key={label}>
            <dt className="text-sm font-bold text-clay">{label}</dt>
            <dd className="text-sm leading-6 text-ink/72">{value}</dd>
          </div>
        ))}
      </dl>

      <button
        className="mt-6 bg-pine px-6 py-3 text-sm font-bold text-white transition hover:bg-clay"
        onClick={onReset}
        type="button"
      >
        Start another preview
      </button>
    </section>
  );
}

function Field({
  error,
  label,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,
}: {
  error?: string;
  label: string;
  name: keyof EstimateFormState;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
  const errorId = `${name}-error`;

  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className="h-12 border border-pine/14 bg-limestone/45 px-3 text-sm font-medium text-ink outline-none focus:border-clay"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <span className="text-sm font-semibold text-clay" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

function SelectField({
  label,
  name,
  onChange,
  options,
  value,
}: {
  label: string;
  name: keyof EstimateFormState;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <select
        className="h-12 border border-pine/14 bg-limestone/45 px-3 text-sm font-medium text-ink outline-none focus:border-clay"
        name={name}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  error,
  label,
  name,
  onChange,
  placeholder,
  value,
}: {
  error?: string;
  label: string;
  name: keyof EstimateFormState;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  value: string;
}) {
  const errorId = `${name}-error`;

  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <textarea
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className="min-h-32 border border-pine/14 bg-limestone/45 px-3 py-3 text-sm font-medium text-ink outline-none focus:border-clay"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {error ? (
        <span className="text-sm font-semibold text-clay" id={errorId}>
          {error}
        </span>
      ) : null}
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

function RouteButton({
  label,
  onNavigate,
  path,
  tone,
}: {
  label: string;
  onNavigate: (path: PagePath) => void;
  path: PagePath;
  tone: 'dark' | 'ghost' | 'light' | 'solid' | 'solidDark';
}) {
  const toneClass = {
    dark: 'bg-pine text-white hover:bg-clay',
    ghost: 'border border-white/28 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-ink',
    light: 'bg-plaster text-ink hover:bg-brass hover:text-ink',
    solid: 'bg-copper text-white hover:bg-pine',
    solidDark: 'bg-pine text-white hover:bg-clay',
  }[tone];

  return (
    <a
      className={`inline-block px-6 py-3 text-center text-sm font-bold transition ${toneClass}`}
      href={path}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(path);
      }}
    >
      {label}
    </a>
  );
}

function Footer({ onNavigate }: { onNavigate: (path: PagePath) => void }) {
  return (
    <footer className="border-t border-pine/20 bg-ink py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-white/62 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-white">The Good Build Co.</p>
          <p className="mt-1">Good work. Good people. Good builds.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <a
              className="transition hover:text-copper"
              href={item.href}
              key={item.href}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

function validateEstimateForm(form: EstimateFormState) {
  const nextErrors: EstimateErrors = {};
  const phoneDigits = form.phone.replace(/\D/g, '');

  if (form.name.trim().length < 2) {
    nextErrors.name = 'Enter your name.';
  }

  if (phoneDigits.length < 10) {
    nextErrors.phone = 'Enter a phone number with area code.';
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    nextErrors.email = 'Enter a valid email address.';
  }

  if (form.neighborhood.trim().length < 2) {
    nextErrors.neighborhood = 'Enter a town or neighborhood.';
  }

  if (form.notes.trim().length < 12) {
    nextErrors.notes = 'Add a short note about the project.';
  }

  return nextErrors;
}

function getPagePath(pathname: string): PagePath {
  const normalized = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  if (pagePaths.has(normalized as PagePath)) {
    return normalized as PagePath;
  }

  return '/';
}

function setMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setCanonicalLink(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

export default App;
