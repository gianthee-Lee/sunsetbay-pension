import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const originalName = file.name;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = originalName.substring(originalName.lastIndexOf('.'));
    const filename = `pension-${uniqueSuffix}${ext}`;

    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload file' }, { status: 500 });
  }
}
