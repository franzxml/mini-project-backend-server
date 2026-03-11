import { db } from "./db";

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    if (pathname === "/mahasiswa") {
      if (req.method === "POST") {
        const body = (await req.json()) as any;
        await db.query(
          "INSERT INTO mahasiswa (nama,jurusan) VALUES (?,?)",
          [body.nama, body.jurusan]
        );
        return Response.json({ message: "Data berhasil ditambah" });
      }
      const [rows] = await db.query("SELECT * FROM mahasiswa");
      return Response.json(rows);
    }

    if (pathname === "/matakuliah") {
      if (req.method === "POST") {
        const body = (await req.json()) as any;
        await db.query(
          "INSERT INTO mata_kuliah (nama_mk, sks) VALUES (?,?)",
          [body.nama_mk, body.sks]
        );
        return Response.json({ message: "Mata kuliah berhasil ditambah" });
      }
      const [rows] = await db.query("SELECT * FROM mata_kuliah");
      return Response.json(rows);
    }

    // Handle /mahasiswa/:id
    if (pathname.startsWith("/mahasiswa/")) {
      const id = pathname.split("/")[2];
      if (req.method === "PUT") {
        const body = (await req.json()) as any;
        await db.query(
          "UPDATE mahasiswa SET nama = ?, jurusan = ? WHERE id = ?",
          [body.nama, body.jurusan, id]
        );
        return Response.json({ message: "Data berhasil diupdate" });
      }
      if (req.method === "DELETE") {
        await db.query("DELETE FROM mahasiswa WHERE id = ?", [id]);
        return Response.json({ message: "Data berhasil dihapus" });
      }
    }

    // Handle /matakuliah/:id
    if (pathname.startsWith("/matakuliah/")) {
      const id = pathname.split("/")[2];
      if (req.method === "PUT") {
        const body = (await req.json()) as any;
        await db.query(
          "UPDATE mata_kuliah SET nama_mk = ?, sks = ? WHERE id = ?",
          [body.nama_mk, body.sks, id]
        );
        return Response.json({ message: "Mata kuliah berhasil diupdate" });
      }
      if (req.method === "DELETE") {
        await db.query("DELETE FROM mata_kuliah WHERE id = ?", [id]);
        return Response.json({ message: "Mata kuliah berhasil dihapus" });
      }
    }

    return new Response("API Backend Bun");
  }
});
