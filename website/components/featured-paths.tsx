import Link from "next/link";
import { featuredPaths } from "@/config/featured-paths";
import { getLessonsByIds } from "@/lib/lessons";

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
        {featuredPaths.map((path) => {
          const lessons = getLessonsByIds(path.lessonIds);
          const firstLesson = lessons[0];
          const lastLesson = lessons[lessons.length - 1];
          const stageLabels = Array.from(
            new Set(lessons.map((lesson) => lesson.learning_order.stage)),
          );

          return (
            <article
              key={path.id}
              className={`featured-path-card path-color-${path.color}`}
            >
              <div className="path-card-header">
                <div className="path-emoji">{path.emoji}</div>
                <div className="path-content">
                  <div className="path-meta-row">
                    <span className="path-pill">{lessons.length} lessons</span>
                    {firstLesson ? (
                      <span className="path-pill">
                        Starts at Lesson {firstLesson.lesson_id}
                      </span>
                    ) : null}
                    {stageLabels.length ? (
                      <span className="path-pill">
                        {stageLabels.join(" to ")}
                      </span>
                    ) : null}
                  </div>
                  <h3>{path.label}</h3>
                  <p className="path-description">{path.description}</p>
                </div>
              </div>

              <div className="path-detail-grid">
                <div className="path-detail-block">
                  <span className="path-detail-label">Best for</span>
                  <p>{path.bestFor}</p>
                </div>
                <div className="path-detail-block">
                  <span className="path-detail-label">Outcome</span>
                  <p>{path.outcome}</p>
                </div>
              </div>

              {lessons.length ? (
                <div className="path-lesson-preview">
                  <span className="path-detail-label">Path preview</span>
                  <div className="path-lesson-pills">
                    {lessons.slice(0, 4).map((lesson) => (
                      <Link
                        key={lesson.lesson_id}
                        href={`/lessons/${lesson.slug}`}
                        className="mini-link-pill"
                      >
                        {lesson.lesson_id}. {lesson.title}
                      </Link>
                    ))}
                    {lessons.length > 4 ? (
                      <span className="mini-link-pill muted-pill">
                        +{lessons.length - 4} more
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <div className="path-cta-row">
                {firstLesson ? (
                  <Link
                    href={`/lessons/${firstLesson.slug}`}
                    className="lesson-link"
                  >
                    Start with {firstLesson.title}
                  </Link>
                ) : null}
                <span className="path-cta">
                  Ends at {lastLesson ? lastLesson.title : "this path"}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
