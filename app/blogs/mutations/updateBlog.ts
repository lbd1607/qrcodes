import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBlog = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  qrcode: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateBlog),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const blog = await db.blog.update({ where: { id }, data })

    return blog
  }
)
