import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courseEnrollments, courses } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single enrollment by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const enrollment = await db.select()
        .from(courseEnrollments)
        .where(eq(courseEnrollments.id, parseInt(id)))
        .limit(1);

      if (enrollment.length === 0) {
        return NextResponse.json({ 
          error: 'Enrollment not found',
          code: 'ENROLLMENT_NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(enrollment[0], { status: 200 });
    }

    // List enrollments with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status');

    let query = db.select().from(courseEnrollments);

    const conditions = [];

    // Search filter
    if (search) {
      conditions.push(
        or(
          like(courseEnrollments.studentName, `%${search}%`),
          like(courseEnrollments.studentEmail, `%${search}%`)
        )
      );
    }

    // Course ID filter
    if (courseId) {
      if (isNaN(parseInt(courseId))) {
        return NextResponse.json({ 
          error: "Valid courseId is required",
          code: "INVALID_COURSE_ID" 
        }, { status: 400 });
      }
      conditions.push(eq(courseEnrollments.courseId, parseInt(courseId)));
    }

    // Status filter
    if (status) {
      conditions.push(eq(courseEnrollments.enrollmentStatus, status));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(courseEnrollments.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, studentName, studentEmail, studentPhone, message, enrollmentStatus } = body;

    // Validate required fields
    if (!courseId) {
      return NextResponse.json({ 
        error: "courseId is required",
        code: "MISSING_COURSE_ID" 
      }, { status: 400 });
    }

    if (!studentName || typeof studentName !== 'string' || studentName.trim() === '') {
      return NextResponse.json({ 
        error: "studentName is required and must be a non-empty string",
        code: "MISSING_STUDENT_NAME" 
      }, { status: 400 });
    }

    if (!studentEmail || typeof studentEmail !== 'string' || studentEmail.trim() === '') {
      return NextResponse.json({ 
        error: "studentEmail is required and must be a non-empty string",
        code: "MISSING_STUDENT_EMAIL" 
      }, { status: 400 });
    }

    if (!studentPhone || typeof studentPhone !== 'string' || studentPhone.trim() === '') {
      return NextResponse.json({ 
        error: "studentPhone is required and must be a non-empty string",
        code: "MISSING_STUDENT_PHONE" 
      }, { status: 400 });
    }

    // Validate courseId is integer
    if (isNaN(parseInt(courseId))) {
      return NextResponse.json({ 
        error: "courseId must be a valid integer",
        code: "INVALID_COURSE_ID_TYPE" 
      }, { status: 400 });
    }

    // Validate course exists
    const course = await db.select()
      .from(courses)
      .where(eq(courses.id, parseInt(courseId)))
      .limit(1);

    if (course.length === 0) {
      return NextResponse.json({ 
        error: "Course not found",
        code: "COURSE_NOT_FOUND" 
      }, { status: 400 });
    }

    // Validate enrollmentStatus if provided
    if (enrollmentStatus) {
      const validStatuses = ['pending', 'confirmed', 'completed'];
      if (!validStatuses.includes(enrollmentStatus)) {
        return NextResponse.json({ 
          error: "enrollmentStatus must be one of: pending, confirmed, completed",
          code: "INVALID_ENROLLMENT_STATUS" 
        }, { status: 400 });
      }
    }

    // Sanitize inputs
    const sanitizedData = {
      courseId: parseInt(courseId),
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim().toLowerCase(),
      studentPhone: studentPhone.trim(),
      message: message ? message.trim() : null,
      enrollmentStatus: enrollmentStatus || 'pending',
      createdAt: new Date().toISOString()
    };

    const newEnrollment = await db.insert(courseEnrollments)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newEnrollment[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if enrollment exists
    const existingEnrollment = await db.select()
      .from(courseEnrollments)
      .where(eq(courseEnrollments.id, parseInt(id)))
      .limit(1);

    if (existingEnrollment.length === 0) {
      return NextResponse.json({ 
        error: 'Enrollment not found',
        code: 'ENROLLMENT_NOT_FOUND' 
      }, { status: 404 });
    }

    const body = await request.json();
    const { enrollmentStatus, message, studentName, studentEmail, studentPhone } = body;

    // Validate enrollmentStatus if provided
    if (enrollmentStatus) {
      const validStatuses = ['pending', 'confirmed', 'completed'];
      if (!validStatuses.includes(enrollmentStatus)) {
        return NextResponse.json({ 
          error: "enrollmentStatus must be one of: pending, confirmed, completed",
          code: "INVALID_ENROLLMENT_STATUS" 
        }, { status: 400 });
      }
    }

    // Prepare update data
    const updateData: any = {};

    if (enrollmentStatus !== undefined) {
      updateData.enrollmentStatus = enrollmentStatus;
    }

    if (message !== undefined) {
      updateData.message = message ? message.trim() : null;
    }

    if (studentName !== undefined) {
      updateData.studentName = studentName.trim();
    }

    if (studentEmail !== undefined) {
      updateData.studentEmail = studentEmail.trim().toLowerCase();
    }

    if (studentPhone !== undefined) {
      updateData.studentPhone = studentPhone.trim();
    }

    const updated = await db.update(courseEnrollments)
      .set(updateData)
      .where(eq(courseEnrollments.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if enrollment exists
    const existingEnrollment = await db.select()
      .from(courseEnrollments)
      .where(eq(courseEnrollments.id, parseInt(id)))
      .limit(1);

    if (existingEnrollment.length === 0) {
      return NextResponse.json({ 
        error: 'Enrollment not found',
        code: 'ENROLLMENT_NOT_FOUND' 
      }, { status: 404 });
    }

    const deleted = await db.delete(courseEnrollments)
      .where(eq(courseEnrollments.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: 'Enrollment deleted successfully',
      enrollment: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}