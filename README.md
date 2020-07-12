# Ecoleta

### With Ecoleta is possible to integrate points of garbage collection to general public.

* Through app is possible to search based on location and the type of waste and check all points available

* Through website points of collection can register themselves in map and let public know their location and which kind of garbage they accept
 
![Image of Ecoleta](https://user-images.githubusercontent.com/38081852/84095189-04178580-a9d5-11ea-9496-9ec6f6a282e5.png)

## Preview:

### __Web__:

  ![Web Example](https://user-images.githubusercontent.com/53549655/87235786-43f7d100-c3b6-11ea-8eac-cc6693bbe824.gif)

__Validations response in web side:__

  ![Validation Example](https://user-images.githubusercontent.com/53549655/87236405-aef9d580-c3bf-11ea-9a03-7b646a9f130d.gif)

### __App__:
  ![App Example](https://user-images.githubusercontent.com/53549655/87240240-1dee2300-c3ee-11ea-8f9f-9a4ceb2b59e0.gif)


## To run this project:

* Clone this project in your projects directory:
    
    ```bash
    git clone https://github.com/joao-gabriel-gois/ecoleta.git
    ```
* Move to this directory and install all required dependencies:
    
    ```bash
    cd ecoleta/server && yarn && cd ../web && yarn && cd ../mobile && yarn
    ```

  * In case of yarn is not installed in your environment, you can use **npm** to install dependencies (use `npm isntall` insted of yarn in the above command). However, I strongly recommend you to use yarn. To install it, run:
      
      ```bash
      npm install -g yarn
      ```

#### To run the server

* Run migrations first for SQLite, after move to server directory (in case of using **npm** use `npm run` instead of `yarn` for all commands from now on):
    
    ```bash
    cd ../server yarn knex:seed && yarn knex:migrate
    ```

* Then run the server (only development mode available for now):

    ```bash
    yarn dev
    ```

#### To run the web project

  * Start ReactJS and it will open the browser with project running
    ```bash
    cd ../web && yarn start
    ```

#### To run the mobile project
  
  * Start Expo:
    ```bash
    cd ../mobile && yarn start
    ```

  * It will open a screen with one QR code. Read this QR code with expo installed in your device, and it will load and run the application for you. 
  
    * You need to install expo in your mobile phone.
    
      * For __Android__, install this app: [click here](https://play.google.com/store/apps/details?id=host.exp.exponent)

      * For __iOS__, install this app: [click here](https://apps.apple.com/br/app/expo-client/id982107779)
