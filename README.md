# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/69095b24-4bb5-4223-8ffc-ba1806185943

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/69095b24-4bb5-4223-8ffc-ba1806185943) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Setting up the Contact Form (EmailJS)

The contact form in this project uses EmailJS to send inquiries directly to your email address. To make it work, you need to set up your EmailJS account and configure the project with your credentials.

1.  **Create an Account**: If you don't have one already, sign up for a free account at [EmailJS](https://www.emailjs.com).
2.  **Get Your Credentials**: From your EmailJS dashboard:
    *   Add a new email **Service** (e.g., Gmail, Outlook) and note its **Service ID**.
    *   Create an email **Template** and note its **Template ID**.
    *   Find your **Public Key** (usually under Account > API Keys or similar).
3.  **Configure Email Template**: Ensure the email template you created in EmailJS is set up to accept the following dynamic variables. These are the fields from the contact form:
    *   `name`
    *   `email`
    *   `checkin`
    *   `checkout`
    *   `guests`
    *   `message`
    For example, in your EmailJS template body, you might use `{{name}}` to display the sender's name, `{{message}}` for the message content, etc.
4.  **Update Project Configuration**:
    *   Open the file `src/components/Contact.tsx` in your project.
    *   Locate the following lines of code within the `handleSubmit` function:
        ```javascript
        await emailjs.send(
          'YOUR_SERVICE_ID', 
          'YOUR_TEMPLATE_ID', 
          { /* template parameters */ }, 
          'YOUR_PUBLIC_KEY'
        );
        ```
    *   Replace the placeholder strings `'YOUR_SERVICE_ID'`, `'YOUR_TEMPLATE_ID'`, and `'YOUR_PUBLIC_KEY'` with the actual credentials you obtained from your EmailJS account.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/69095b24-4bb5-4223-8ffc-ba1806185943) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
