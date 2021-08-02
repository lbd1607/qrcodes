import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { validateZodSchema, Link } from "blitz"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  cancelText?: string
  /** URL to page for returning to parent on cancel */
  cancelURL?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  onCancel: FinalFormProps<z.infer<S>>["onCancel"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  cancelText,
  cancelURL,
  schema,
  initialValues,
  onSubmit,
  onCancel,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      onCancel={onCancel}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}
          <div className="container mx-auto px-4 flex flex-col min-w-0 break-words bg-white w-full mb-6 flex-wrap justify-left  mt-10 py-10 justify-left">
            <div className="btn-div px-6">
              {submitText && (
                <button className="btn save" type="submit" disabled={submitting}>
                  {submitText}
                </button>
              )}
              {cancelText && cancelURL && (
                <div>
                  <Link href={`${cancelURL}`}>
                    <button className="btn cancel">
                      <a>{cancelText}</a>
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    />
  )
}

export default Form
