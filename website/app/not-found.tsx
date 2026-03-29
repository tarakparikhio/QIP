import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="section-card">
        <p className="eyebrow">Not Found</p>
        <h2>That lesson does not exist in the current export.</h2>
        <p className="body-copy">
          The route may be stale or the lesson slug may have changed.
        </p>
        <Link href="/" className="primary-link">
          Back to all lessons
        </Link>
      </section>
    </main>
  );
}
