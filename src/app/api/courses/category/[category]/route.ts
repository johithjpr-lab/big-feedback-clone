import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

const VALID_CATEGORIES = ["Software Development", "Accounting", "SAP", "Design"];

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    
    // URL decode the category parameter
    const decodedCategory = decodeURIComponent(params.category);
    
    // Validate category
    if (!VALID_CATEGORIES.includes(decodedCategory)) {
      return NextResponse.json(
        { 
          error: `Invalid category. Valid categories are: ${VALID_CATEGORIES.join(', ')}`,
          code: "INVALID_CATEGORY" 
        },
        { status: 400 }
      );
    }
    
    // Pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    // Query courses by category with pagination
    const results = await db
      .select()
      .from(courses)
      .where(eq(courses.category, decodedCategory))
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