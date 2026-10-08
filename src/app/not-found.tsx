import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-24">
      <div className="container-x flex flex-col items-center gap-6 text-center">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="text-4xl font-semibold text-foreground md:text-6xl">This page took a wrong turn.</h1>
        <p className="max-w-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved. Our AI receptionist would have answered, but here are some useful places to go.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild><Link href="/">Back to home</Link></Button>
          <Button variant="secondary" asChild><Link href="/services">Our services</Link></Button>
          <Button variant="secondary" asChild><Link href="/tools">Free tools</Link></Button>
        </div>
      </div>
    </section>
  );
}
