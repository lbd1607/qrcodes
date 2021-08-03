# **Create QR Codes from User Input**

In this guide, you'll learn how to use the `qrcode.react` generator to create QR codes from user input in a Blitz.js app by completing the following steps:

1. Install the QR Code Generator
1. Add the QR Code URL Field to the Prisma Model
1. Configure Mutations
1. Add the User Input to the Form
1. Add the QR Code to the Rendering Page

<br/>

## Requirements

For this tutorial, we assume that you've already installed Blitz and created a project. To learn more about setting up a Blitz project, refer to the [Blitz.js documentation](https://blitzjs.com/docs/getting-started).

<br/>

## Step 1: Install the QR Code Generator

Go to your project folder and install `qrcode.react`:

```
npm install qrcode.react
```

<br/>

## Step 2: Add the QR Code URL Field to the Prisma Model

Before you start using Blitz to create forms, you'll need to add a field for the QR code URL to your Prisma model and migrate the database. For this example, we're using a model named "Blog".

1. Go to the **db** folder and open `schema.Prisma`.

1. Add a field for the QR code URL to your model:

   ```javascript
   qrcode    String?
   ```

   <div style="border-left:4px solid #2ee87f; border-radius:1px; padding: 0.75rem; margin: 1rem 0rem;">
   <b>Note</b>: If you want to make this field required, remove the optional flag <code>?</code> from <code>String</code>.</div>

1. Before continuing to the next step, migrate the database:

   ```
   blitz prisma migrate dev --preview-feature
   ```

<br/>

## Step 3: Configure Mutations

Go to **Blogs/Mutations** and add the new **qrcodes** property to **updateBlog.ts** so users can update the URL when they edit the page:

```tsx
qrcode: z.string(),
```

If you made `qrcode` a required field when you added it to your Prisma model, you'll also need to add `qrcode: z.string()` to **createBlog.ts**.

<br/>

## Step 4: Add the User Input to the Form

Now you can start configuring the form. For this step, you'll be working in the Add Blog form from **blogs/components/BlogForm.tsx**, where you'll add a user input for the QR code URL.

1. To run the app, run the command `blitz dev`, then open [localhost:3000](http://localhost:3000).

1. In **BlogForm.tsx**, add the user input for the QR code URL as a `<LabeledTextField/>` with a name of `qrcode`:

   ```javascript
   <LabeledTextField name="qrcode" label="QR Code URL" />
   ```

When a user enters a URL into this field and saves the form, it's posted to the database.

<div style="border-left:4px solid #ebd534; border-radius:1px; padding: 0.75rem; margin: 1rem 0rem;">
<b>Caution</b>: If you're using <code>dangerouslySetInnerHTML</code> on your <code>LabeledTextField</code> component, you'll need to manually sanitize user input before allowing it to be posted to the database.
</div>

<br/>

## Step 5: Add the QR Code to the Rendering Page

For this step, you'll be working in the Blog page from **pages/blogs/\[blogId]\.tsx**, where you'll add the `<QRCode/>` component so the URL that the user entered in the form is rendered as a QR code.

First, go to the Blog component and create the `React` and `QRCode` variables inside the main component before the return statement:

```javascript
export const Blog = () => {
...

  var React = require("react")
  var QRCode = require("qrcode.react")

  return (
    ...

```

Then insert the `<QRCode/>` component inside the return statement where your HTML is rendered:

```javascript
//Typescript requires that the QR code URL doesn't have the possibility of being null. For this example, the GitHub website is the alternate URL.

<QRCode value={blog.qrcode || "https://github.com/"} />
```

<br/>

When the page is rendered, the URL that the user entered in the form is rendered as a QR code:

<br/>

![App page with QR code](images/appwithqr.png)

<br/>

## More Information

- [Blitz.js documentation](https://blitzjs.com/docs/getting-started) - The full documentation for Blitz, including a brief tutorial.
- [qrcode.react on GitHub](https://github.com/zpao/qrcode.react) - The GitHub project for the `qrcodes.react` QR code generator.
