import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const course = await db
      .select()
      .from(courses)
      .where(eq(courses.id, parseInt(id)))
      .limit(1);

    if (course.length === 0) {
      return NextResponse.json(
        { error: 'Course not found', code: 'COURSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(course[0], { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existingCourse = await db
      .select()
      .from(courses)
      .where(eq(courses.id, parseInt(id)))
      .limit(1);

    if (existingCourse.length === 0) {
      return NextResponse.json(
        { error: 'Course not found', code: 'COURSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const updates: any = {};

    if (body.slug !== undefined) updates.slug = body.slug;
    if (body.category !== undefined) updates.category = body.category;
    if (body.title !== undefined) updates.title = body.title;
    if (body.description !== undefined) updates.description = body.description;
    if (body.thumbnail !== undefined) updates.thumbnail = body.thumbnail;
    if (body.videoUrl !== undefined) updates.videoUrl = body.videoUrl;
    if (body.rating !== undefined) updates.rating = body.rating;
    if (body.students !== undefined) updates.students = body.students;
    if (body.duration !== undefined) updates.duration = body.duration;
    if (body.price !== undefined) updates.price = body.price;
    if (body.instructor !== undefined) updates.instructor = body.instructor;
    if (body.level !== undefined) updates.level = body.level;
    if (body.topics !== undefined) updates.topics = body.topics;

    const updated = await db
      .update(courses)
      .set(updates)
      .where(eq(courses.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Course not found', code: 'COURSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existingCourse = await db
      .select()
      .from(courses)
      .where(eq(courses.id, parseInt(id)))
      .limit(1);

    if (existingCourse.length === 0) {
      return NextResponse.json(
        { error: 'Course not found', code: 'COURSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(courses)
      .where(eq(courses.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Course deleted successfully',
        course: deleted[0],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}