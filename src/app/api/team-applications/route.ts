import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { teamApplications } from '@/db/schema';
import { eq, like, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single application by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const application = await db
        .select()
        .from(teamApplications)
        .where(eq(teamApplications.id, parseInt(id)))
        .limit(1);

      if (application.length === 0) {
        return NextResponse.json(
          { error: 'Application not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(application[0], { status: 200 });
    }

    // List all applications with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(teamApplications);

    if (search) {
      query = query.where(
        or(
          like(teamApplications.name, `%${search}%`),
          like(teamApplications.email, `%${search}%`),
          like(teamApplications.positionApplied, `%${search}%`),
          like(teamApplications.specialization, `%${search}%`)
        )
      );
    }

    const results = await query
      .orderBy(desc(teamApplications.createdAt))
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

    // Validate required fields
    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!body.email || typeof body.email !== 'string' || body.email.trim() === '') {
      return NextResponse.json(
        { error: 'Email is required', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    if (!body.phone || typeof body.phone !== 'string' || body.phone.trim() === '') {
      return NextResponse.json(
        { error: 'Phone is required', code: 'MISSING_PHONE' },
        { status: 400 }
      );
    }

    if (!body.positionApplied || typeof body.positionApplied !== 'string' || body.positionApplied.trim() === '') {
      return NextResponse.json(
        { error: 'Position applied is required', code: 'MISSING_POSITION' },
        { status: 400 }
      );
    }

    if (!body.specialization || typeof body.specialization !== 'string' || body.specialization.trim() === '') {
      return NextResponse.json(
        { error: 'Specialization is required', code: 'MISSING_SPECIALIZATION' },
        { status: 400 }
      );
    }

    if (!body.yearsOfExperience || typeof body.yearsOfExperience !== 'string' || body.yearsOfExperience.trim() === '') {
      return NextResponse.json(
        { error: 'Years of experience is required', code: 'MISSING_EXPERIENCE' },
        { status: 400 }
      );
    }

    if (!body.coverLetter || typeof body.coverLetter !== 'string' || body.coverLetter.trim() === '') {
      return NextResponse.json(
        { error: 'Cover letter is required', code: 'MISSING_COVER_LETTER' },
        { status: 400 }
      );
    }

    // Sanitize and prepare data
    const applicationData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      positionApplied: body.positionApplied.trim(),
      specialization: body.specialization.trim(),
      yearsOfExperience: body.yearsOfExperience.trim(),
      coverLetter: body.coverLetter.trim(),
      resumeUrl: body.resumeUrl && typeof body.resumeUrl === 'string' && body.resumeUrl.trim() !== '' 
        ? body.resumeUrl.trim() 
        : null,
      linkedinUrl: body.linkedinUrl && typeof body.linkedinUrl === 'string' && body.linkedinUrl.trim() !== '' 
        ? body.linkedinUrl.trim() 
        : null,
      portfolioUrl: body.portfolioUrl && typeof body.portfolioUrl === 'string' && body.portfolioUrl.trim() !== '' 
        ? body.portfolioUrl.trim() 
        : null,
      createdAt: new Date().toISOString(),
    };

    const newApplication = await db
      .insert(teamApplications)
      .values(applicationData)
      .returning();

    return NextResponse.json(newApplication[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
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

    // Check if application exists
    const existing = await db
      .select()
      .from(teamApplications)
      .where(eq(teamApplications.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Application not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(teamApplications)
      .where(eq(teamApplications.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Application deleted successfully',
        application: deleted[0],
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