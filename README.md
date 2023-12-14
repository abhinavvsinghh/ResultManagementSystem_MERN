# Result Management App

• Two types of users can login to application by clicking a button on homepage
• Students can enter their roll number and date of birth to view their result
• If roll number and D.O.B. does not match, an error will be shown on screen.
• Teachers can View all records, add new record, edit and delete the records.

## Backend

### Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)

## Frontend

### Technologies Used
- React


### To run this project locally, follow these steps:

1. **To run backend**

i. cd backend
ii. npm i
iii. Open the `.env` file and modify the `PORT` if needed, 
	 otherwise, leave the default values.
iv. Also, I have used Online MongoDB ATLAS. So, no need to change the `DB_CONNECTION`.
iv. npm start

2. **To run frontend**

i. cd frontend
ii. npm i
iii. Open the `.env` file and modify the `REACT_APP_BACKEND_BASE_URL` if you have changed the `PORT` in previous step, 
     otherwise, leave the default values.
iv. npm start

3. **Login Credentials of Teacher**

i. {
		email: admin@gmail.com
		password: admin1234
   }
ii. You can Create New Account also. 

4. **Login Credentials of Student**

i. {
		Roll No : 101
		D.O.B. : 15-10-2000
   }


