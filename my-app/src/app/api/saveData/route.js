import { getCustomSession } from '../sessionCode.js'

export async function GET(req, res) {

  let session = await getCustomSession();
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const manager = searchParams.get('manager')
  session.manager = manager; // setting the persons role into the session

  session.email = email;
  await session.save();

  console.log("data saved");

  return Response.json({email: email, manager: manager});
}