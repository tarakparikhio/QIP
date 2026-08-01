import { NextRequest, NextResponse } from 'next/server';
import { QUIZ_ANSWERS } from '@/lib/quizAnswers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lessonId = Number(body?.lessonId);
    const answer = body?.answer;

    if (!Number.isInteger(lessonId) || !['a', 'b', 'c', 'd'].includes(answer)) {
      return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
    }

    const correctAnswer = QUIZ_ANSWERS[lessonId];

    if (!correctAnswer) {
      return NextResponse.json({ ok: false, error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      isCorrect: answer === correctAnswer,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to validate quiz answer' }, { status: 500 });
  }
}
