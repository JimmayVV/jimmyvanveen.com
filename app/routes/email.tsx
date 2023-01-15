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
  const captcha = formData.get("captcha")

  // Ping the google recaptcha verify API to verify the captcha code you received
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      method: "POST",
    },
  )

  const data = await response.json()

  /**
   * The structure of response from the veirfy API is
   * {
   *  "success": true|false,
   *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
   *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
   *  "error-codes": [...]        // optional
    }
   */

  const fields = { name, email, phone, message }

  const fieldErrors = {
    name: !name ? "Name is required" : null,
    email: !email ? "Email is required" : null,
    phone: !phone ? "Phone is required" : null,
    message: !message ? "Message is required" : null,
  }

  if (Object.values(fieldErrors).some(e => e) || !data.success) {
    return json({
      success: false,
      fieldErrors,
      fields,
      error: !data.success
        ? "Unproccesable request, Invalid captcha code"
        : undefined,
    })
  }

  await sendMail({
    name,
    email,
    phone,
    message,
  })

  return json({ success: true, fields })
}
