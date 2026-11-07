import { NextResponse } from 'next/server';
import { PRODUCTS, QUIZ_QUESTIONS } from '@/data/mockData';
import type { Product } from '@/types';

export async function POST(request: Request) {
  try {
    const { answers }: { answers: Record<number, string> } = await request.json();

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No quiz answers provided' },
        { status: 400 }
      );
    }

    // Extract tags from answered questions
    const userTags: string[] = [];
    QUIZ_QUESTIONS.forEach(q => {
      const chosenId = answers[q.id];
      const opt = q.options.find(o => o.id === chosenId);
      if (opt) {
        userTags.push(...opt.matchTags);
      }
    });

    // Score catalog products
    const scored = PRODUCTS.map(product => {
      let score = 0;
      product.ritualMatchTags.forEach(tag => {
        if (userTags.includes(tag)) {
          score += 3;
        }
      });
      score += product.rating;
      return { product, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Pick 6 diverse items ensuring cross-category variety
    const selected: Product[] = [];
    const categoriesSeen = new Set<string>();

    for (const item of scored) {
      if (!categoriesSeen.has(item.product.category) && selected.length < 6) {
        selected.push(item.product);
        categoriesSeen.add(item.product.category);
      }
    }

    for (const item of scored) {
      if (selected.length < 6 && !selected.some(p => p.id === item.product.id)) {
        selected.push(item.product);
      }
    }

    // Sensory preview notes
    const sensoryNotes = Array.from(new Set(selected.flatMap(p => p.sensoryNotes))).slice(0, 5);

    const rawUSD = selected.reduce((s, i) => s + i.priceUSD, 0);
    const rawBDT = selected.reduce((s, i) => s + i.priceBDT, 0);
    const discUSD = +(rawUSD * 0.85).toFixed(2);
    const discBDT = Math.round(rawBDT * 0.85);

    return NextResponse.json({
      success: true,
      curatedBox: {
        tier: 'curated',
        slots: 6,
        discountPercentage: 15,
        matchScore: 98,
        dominantAromatics: sensoryNotes,
        items: selected,
        pricing: {
          rawUSD: +rawUSD.toFixed(2),
          rawBDT,
          discountedUSD: discUSD,
          discountedBDT: discBDT,
          savingsUSD: +(rawUSD - discUSD).toFixed(2),
          savingsBDT: rawBDT - discBDT,
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Auto-curation failed' },
      { status: 500 }
    );
  }
}
