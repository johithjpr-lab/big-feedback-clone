import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq, like, or, desc, and } from 'drizzle-orm';

const VALID_CATEGORIES = ['Software Development', 'Accounting', 'SAP', 'Design'];
const VALID_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
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
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = db.select().from(courses);

    const conditions = [];

    if (category) {
      conditions.push(eq(courses.category, category));
    }

    if (search) {
      conditions.push(
        or(
          like(courses.title, `%${search}%`),
          like(courses.description, `%${search}%`),
          like(courses.instructor, `%${search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(conditions.length === 1 ? conditions[0] : and(...conditions));
    }

    const results = await query
      .orderBy(desc(courses.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      category,
      title,
      description,
      thumbnail,
      videoUrl,
      rating,
      students,
      duration,
      price,
      instructor,
      level,
      topics,
    } = body;

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { error: 'Slug is required and must be a non-empty string', code: 'MISSING_SLUG' },
        { status: 400 }
      );
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
      return NextResponse.json(
        { error: 'Category is required and must be a non-empty string', code: 'MISSING_CATEGORY' },
        { status: 400 }
      );
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        {
          error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
          code: 'INVALID_CATEGORY',
        },
        { status: 400 }
      );
    }

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required and must be a non-empty string', code: 'MISSING_TITLE' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json(
        { error: 'Description is required and must be a non-empty string', code: 'MISSING_DESCRIPTION' },
        { status: 400 }
      );
    }

    if (!thumbnail || typeof thumbnail !== 'string' || thumbnail.trim() === '') {
      return NextResponse.json(
        { error: 'Thumbnail is required and must be a non-empty string', code: 'MISSING_THUMBNAIL' },
        { status: 400 }
      );
    }

    if (!videoUrl || typeof videoUrl !== 'string' || videoUrl.trim() === '') {
      return NextResponse.json(
        { error: 'Video URL is required and must be a non-empty string', code: 'MISSING_VIDEO_URL' },
        { status: 400 }
      );
    }

    if (rating === undefined || rating === null || typeof rating !== 'number') {
      return NextResponse.json(
        { error: 'Rating is required and must be a number', code: 'MISSING_RATING' },
        { status: 400 }
      );
    }

    if (students === undefined || students === null || typeof students !== 'number') {
      return NextResponse.json(
        { error: 'Students is required and must be a number', code: 'MISSING_STUDENTS' },
        { status: 400 }
      );
    }

    if (duration === undefined || duration === null || typeof duration !== 'number') {
      return NextResponse.json(
        { error: 'Duration is required and must be a number', code: 'MISSING_DURATION' },
        { status: 400 }
      );
    }

    if (price === undefined || price === null || typeof price !== 'number') {
      return NextResponse.json(
        { error: 'Price is required and must be a number', code: 'MISSING_PRICE' },
        { status: 400 }
      );
    }

    if (!instructor || typeof instructor !== 'string' || instructor.trim() === '') {
      return NextResponse.json(
        { error: 'Instructor is required and must be a non-empty string', code: 'MISSING_INSTRUCTOR' },
        { status: 400 }
      );
    }

    if (!level || typeof level !== 'string' || level.trim() === '') {
      return NextResponse.json(
        { error: 'Level is required and must be a non-empty string', code: 'MISSING_LEVEL' },
        { status: 400 }
      );
    }

    if (!VALID_LEVELS.includes(level)) {
      return NextResponse.json(
        {
          error: `Level must be one of: ${VALID_LEVELS.join(', ')}`,
          code: 'INVALID_LEVEL',
        },
        { status: 400 }
      );
    }

    if (!topics || !Array.isArray(topics)) {
      return NextResponse.json(
        { error: 'Topics is required and must be an array', code: 'MISSING_TOPICS' },
        { status: 400 }
      );
    }

    const newCourse = await db
      .insert(courses)
      .values({
        slug: slug.trim(),
        category: category.trim(),
        title: title.trim(),
        description: description.trim(),
        thumbnail: thumbnail.trim(),
        videoUrl: videoUrl.trim(),
        rating,
        students,
        duration,
        price,
        instructor: instructor.trim(),
        level: level.trim(),
        topics,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newCourse[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

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

    if (body.slug !== undefined) {
      if (typeof body.slug !== 'string' || body.slug.trim() === '') {
        return NextResponse.json(
          { error: 'Slug must be a non-empty string', code: 'INVALID_SLUG' },
          { status: 400 }
        );
      }
      updates.slug = body.slug.trim();
    }

    if (body.category !== undefined) {
      if (typeof body.category !== 'string' || body.category.trim() === '') {
        return NextResponse.json(
          { error: 'Category must be a non-empty string', code: 'INVALID_CATEGORY' },
          { status: 400 }
        );
      }
      if (!VALID_CATEGORIES.includes(body.category)) {
        return NextResponse.json(
          {
            error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
            code: 'INVALID_CATEGORY',
          },
          { status: 400 }
        );
      }
      updates.category = body.category.trim();
    }

    if (body.title !== undefined) {
      if (typeof body.title !== 'string' || body.title.trim() === '') {
        return NextResponse.json(
          { error: 'Title must be a non-empty string', code: 'INVALID_TITLE' },
          { status: 400 }
        );
      }
      updates.title = body.title.trim();
    }

    if (body.description !== undefined) {
      if (typeof body.description !== 'string' || body.description.trim() === '') {
        return NextResponse.json(
          { error: 'Description must be a non-empty string', code: 'INVALID_DESCRIPTION' },
          { status: 400 }
        );
      }
      updates.description = body.description.trim();
    }

    if (body.thumbnail !== undefined) {
      if (typeof body.thumbnail !== 'string' || body.thumbnail.trim() === '') {
        return NextResponse.json(
          { error: 'Thumbnail must be a non-empty string', code: 'INVALID_THUMBNAIL' },
          { status: 400 }
        );
      }
      updates.thumbnail = body.thumbnail.trim();
    }

    if (body.videoUrl !== undefined) {
      if (typeof body.videoUrl !== 'string' || body.videoUrl.trim() === '') {
        return NextResponse.json(
          { error: 'Video URL must be a non-empty string', code: 'INVALID_VIDEO_URL' },
          { status: 400 }
        );
      }
      updates.videoUrl = body.videoUrl.trim();
    }

    if (body.rating !== undefined) {
      if (typeof body.rating !== 'number') {
        return NextResponse.json(
          { error: 'Rating must be a number', code: 'INVALID_RATING' },
          { status: 400 }
        );
      }
      updates.rating = body.rating;
    }

    if (body.students !== undefined) {
      if (typeof body.students !== 'number') {
        return NextResponse.json(
          { error: 'Students must be a number', code: 'INVALID_STUDENTS' },
          { status: 400 }
        );
      }
      updates.students = body.students;
    }

    if (body.duration !== undefined) {
      if (typeof body.duration !== 'number') {
        return NextResponse.json(
          { error: 'Duration must be a number', code: 'INVALID_DURATION' },
          { status: 400 }
        );
      }
      updates.duration = body.duration;
    }

    if (body.price !== undefined) {
      if (typeof body.price !== 'number') {
        return NextResponse.json(
          { error: 'Price must be a number', code: 'INVALID_PRICE' },
          { status: 400 }
        );
      }
      updates.price = body.price;
    }

    if (body.instructor !== undefined) {
      if (typeof body.instructor !== 'string' || body.instructor.trim() === '') {
        return NextResponse.json(
          { error: 'Instructor must be a non-empty string', code: 'INVALID_INSTRUCTOR' },
          { status: 400 }
        );
      }
      updates.instructor = body.instructor.trim();
    }

    if (body.level !== undefined) {
      if (typeof body.level !== 'string' || body.level.trim() === '') {
        return NextResponse.json(
          { error: 'Level must be a non-empty string', code: 'INVALID_LEVEL' },
          { status: 400 }
        );
      }
      if (!VALID_LEVELS.includes(body.level)) {
        return NextResponse.json(
          {
            error: `Level must be one of: ${VALID_LEVELS.join(', ')}`,
            code: 'INVALID_LEVEL',
          },
          { status: 400 }
        );
      }
      updates.level = body.level.trim();
    }

    if (body.topics !== undefined) {
      if (!Array.isArray(body.topics)) {
        return NextResponse.json(
          { error: 'Topics must be an array', code: 'INVALID_TOPICS' },
          { status: 400 }
        );
      }
      updates.topics = body.topics;
    }

    const updatedCourse = await db
      .update(courses)
      .set(updates)
      .where(eq(courses.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedCourse[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

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
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}