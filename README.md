# Tubeify - YouTube Summarization and Quiz Tool

Tubeify is a web application built using React.js and Django that provides a convenient way to summarize YouTube videos and generate quizzes based on their content. The application utilizes a custom fine-tuned model for video summarization and integrates with the OpenAI API for quiz generation.

## Features

- **Video Summarization:** Tubeify uses a proprietary fine-tuned model to generate concise summaries of YouTube videos, making it easier for users to grasp the main ideas without watching the entire video.

- **Quiz Generation:** The application leverages the OpenAI API to create quizzes related to the content of the summarized videos. This feature enhances user engagement and provides an interactive learning experience.

- **User-Friendly Interface:** Tubeify offers an intuitive and user-friendly interface for a seamless experience. Users can easily input YouTube video URLs, receive summaries, and access generated quizzes.

## Technologies Used

- **React.js:** A JavaScript library for building user interfaces. Tubeify's frontend is developed using React to provide a responsive and dynamic user experience.

- **Django:** A high-level Python web framework that enables rapid development and clean, pragmatic design. Tubeify's backend is built with Django to handle video summarization and quiz generation.

- **Custom Fine-Tuned Model:** Tubeify employs a proprietary machine learning model fine-tuned specifically for video summarization. 
([Model](https://huggingface.co/tusharpuri10/Flan_t5_podcast_summary_assessment))

- **OpenAI API:** The OpenAI API is utilized for generating quizzes based on the content of the summarized videos.

## Getting Started

1. Clone the repository:
``` bash
git clone https://github.com/your-username/tubeify.git
cd tubeify
```


2. Install dependencies for the frontend and backend:
``` bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```
3. Run the development server:
``` bash
# Run frontend development server
cd ../frontend
npm start

# Run backend development server
cd ../backend
python manage.py runserver
```
3. Open your browser and navigate to http://localhost:3000 to access Tubeify.

Usage
* Input a YouTube video URL on the Tubeify homepage.
* Click the "Summarize" button to generate a summary of the video.
* Explore the summary and click on the "Generate Quiz" button to create a quiz based on the video content.
* Answer the quiz questions and enhance your understanding of the video.

Contributing
Contributions are welcome! Please follow the guidelines outlined in CONTRIBUTING.md.

License
This project is licensed under the MIT License.

Acknowledgments
Special thanks to the OpenAI team for providing the powerful API used in Tubeify.