import { Suspense, Fragment } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBlog from "app/blogs/queries/getBlog"
import deleteBlog from "app/blogs/mutations/deleteBlog"
import { BlogsList } from "."

export const Blog = () => {
  const router = useRouter()
  const blogId = useParam("blogId", "number")
  const [deleteBlogMutation] = useMutation(deleteBlog)
  const [blog] = useQuery(getBlog, { id: blogId })

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" } as const

  var React = require("react")
  var QRCode = require("qrcode.react")

  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>

      <Fragment>
        <div className="container mx-auto px-4 mt-24 print:mt-5">
          <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 ">
            <div className="px-6">
              <div className="mb-10 text-blue-600 hover:text-blue-800 print:hidden">
                <Link href={Routes.BlogsPage()}>
                  <span>
                    {"< "} <a className="hover:underline cursor-pointer } ">Back</a>
                  </span>
                </Link>
              </div>

              <div className="text-left mt-12">
                <div>
                  <>
                    <div className="mb-20" key={blog.id}>
                      <div>
                        <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2 ">
                          {" "}
                          <a>{blog.title}</a>{" "}
                        </h3>
                        <div className="text-sm mt-0 mb-2 text-gray-500 font-bold uppercase">
                          {blog.updatedAt.toLocaleDateString(undefined, options)}
                        </div>
                        <div className="mt-5 py-10 border-t border-gray-300 text-left ">
                          <div className="flex flex-wrap justify-left ">
                            <p className="mb-4 text-lg text-gray-800">{blog.content}</p>
                          </div>
                        </div>
                        <p className="mb-4 text-lg text-gray-800">
                          More Info:
                          <a
                            className="text-blue-600 hover:text-blue-800"
                            href={blog.qrcode ? blog.qrcode.toString() : "https://github.com/"}
                          >
                            {" "}
                            {blog.qrcode ? blog.qrcode.toString() : "https://github.com/"}
                          </a>
                        </p>
                        <QRCode value={blog.qrcode || "https://github.com/"} />
                      </div>
                    </div>

                    <div className="btn-div p-0 mb-20">
                      <div className="py-6 mt-32 sm:mt-0">
                        <Link href={Routes.EditBlogPage({ blogId: blog.id })}>
                          <button className="btn save print:hidden" type="button">
                            <a>Edit</a>
                          </button>
                        </Link>
                      </div>

                      <div className="py-6 mt-32 sm:mt-0">
                        <button
                          className="btn cancel print:hidden"
                          type="button"
                          onClick={async () => {
                            if (window.confirm("Blog " + `"${blog.title}"` + " will be deleted")) {
                              await deleteBlogMutation({ id: blog.id })
                              router.push(Routes.BlogsPage())
                            }
                          }}
                          style={{ marginLeft: "0.5rem" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  )
}

const ShowBlogPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Blog />
      </Suspense>
    </div>
  )
}

ShowBlogPage.authenticate = true
ShowBlogPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBlogPage
