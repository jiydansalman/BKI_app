import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Query SQL murni (Pasti jalan di MySQL versi lama)
    const [rows]: any = await db.execute(
      'SELECT * FROM user WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      return NextResponse.json({ success: true, user: rows[0] });
    } else {
      return NextResponse.json({ success: false, message: 'User tidak ditemukan' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}