import User from '@/models/User';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Sequelize akan mencari ke tabel 'user' yang sudah ada di MySQL
  const user = await User.findOne({ 
    where: { 
      username: username,
      password: password 
    } 
  });

  if (user) {
    return Response.json({ success: true, user });
  }
  return Response.json({ success: false, message: "User tidak ditemukan atau password salah" }, { status: 401 });
}