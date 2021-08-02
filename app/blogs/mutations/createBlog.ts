import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateBlog = z.object({
  title: z.string(),
  content: z.string(),
  /* MODEL
  id        Int      @id @default(autoincrement())
  title     String?
  content   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int */
})

export default resolver.pipe(resolver.zod(CreateBlog), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const blog = await db.blog.create({ data: input })

  return blog
})
