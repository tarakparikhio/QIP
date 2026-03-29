import Link from "next/link";
import { featuredPaths } from "@/config/featured-paths";
import type { Lesson } from "@/lib/lessons";

const stageOrder: Array<Lesson["learning_order"]["stage"]> = [
  "foundation",
  "intermediate",
  "advanced",
];

function formatStageLabel(stage: Lesson["learning_order"]["stage"]) {
  return stage.charAt(0).toUpperCase() + stage.slice(1);
}

export function LessonSidebar({
  currentLesson,
  lessons,
}: {
  currentLesson: Lesson;
  lessons: Lesson[];
}) {
  const activePaths = featuredPaths.filter((path) =>
    path.lessonIds.includes(currentLesson.lesson_id),
  );

  return (
    <aside className="lesson-sidebar" aria-label="Lesson navigation">
      <div className="lesson-sidebar-card lesson-sidebar-card--sticky">
        <div className="lesson-sidebar-intro">
          <p className="eyebrow">Lesson Map</p>
          <h3>Browse the full curriculum</h3>
          <p className="body-copy">
            Keep your place while moving across the atlas. The current lesson is
            highlighted so you can jump sideways without losing context.
          </p>
        </div>

        {activePaths.length ? (
          <section className="lesson-sidebar-paths">
            <span className="path-detail-label">This lesson appears in</span>
            <div className="prereq-chip-row">
              {activePaths.map((path) => (
                <span className="mini-link-pill" key={path.id}>
                  {path.label}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <div className="lesson-sidebar-groups">
          {stageOrder.map((stage) => {
            const stageLessons = lessons.filter(
              (lesson) => lesson.learning_order.stage === stage,
            );

            if (!stageLessons.length) {
              return null;
            }

            return (
              <section className="lesson-sidebar-group" key={stage}>
                <div className="sidebar-group-header">
                  <span>{formatStageLabel(stage)}</span>
                  <span>{stageLessons.length}</span>
                </div>
                <nav
                  className="lesson-sidebar-list"
                  aria-label={`${formatStageLabel(stage)} lessons`}
                >
                  {stageLessons.map((lesson) => {
                    const isCurrent = lesson.slug === currentLesson.slug;

                    return (
                      <Link
                        key={lesson.lesson_id}
                        href={`/lessons/${lesson.slug}`}
                        className={`lesson-sidebar-link${
                          isCurrent ? " is-current" : ""
                        }`}
                        aria-current={isCurrent ? "page" : undefined}
                      >
                        <span className="lesson-sidebar-link-topline">
                          Lesson {lesson.lesson_id}
                        </span>
                        <strong>{lesson.title}</strong>
                      </Link>
                    );
                  })}
                </nav>
              </section>
            );
          })}
        </div>
      </div>
    </aside>
  );
}