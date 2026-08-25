# Vault Guardian

Build a modern AI-powered website support chatbot called VaultOfCourse Support Assistant.

Project Goal

Create a responsive chatbot for the VaultOfCourse website that acts as a first-level support assistant for students and visitors.

The chatbot should help users with:

Courses

Training Programs

Internships

Workshops

Certificates

Offer Letters

Certificate Verification

Course Access

Website Navigation

General FAQs

The chatbot must answer only using the provided knowledge base and website information. It must never hallucinate or invent information.

UI Requirements

Create a professional chatbot interface with:

Floating chat button at bottom-right

Modern chat window

User messages

Bot messages

Typing/loading animation

Suggested quick action buttons

Mobile responsive design

WhatsApp Support button

Smooth animations

Clean professional theme

Suggested Quick Actions

Display these when chat opens:

🎓 Explore Courses

💼 Internship Information

📜 Certificate Verification

📄 Offer Letter

🏆 Training Programs

❓ General Help

💬 Contact Support

Intent Classification System

Classify user messages into:

course_inquiry

training_inquiry

internship_inquiry

workshop_inquiry

certificate_query

certificate_verification

offer_letter_query

enrollment_query

payment_query

website_navigation

technical_support

human_support

general_query

unknown

AI System Prompt

You are the official VaultOfCourse website support assistant.

Your responsibilities:

Answer common student queries

Provide accurate information

Guide users to relevant website pages

Help users navigate the website

Redirect unresolved issues to WhatsApp support

Rules:

Never invent course details

Never invent fees

Never promise refunds

Never claim access to student accounts

Never provide false information

Never claim an issue is resolved

Only answer using available knowledge

If information is unavailable, escalate to support

Smart Routing Logic

If user asks:

"What courses are available?"

→ Show courses page.

"How do I apply for an internship?"

→ Show internship page.

"Where can I verify my certificate?"

→ Show certificate verification page.

"My certificate has the wrong name."

→ Escalate to WhatsApp support.

"I paid but didn't get access."

→ Escalate to WhatsApp support.

"I want to talk to a human."

→ Show WhatsApp support immediately.

Escalation Flow

The chatbot must escalate when users mention:

Payment issues

Refund requests

Certificate corrections

Missing certificates

Missing offer letters

Enrollment issues

Internship disputes

Account-specific problems

Technical problems

Human assistance requests

Escalation Message:

"This issue requires our support team to review your details. Please contact us on WhatsApp and our team will assist you."

Display a large green WhatsApp button.

Conversation Memory

Maintain context throughout the session.

Example:

User: Tell me about the Python course.

Bot: Gives details.

User: What's its duration?

Bot: Understands "its" refers to Python course.

Unknown Questions

If information is unavailable:

"I'm not able to find reliable information about that. Please contact our support team on WhatsApp for assistance."

Never guess.

Knowledge Base Structure

Create sections for:

Courses

Training Programs

Internships

Workshops

Certificates

Offer Letters

Verification

FAQs

Website Pages

Support Process

Website Routing Configuration

Create a configuration object:

{
courses: "/courses",
internships: "/internships",
certificates: "/certificates",
verification: "/verify-certificate",
offerLetters: "/offer-letter",
training: "/training-programs",
support: "/contact",
whatsapp: "https://wa.me/YOUR_NUMBER"
}

Technical Stack

React

TypeScript

Tailwind CSS

OpenAI API integration

Intent classification layer

Context memory

Knowledge base retrieval

Responsive design

Deliverables

Generate:

Complete chatbot UI

Intent classification system

AI prompt architecture

Knowledge base structure

Website page routing system

WhatsApp escalation flow

Sample FAQ dataset

Test queries

Mobile responsive design

Production-ready code

Final objective:

Understand → Answer → Guide → Redirect

If the chatbot knows the answer, answer.

If the answer exists on the website, provide the page link.

If human assistance is needed, redirect to WhatsApp support.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://vault-course-guide.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1689ca97-5b52-4e73-9578-a872b78b4203).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
