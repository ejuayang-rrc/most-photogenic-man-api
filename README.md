# Most Photogenic Man API

[Elijah Juayang](https://ejuayang-rrc.github.io/)

## Project Overview

This is an API detailing the most photogenic man that has ever existed. You may not know this man, but he’s the most photogenic man that I know. The purpose of creating this API is to create a component of a website that me and some of my friends can contribute to, uploading photos of this man, and maybe creating a potential “cult” around him. This project is just for fun, but to also develop more of my self-learning skills, and to experience and figure out the process of creating self-driven projects.

## Installation Instructions

This project requires Typescript, Node dependencies, and an available Firebase project.

1. Start by cloning the repository into the directory.

    > `git clone https://github.com/ejuayang-rrc/most-photogenic-man-api.git`

2. If you haven't already, install Typescript and Node to run the code.

    > ```console
    > npm init -y
    > npm install typescript ts-node @types/node --save-dev
    > ```

3. You'll have to install the dependencies using Node.js' NPM.

    > ```console
    > npm install dotenv
    > npm install multer
    > npm install express @types/express morgan
    > npm install joi
    > npm install swagger-ui-express swagger-jsdoc
    > npm install -D @redocly/cli
    > npm install 
    > `````

4. An .env file is required to link the Employee and Branch Management System to firestore.
   Contents should look like this:

    > ```dockerfile
    > NODE_ENV=development
    > PORT=3000
    > FIREBASE_PROJECT_ID=bed-demo-g3a74
    > FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSOME_KEY\n-----END PRIVATE KEY-----\n"
    > FIREBASE_CLIENT_EMAIL=firebase-adminsdk-k9r4p@cloud-project-b7c31.iam.gserviceaccount.com
    > SWAGGER_SERVER_URL=http://localhost:3000/api/v1
    > ```

5. Once set up, to run the system you can do `npm run start` which will host the project in localhost on port 3000.

## API Request Examples

Upload Image to API:

```console
curl --location 'http://localhost:3000/api/v1/image/' \
--header 'Authorization: Bearer {{APItoken}}' \
--form 'file=@"../yourComputer/crust.jpg"' \
--form 'title="Man but Crusty"' \
--form 'description="It'\''s the man but really crusty from jpeg compression."' \
--form 'eventId="Unknown"'
```

Edit Event Details:

```console
curl --location --request PUT 'http://localhost:3000/api/v1/event/throwaway_event' \
--header 'Authorization: Bearer {{APItoken}}' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Event Edited",
    "description": "Edited Value"
}'
```

Get Comments by Image ID:

```console
curl --location 'http://localhost:3000/api/v1/comment/wapu5V6vcuoBDgp3GzvM' \
--header 'Authorization: Bearer {{APItoken}}'
```

## Documentation Access

You can access documentation for this API online through this link [Documentation](https://ejuayang-rrc.github.io/most-photogenic-man-api/)
or the local index.html file under the docs directory (`../docs/index.html`).
