import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function BlogForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 ">
          <div className="px-6">
            <div className="flex flex-wrap justify-left">
              <div className="w-full lg:w-4/12 lg:text-left lg:self-left">
                <div className="py-6 mt-32 sm:mt-0"></div>
              </div>
            </div>

            <div className="text-left mt-12">
              <LabeledTextField
                className="text-xl font-semibold leading-normal text-gray-800 mb-2 rounded-md border border-gray-400 px-3 py-3 bg-white  w-full focus-within:ring-2 ring-purple-300"
                name="title"
                placeholder=""
                label="Title"
              />
            </div>
            <div className="mt-10 py-10 text-left">
              <div className="flex flex-wrap justify-left">
                <div className="w-full ">
                  {/* <label>Post</label> */}
                  <LabeledTextField
                    className="text-lg text-gray-800 mb-2 rounded-md border border-gray-400 px-3 py-3 bg-white w-full break-all h-auto resize focus-within:ring-2 ring-purple-300 "
                    name="content"
                    placeholder=""
                    label="Post"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 py-10 text-left">
              <div className="flex flex-wrap justify-left">
                <div className="w-full ">
                  <LabeledTextField
                    className="text-lg text-gray-800 mb-2 rounded-md border border-gray-400 px-3 py-3 bg-white w-full focus-within:ring-2 ring-purple-300"
                    name="qrcode"
                    placeholder=""
                    label="QR Code URL"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}
