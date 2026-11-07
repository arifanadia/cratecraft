import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();
  const tag = searchParams.get('tag');

  let filtered = [...PRODUCTS];

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (tag && tag !== 'All') {
    filtered = filtered.filter(p => 
      p.badges.some(b => b.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  if (search) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search) ||
      p.artisan.origin.toLowerCase().includes(search) ||
      p.sensoryNotes.some(n => n.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    products: filtered,
    meta: {
      categories: [
        'All',
        'Organic Pantry Essentials',
        'Superfoods & Nuts',
        'Specialty Coffee & Tea',
        'Artisanal Snacks',
        'Self-Care & Apothecary',
        'Mindful Stationery'
      ],
      tags: ['All', 'Organic', 'Direct Trade', 'Plastic-Free', 'Small-Batch']
    }
  });
}
