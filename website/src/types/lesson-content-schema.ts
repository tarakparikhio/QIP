export type LessonBlockType =
  | 'heading'
  | 'paragraph'
  | 'ordered-list'
  | 'unordered-list'
  | 'math-inline'
  | 'math-block'
  | 'callout'
  | 'notation-box'
  | 'try-it'
  | 'code-inline'
  | 'section';

export interface LessonContentDocument {
  lessonSlug: string;
  title: string;
  version: number;
  blocks: LessonBlockRecord[];
}

export interface LessonBlockRecord {
  id: string;
  type: LessonBlockType;
  content?: string;
  math?: string;
  heading?: string;
  children?: LessonBlockRecord[];
  meta?: Record<string, string | number | boolean>;
}

export interface LessonContentAudit {
  generatedAt: string;
  lessonCount: number;
  tagsByLesson: Record<string, string[]>;
  reusableWidgetUsageByLesson: Record<string, string[]>;
  suggestedBlockTypes: LessonBlockType[];
}
