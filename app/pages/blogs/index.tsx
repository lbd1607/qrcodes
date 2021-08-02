import { Fragment, Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBlogs from "app/blogs/queries/getBlogs"

const ITEMS_PER_PAGE = 100

export const BlogsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ blogs, hasMore }] = usePaginatedQuery(getBlogs, {
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" } as const

  var React = require("react")
  var QRCode = require("qrcode.react")

  return (
    <Fragment>
      <div className="container mx-auto px-4 mt-24">
        <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 ">
          <div className="px-6">
            <div className="flex flex-wrap justify-left">
              <div className="w-full lg:w-4/12 lg:text-left lg:self-left">
                <div className="py-6 mt-32 sm:mt-0">
                  <button
                    className="bg-green-500 active:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    <Link href={Routes.NewBlogPage()}>
                      <a>Create Blog</a>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div></div>
            <div className="text-left mt-12">
              <div>
                {blogs.map((blog) => (
                  <>
                    <div className="mb-20 hover:cursor-pointer" key={blog.id}>
                      <Link href={Routes.ShowBlogPage({ blogId: blog.id })}>
                        <div>
                          <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2 ">
                            {" "}
                            <a>{blog.title}</a>{" "}
                          </h3>
                          <div className="text-sm mt-0 mb-2 text-gray-500 font-bold uppercase">
                            {blog.updatedAt.toLocaleDateString(undefined, options)}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const BlogsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogsList />
        </Suspense>
      </div>
    </>
  )
}

BlogsPage.authenticate = true
BlogsPage.getLayout = (page) => <Layout>{page}</Layout>

export default BlogsPage
