import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courseEnrollments } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        },
        { status: 400 }
      );
    }

    const enrollment = await db.select()
      .from(courseEnrollments)
      .where(eq(courseEnrollments.id, parseInt(id)))
      .limit(1);

    if (enrollment.length === 0) {
      return NextResponse.json(
        { 
          error: "Enrollment not found",
          code: "ENROLLMENT_NOT_FOUND" 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(enrollment[0], { status: 200 });
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
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        },
        { status: 400 }
      );
    }

    const existing = await db.select()
      .from(courseEnrollments)
      .where(eq(courseEnrollments.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { 
          error: "Enrollment not found",
          code: "ENROLLMENT_NOT_FOUND" 
        },
        { status: 404 }
      );
    }

    const body = await request.json();
    
    const updates: any = {};
    
    if (body.courseId !== undefined) updates.courseId = body.courseId;
    if (body.studentName !== undefined) updates.studentName = body.studentName.trim();
    if (body.studentEmail !== undefined) updates.studentEmail = body.studentEmail.toLowerCase().trim();
    if (body.studentPhone !== undefined) updates.studentPhone = body.studentPhone.trim();
    if (body.message !== undefined) updates.message = body.message ? body.message.trim() : null;
    if (body.enrollmentStatus !== undefined) updates.enrollmentStatus = body.enrollmentStatus;

    const updated = await db.update(courseEnrollments)
      .set(updates)
      .where(eq(courseEnrollments.id, parseInt(id)))
      .returning();

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
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        },
        { status: 400 }
      );
    }

    const existing = await db.select()
      .from(courseEnrollments)
      .where(eq(courseEnrollments.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { 
          error: "Enrollment not found",
          code: "ENROLLMENT_NOT_FOUND" 
        },
        { status: 404 }
      );
    }

    const deleted = await db.delete(courseEnrollments)
      .where(eq(courseEnrollments.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: "Enrollment deleted successfully",
        enrollment: deleted[0]
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