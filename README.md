This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### TODOs
- add actions to alter posts and user
- add components to edit posts and users
- refactor again, before it gets more complex

#### Features Considerations
- add realtime chat and video calls (single and group)
- implement MTG card and deck api 

## Prerequisites

 - GutHub Account
 - Cloudinary Account
 - MongoDB / Atlas Account
 - Node >= 18

## Getting Started

First, install dependencies `npm install`

Second, create a `.env` file in the root directory and add the following variables to it:
 - MONGO_URI=mongodb+srv://<username>:<password>@<clustername>.al80sgc.mongodb.net/<collectionname>?retryWrites=true&w=majority&appName=Cluster0
 - AUTH_SECRET=secret-for-encryption
 - AUTH_GITHUB_ID=your-github-oauth-id
 - AUTH_GITHUB_SECRET=your-github-oauth-secret
 - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
 - CLOUDINARY_API_KEY=your-cloudinary-api-key
 - CLOUDINARY_API_SECRET=your-cloudinary-api-secret

Third, run the development server `npm run dev`

Fourth, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
