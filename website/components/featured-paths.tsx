"use client";

import Link from "next/link";
import { featuredPaths } from "@/config/featured-paths";

export function FeaturedPaths() {
  return (
    <section className="featured-paths-section">
      <div className="featured-paths-header">
        <h2>Find Your Learning Path</h2>
        <p className="featured-intro">
          Choose a curated pathway designed for your learning style and goals.
        </p>
      </div>
      <div className="featured-paths-grid">
        {featuredPaths.map((path) => (
          <Link
            key={path.id}
            href={`/lessons/${path.targetLessonIds[0]}`}
            className={`featured-path-card path-color-${path.color}`}
          >
            <div className="path-emoji">{path.emoji}</div>
            <div className="path-content">
              <h3>{path.label}</h3>
              <p className="path-description">{path.description}</p>
              <div className="path-meta">
                <span className="path-count">
                  {path.targetLessonIds.length} lessons
                </span>
              </div>
            </div>
            <div className="path-cta">Start →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
