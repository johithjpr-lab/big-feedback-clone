import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { enrollments } from '@/db/schema';
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
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const enrollment = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.id, parseInt(id)))
      .limit(1);

    if (enrollment.length === 0) {
      return NextResponse.json(
        { 
          error: 'Enrollment not found',
          code: 'ENROLLMENT_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(enrollment[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error as Error).message 
      },
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
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { 
          error: 'Enrollment not found',
          code: 'ENROLLMENT_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(enrollments)
      .where(eq(enrollments.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Enrollment deleted successfully',
        enrollment: deleted[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}