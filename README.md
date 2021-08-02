# **Add QR Codes from User Input**

Learn how to use qrcodes.react to create QR codes from user input in a Blitz.js app. This tutorial assumes that you've already installed Blitz and created a project. For this example, we're using a model named "Blog".

To learn more about Blitz, refer to the [Blitz.js Documentation](https://blitzjs.com/docs/getting-started).

## Installation

Go to your project folder and install `qrcode.react` as a devDependency:

```bash
npm i -D qrcode.react
```

## Add the QR Code Field to the Prisma Model

Before we start using Blitz to create forms, we need to create a Prisma model and generate the model folders.

Go to **db** and open `schema.Prisma`.

For this tutorial, we'll create a simple blog model that contains a `qrcode` string for the user input later. Add the following field to your model:

```prisma
qrcode    String?
```

If you want to make this field required, remove `?` from `String`.

Before continuing, migrate the database:

```bash
 blitz prisma migrate dev --preview-feature
```

## Configure Mutations

Go to **Blogs/Mutations** and add the new **qrcodes** attribute to **updateBlog.ts**:

```ts
qrcode: z.string(),
```

If you want to make the QR code URL a required field, you'll also need to add it to **updateBlog.ts**.

## Add the QR Code Field

Now we can start creating the forms and the main Blogs page. For these, we'll be working in the following files:

- **blogs/components/BlogForm.tsx**: The "Add Blog" form
- **pages/blogs/\[blogId]\.tsx**: The blog page

To run the app, use the command `blitz dev`, then open [localhost:3000](http://localhost:3000).

In **BlogForm.tsx**, add the QR code as a `<LabeledTextField />` with a name of `qrcode`:

```tsx
<LabeledTextField name="qrcode" placeholder="" label="QR Code URL" />
```

When a user enters a URL into this field, it's saved into the database and can also be edited later.

:notebook: **Note:** Follow best practices and sanitize user input before allowing it to be posted to any database.

In **\[blogId]\.tsx**, we'll add the QRCode component so the URL that the user enters is rendered as a QR code.

In the Blog component, enter the following variables before the return statement:

```javascript
var React = require("react")
var QRCode = require("qrcode.react")
```

In the body of the return statement, insert the QRCode component:

```tsx
<QRCode value={blog.qrcode || "https://github.com/"} />
```

Typescript will require either a check to ensure that `blog.qrcode` exists or an alternative. In this example, we've made the GitHub website the alternative URL.

When the page is rendered, the QR code URL is rendered as a QR code:

![App page with QR Code](images/appwithqr.png)

With some modifications to the style using a print breakpoint, users can print the page and distribute it with a working QR code.
