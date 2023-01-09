import { type ActionArgs, json } from "@remix-run/node"

import { sendMail } from "~/utils/mail.server"

export async function action({ request }: ActionArgs) {
  if (process.env.ALLOW_EMAILS !== "true") {
    return json({
      success: false,
      error: "Contact me not enabled at this time",
    })
  }

  const formData = await request.formData()

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = formData.get("message") as string

  const fields = { name, email, phone, message }

  const fieldErrors = {
    name: !name ? "Name is required" : null,
    email: !email ? "Email is required" : null,
    phone: !phone ? "Phone is required" : null,
    message: !message ? "Message is required" : null,
  }

  if (Object.values(fieldErrors).some(e => e)) {
    return json({ success: false, fieldErrors, fields })
  }

  await sendMail({
    name,
    email,
    phone,
    message,
  })

  return json({ success: true, fields })
}
