import { NextResponse } from 'next/server'
import type { Item } from '../../../types&interfaces/Item'

function generateCSV(list: Item[]) {
  console.log('generate')
  const headers: (keyof Item)[] = [
    'id',
    'title',
    'description',
    'images',
    'availabilityStatus',
    'brand',
    'price',
  ]

  const csvRows = []
  csvRows.push(headers.join(','))

  for (const item of list) {
    const row = headers.map((header) => `"${item[header]}"`)
    csvRows.push(row.join(','))
  }

  return csvRows.join('\n')
}

export async function POST(req: Request) {
  try {
    const { list } = await req.json()

    if (!list || list.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const csv = generateCSV(list)

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${list.length}_items.csv"`,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to generate CSV' }, { status: 500 })
  }
}
