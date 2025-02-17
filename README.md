### Description

this is a simple property listing app in React + TS. to run the follow the given steps:

```
clone https://github.com/kp-dhvani/qantas-demo.git
cd qantas-demo

1. Clone the repository
git clone <repository-url>
cd <repository-name>

2. Install dependencies
npm install   # using npm
# OR
yarn         # using yarn

3. Start development server
npm dev    # using npm
# OR
yarn dev   # using yarn

4. Run tests
npm test     # using npm
# OR
yarn test    # using yarn

5. Build for production
npm run build    # using npm
# OR
yarn build      # using yarn

# Linting
npm run lint    # using npm
# OR
yarn lint      # using yarn
```

additionally this demo has been deployed to Cloudflare Pages and you can access the demo here
`https://qantas-demo.pages.dev/`

### Comments

1. removed lazy loading from images at the last minute as the images won't load by default unless the page was scrolled
2. some things have been hardcoded like the city which might have come from the data?
3. nothing fancy for loading and error state messages just simple p tags
4. coupled the logic for showing price and savings in one component `Price` since they share the same data structure. maybe a different naming can be used for the component
5. `Preview` component shows the image and the promotion name, this was one of the first components i wrote so their logic is coupled in one component
6. `PropertyCard` shows all other details of the property listing
7. possible confusing name in Property/Listing nomenclature in the codebase. my logic is `App` is a listing of properties
8. a lot of tests are doing simple UI testing than logic
