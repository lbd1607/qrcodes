import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createBlog from "app/blogs/mutations/createBlog"
import { BlogForm, FORM_ERROR } from "app/blogs/components/BlogForm"

const NewBlogPage: BlitzPage = () => {
  const router = useRouter()
  const [createBlogMutation] = useMutation(createBlog)

  return (
    <div className="">
      <div className="container mx-auto px-4 flex flex-col min-w-0 break-words bg-white w-full flex-wrap justify-left  mt-20">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2 ml-4">Create New Blog</h1>
      </div>

      <BlogForm
        submitText="Save"
        cancelText="Cancel"
        cancelURL="/blogs"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateBlog}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const blog = await createBlogMutation(values)
            router.push(Routes.ShowBlogPage({ blogId: blog.id }))
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
  )
}

NewBlogPage.authenticate = true
NewBlogPage.getLayout = (page) => <Layout title={"Create New Blog"}>{page}</Layout>

export default NewBlogPage
