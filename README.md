This is a fork from the [angular 2 webpack starter] seed project (https://github.com/angularclass/angular2-webpack-starter) , which serves as an excellent place to kick start your project on angular2.


This sample app implements the following
1) Headless Content Delivery Frontend App – angular2 component creation for rendering, Security , Drupal API CRUD integration ,  OMDB API integration, infrastructure to support multiple CMSs added, Web Notifications. This has been tested against Drupal 8.

2) Solr Search integration 

3) UI using Bootstrap 3.x , Bootstrap material, angular material2 

4) OMDB API integration

5) Firebase real time event database integration (Need to provide your own API keys)

6) Firebase OAuth integration

7) Security guards for blog post creation (available once logged in)

8) Re-usable components created for like, typeahead, pagination, content, search, validation(async) and modals etc

9) Cloud Foundry deployment script

10) Custom validations for forms

11) Works in stub mode (default) with JSON files for CMS APIs and configurable via the app settings to switch to Drupal mode (requires proper configuration options specified)

### Quick start
**Make sure you have Node version >= 5.0 and NPM >= 3**
> Clone/Download the repo then edit `app.ts` inside [`/src/app/app.ts`](/src/app/app.ts)

```bash
# clone the repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/tsukhu/ng2-headless-cms-plus-app.git

# change directory to our repo
cd ng2-headless-cms-plus-app

# update (optional) api keys for firebase and then enable it.

cd src/app.config.ts

# fbAppEnabled: false, <-- Change to true
#    fbAppConfig: { <-- update with your own firebase keys
#        apiKey: 'Add Firebase key',
#        authDomain: 'Add Firebase Doman',
#        databaseURL: 'Firebase URL',
#        storageBucket: 'Firebase storage bucket',
#    }


# install the repo with npm
npm install

# start the server
npm start

# use Hot Module Replacement
npm run server:dev:hmr

# if you're in China use cnpm
# https://github.com/cnpm/cnpm
```
go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

# Project layout and further instructions
 Refer to the base seed project of angular 2 webpack starter for more details
# License
 [MIT](/LICENSE)
