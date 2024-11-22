import { getCustomSession } from "../sessionCode.js";

export async function GET(req, res) {

  let session = await getCustomSession();

  let manager = session.manager;
  console.log(manager);

  let email = session.email;
  console.log(email);

  return Response.json({ manager, email });
}