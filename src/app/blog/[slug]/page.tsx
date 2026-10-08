import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posts, getPost } from "@/content/blog";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Markdown, extractHeadings } from "@/components/shared/markdown";
import { PostCard, PostCover } from "@/components/shared/post-card";
import { BookButton, LeadMagnetButton } from "@/components/shared/cta-buttons";
import { CTASection } from "@/components/sections/cta-section";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return buildMetadata({ title: `${p.title} | D Expert Blog`, description: p.description, path: `/blog/${p.slug}`, keywords: p.keywords, type: "article", publishedTime: p.date });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const headings = extractHeadings(p.body);
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={[articleSchema({ title: p.title, description: p.description, path: `/blog/${p.slug}`, date: p.date }), ...(p.faqs ? [faqSchema(p.faqs)] : [])]} />
      <article className="pb-16 pt-32 md:pt-40">
        <header className="container-x max-w-4xl">
          <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }]} />
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{p.category}</span>
            <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time>
            <span>· {p.readingTime}</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-foreground md:text-5xl">{p.title}</h1>
          <p className="mt-5 text-lg text-muted">{p.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-secondary/50 text-sm font-semibold text-foreground">PT</span>
            <span>
              <Link href="/founder" className="block text-sm font-medium text-foreground hover:text-primary">{site.founder.name}</Link>
              <span className="block text-xs text-muted">{site.founder.role}</span>
            </span>
          </div>
        </header>
        <div className="container-x mt-10 max-w-5xl">
          <PostCover post={p} className="aspect-[21/9] rounded-[2rem] border border-white/10" />
        </div>
        <div className="container-x mt-12 grid max-w-6xl gap-12 lg:grid-cols-[1fr_260px]">
          <div className="min-w-0">
            <Markdown source={p.body} />
            {p.faqs && (
              <section className="mt-12">
                <h2 className="text-2xl font-semibold text-foreground">FAQs</h2>
                <dl className="mt-6 flex flex-col gap-4">
                  {p.faqs.map((f) => (
                    <div key={f.q} className="glass rounded-2xl p-5">
                      <dt className="font-medium text-foreground">{f.q}</dt>
                      <dd className="mt-2 text-sm text-muted">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
            <div className="mt-12">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                <ArrowLeft className="size-4" aria-hidden /> Back to all articles
              </Link>
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-5">
              <nav aria-label="Table of contents" className="glass rounded-2xl p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-subtle">On this page</p>
                <ul className="flex flex-col gap-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-muted hover:text-primary">{h.text}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="glass border-gradient rounded-2xl p-5">
                <p className="font-semibold text-foreground">Get a free AI audit</p>
                <p className="mt-1 text-sm text-muted">See what AI could automate in your business.</p>
                <LeadMagnetButton size="sm" className="mt-4 w-full">Get my audit</LeadMagnetButton>
                <BookButton size="sm" variant="secondary" className="mt-2 w-full">Book a call</BookButton>
              </div>
            </div>
          </aside>
        </div>
      </article>
      <section className="py-16">
        <div className="container-x">
          <h2 className="mb-8 text-2xl font-semibold text-foreground">Keep reading</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <PostCard key={r.slug} post={r} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
