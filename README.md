# Data Science Club - VIT Bhopal# 



Official website for Data Science Club at VIT Bhopal University. Built with React.js and Tailwind CSS.

- ⚡ React.js 18 with React Router v6

- 🎨 Tailwind CSS for styling

- 🎭 Smooth animations and transitions## FeaturesIt uses the new [`Just-in-Time Mode`](https://tailwindcss.com/docs/just-in-time-mode) for Tailwind CSS.

- 📱 Fully responsive design

- 🎄 Festive theme with particle effects

- 📧 Contact form integration with EmailJS

- 🎯 SEO optimized with React Helmet- ⚡ React.js 18 with React Router v6## Preview



## Prerequisites- 🎨 Tailwind CSS for styling



- Node.js (v14 or higher)- 🎭 Smooth animations and transitionsPreview the example live on [StackBlitz](http://stackblitz.com/):

- npm or yarn package manager

- 📱 Fully responsive design

## Getting Started

- 🎄 Festive theme with particle effects[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

1. **Clone the repository**

   ```bash- 📧 Contact form integration with EmailJS

   git clone https://github.com/yourusername/Website.git

   cd Website- 🎯 SEO optimized with React Helmet## Deploy your own

   ```



2. **Install dependencies**

   ```bash## PrerequisitesDeploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

   npm install

   # or

   yarn install

   ```- Node.js (v14 or higher)[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)



3. **Set up environment variables**- npm or yarn package manager

   

   Copy `.env.example` to `.env` and fill in your EmailJS credentials:## How to use

   ```bash

   cp .env.example .env## Getting Started

   ```

   Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

   Update the following variables in `.env`:

   ```1. **Clone the repository**

   REACT_APP_SERVICE_ID=your_emailjs_service_id

   REACT_APP_TEMPLATE_ID=your_emailjs_template_id   ```bash```bash

   REACT_APP_USER_ID=your_emailjs_user_id

   ```   git clone https://github.com/hnccbits/Website.gitnpx create-next-app --example with-tailwindcss with-tailwindcss-app



4. **Run the development server**   cd Website# or

   ```bash

   npm start   ```yarn create next-app --example with-tailwindcss with-tailwindcss-app

   # or

   yarn start```

   ```

2. **Install dependencies**

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

   ```bashDeploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Build for Production

   npm install

```bash   # or

npm run build   yarn install

# or   ```

yarn build

```3. **Set up environment variables**

   

This creates an optimized production build in the `build` folder.   Copy `.env.example` to `.env` and fill in your EmailJS credentials:

   ```bash

## Project Structure   cp .env.example .env

   ```

```   

src/   Update the following variables in `.env`:

├── assets/          # Images, logos, and static assets   ```

├── components/      # Reusable React components   REACT_APP_SERVICE_ID=your_emailjs_service_id

├── lib/            # Data files and utilities   REACT_APP_TEMPLATE_ID=your_emailjs_template_id

├── pages/          # Page components (routes)   REACT_APP_USER_ID=your_emailjs_user_id

├── styles/         # Global styles and CSS modules   ```

├── App.js          # Main app component with routing

└── index.js        # Application entry point4. **Run the development server**

```   ```bash

   npm start

## Available Scripts   # or

   yarn start

- `npm start` - Runs the app in development mode   ```

- `npm run build` - Builds the app for production

- `npm test` - Runs the test suite   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

- `npm run make-pretty` - Formats code with Prettier

- `npm run style:lint` - Lints code with ESLint## Build for Production

- `npm run style:prettier` - Checks code formatting

```bash

## Tech Stacknpm run build

# or

- **React.js** - JavaScript library for building user interfacesyarn build

- **React Router** - Declarative routing for React```

- **Tailwind CSS** - Utility-first CSS framework

- **React Helmet Async** - Document head manager for ReactThis creates an optimized production build in the `build` folder.

- **EmailJS** - Email service integration

- **React Icons** - Popular icon library## Project Structure

- **React TSParticles** - Particle animation library

- **jQuery** - For specific interactive components```

src/

## Contributing├── assets/          # Images, logos, and static assets

├── components/      # Reusable React components

Contributions are welcome! Please feel free to submit a Pull Request.├── lib/            # Data files and utilities

├── pages/          # Page components (routes)

## License├── styles/         # Global styles and CSS modules

├── App.js          # Main app component with routing

© 2025 Data Science Club, VIT Bhopal. All rights reserved.└── index.js        # Application entry point

```

## Contact

## Available Scripts

- Email: datascienceclub@vitbhopal.ac.in

- Website: VIT Bhopal University- `npm start` - Runs the app in development mode

- Location: Kothrikalan, Sehore, Madhya Pradesh - 466114, India- `npm run build` - Builds the app for production

- `npm test` - Runs the test suite
- `npm run make-pretty` - Formats code with Prettier
- `npm run style:lint` - Lints code with ESLint
- `npm run style:prettier` - Checks code formatting

## Tech Stack

- **React.js** - JavaScript library for building user interfaces
- **React Router** - Declarative routing for React
- **Tailwind CSS** - Utility-first CSS framework
- **React Helmet Async** - Document head manager for React
- **EmailJS** - Email service integration
- **React Icons** - Popular icon library
- **React TSParticles** - Particle animation library
- **jQuery** - For specific interactive components

## Migration from Next.js

This project was migrated from Next.js to React.js. Key changes include:

- Next.js routing → React Router v6
- `next/image` → standard `<img>` tags with lazy loading
- `next/link` → `react-router-dom` Link
- `next/head` → `react-helmet-async`
- Environment variables: `NEXT_PUBLIC_*` → `REACT_APP_*`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

© 2025 Hackathon and Coding Club, BIT Sindri. All rights reserved.

## Contact

- Email: hnccbits@gmail.com
- Website: [https://hnccbits.com](https://hnccbits.com)
- Blog: [https://blog.hnccbits.com](https://blog.hnccbits.com)
