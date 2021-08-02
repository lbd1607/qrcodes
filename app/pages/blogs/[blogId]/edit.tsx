import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBlog from "app/blogs/queries/getBlog"
import updateBlog from "app/blogs/mutations/updateBlog"
import { BlogForm, FORM_ERROR } from "app/blogs/components/BlogForm"

export const EditBlog = () => {
  const router = useRouter()
  const blogId = useParam("blogId", "number")
  const [blog, { setQueryData }] = useQuery(
    getBlog,
    { id: blogId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateBlogMutation] = useMutation(updateBlog)

  return (
    <>
      <Head>
        <title>Edit {blog.title}</title>
      </Head>

      <div>
        <BlogForm
          submitText="Save"
          cancelText="Cancel"
          cancelURL="/blogs"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateBlog}
          initialValues={blog}
          onSubmit={async (values) => {
            try {
              const updated = await updateBlogMutation({
                id: blog.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowBlogPage({ blogId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
          onCancel={async () => {
            try {
              router.back()
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditBlogPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBlog />
      </Suspense>
    </div>
  )
}

EditBlogPage.authenticate = true
EditBlogPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBlogPage
