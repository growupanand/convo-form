
# Smart form wizard

Modern form builder powered by AI

## Features

- **User-Friendly Interface:** The interface is designed to be user-friendly, ensuring a seamless and efficient form-building experience.

- **Intelligent Field Input:** Creating form fields is made easy; users can provide the necessary information without worrying about specifying exact field names.

- **Dynamic Form Rendering:** The form view page dynamically displays questions based on the provided form summary, eliminating the need for users to predefine every field.
  
- **Customizable Welcome Screen:** Users have the flexibility to personalize the welcome screen that greets users before they start filling out the form, enhancing the user experience.



## Roadmap

- [x] Implement [Basic saas](https://github.com/growupanand/smart-form-wizard/milestone/1)
- [x] Implement Smart Form Builder
- [x] Implement Smart Form View Page
- [ ] Save user filled data and transcript




## Local Setup

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.17.1 or higher)
- [npm](https://www.npmjs.com/) (v9.6.4 or higher)
- [Git](https://git-scm.com/)

### Clone the Repository



```bash
git clone https://github.com/growupanand/smart-form-wizard.git
cd your-project
```


### Install Dependencies

```bash
npm install
```

### Configuration

 1. Copy the .env.example file to create a new .env file.
	```bash
	cp .env.example .env.local
	```
2. Open the `.env` file and update the necessary environment variables.

### Run the Development Server

```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000/) in your browser to see the application.

### Build for Production

```bash
npm run build
```

### Vercel Build
To build the project for Vercel deployment, run:
```bash
npm run vercel-build
```

## Screenshots

Here are some screenshots from the app

![image](https://github.com/growupanand/smart-form-wizard/assets/29487686/fbe807e7-857f-4b7c-9584-872d13afc08c)

![image](https://github.com/growupanand/smart-form-wizard/assets/29487686/439eb1c4-b02f-485b-95fa-c33200941d1a)

![image](https://github.com/growupanand/smart-form-wizard/assets/29487686/9b566ba2-fe0b-4638-8b78-5b40e03dd808)


![image](https://github.com/growupanand/smart-form-wizard/assets/29487686/02774d33-bac6-4cbd-a88f-542f8ffdda8b)





## Contributing
Feel free to contribute to the development by opening issues, providing feedback, or submitting pull requests. Your input is valuable in making Smart Form Wizard even smarter!
