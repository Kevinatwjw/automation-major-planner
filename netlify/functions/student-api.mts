import { neon } from '@netlify/neon';

interface StudentData {
  id: string;
  name: string;
  selectedIds: string[];
}

export default async (req: Request) => {
  const sql = neon(process.env.NETLIFY_DATABASE_URL);

  // 建表
  await sql`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL
    );
  `;

  // GET: 读取
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response("Missing ID", { status: 400 });

    const rows = await sql`SELECT data FROM students WHERE id = ${id}`;
    if (rows.length === 0) return new Response(JSON.stringify(null), { status: 200 });
    
    return new Response(JSON.stringify(rows[0].data), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
  }

  // POST: 保存
  if (req.method === 'POST') {
    try {
      const body = await req.json() as StudentData;
      await sql`
        INSERT INTO students (id, data) 
        VALUES (${body.id}, ${JSON.stringify(body)}) 
        ON CONFLICT (id) 
        DO UPDATE SET data = ${JSON.stringify(body)}
      `;
      return new Response("Saved", { status: 200 });
    } catch (error) {
      return new Response("Error", { status: 500 });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};

