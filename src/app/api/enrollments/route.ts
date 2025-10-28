import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { enrollments } from '@/db/schema';
import { eq, like, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single enrollment by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { 
            error: 'Valid ID is required',
            code: 'INVALID_ID' 
          },
          { status: 400 }
        );
      }

      const enrollment = await db.select()
        .from(enrollments)
        .where(eq(enrollments.id, parseInt(id)))
        .limit(1);

      if (enrollment.length === 0) {
        return NextResponse.json(
          { 
            error: 'Enrollment not found',
            code: 'NOT_FOUND' 
          },
          { status: 404 }
        );
      }

      return NextResponse.json(enrollment[0], { status: 200 });
    }

    // List enrollments with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(enrollments).orderBy(desc(enrollments.createdAt));

    if (search) {
      const searchTerm = `%${search}%`;
      query = query.where(
        or(
          like(enrollments.name, searchTerm),
          like(enrollments.email, searchTerm),
          like(enrollments.phone, searchTerm)
        )
      );
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, courseInterested, message } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Name is required and must be a non-empty string',
          code: 'MISSING_NAME' 
        },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Email is required and must be a non-empty string',
          code: 'MISSING_EMAIL' 
        },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Phone is required and must be a non-empty string',
          code: 'MISSING_PHONE' 
        },
        { status: 400 }
      );
    }

    // Prepare enrollment data
    const enrollmentData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      courseInterested: courseInterested ? courseInterested.trim() : null,
      message: message ? message.trim() : null,
      createdAt: new Date().toISOString()
    };

    // Insert enrollment
    const newEnrollment = await db.insert(enrollments)
      .values(enrollmentData)
      .returning();

    return NextResponse.json(newEnrollment[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Check if enrollment exists
    const existingEnrollment = await db.select()
      .from(enrollments)
      .where(eq(enrollments.id, parseInt(id)))
      .limit(1);

    if (existingEnrollment.length === 0) {
      return NextResponse.json(
        { 
          error: 'Enrollment not found',
          code: 'NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Delete enrollment
    const deleted = await db.delete(enrollments)
      .where(eq(enrollments.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      { 
        message: 'Enrollment deleted successfully',
        deleted: deleted[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}