<img src="https://i.imgur.com/lLYfpuU.png">

# About
The Gatsby Forestry template is being developed to allow for the quick bootstrapping of new sites using the best practices of React, Gatsby, SEO and the modern web. As projects introduce new components (blocks) or ideas, those ideas will be added to the core template to provide a library of ready-to-style components.

The goal is to have all page creation happen in the CMS, extracting the complexities of JavaScript, React, Gatsby and Forestry, so that even those with no development experience can create a customized site with little effort. Instead of navigating a complex project folder full of React files written in TypeScript to create or modify a page, you'll simply visit the CMS, go to pages, and add a new page.

## Page Structure
Pages are constructed of rows of columns containing blocks. Every block must be contained within a column, and every column must be contained within a row.

## Blocks
Blocks are unstyled collections of content meant to serve a specific purpose. A block could be an image, a button, or even a blog index with access to hundreds of articles.

# Coding Standards
## Why have coding standards?
- Give a uniform appearance to the code written by different engineers.
- Improves readability and maintainability of the code.
- Helps with code reuse and helps to detect errors easily.
- Promotes sound programming practices and increases efficiency of the programmers.
- All Station8 developers will be able to quickly open a project and get to work instead of struggling to first understand how the project is structured.

## Coding Principles
- We do things the right way. We don't take shortcuts unless they are industry best practices.
- We take our time to ensure the end user of the CMS and the end users of the application have the best experience possible.

## Coding Standards for Gatsby projects
- Use Typescript, even if it is only a basic implementation of it. Typescript ensures the stability of our code to prevent headaches later by linting code more deeply.
- Use [JavaScript Standard Style](https://standardjs.com). This will ensure our code formatting is clean and consistent.
- Use the extension `.tsx` for files containing React code and `.ts` for Typescript/JavaScript files.
- Follow [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming) methodologies. We want our applications to have 100% consistent behavior.
- Only one React component per file. If other components are necessary, create separate files.
- Pages should always be programatically generated using `gatsby-node.js` instead of through the pages folder in the `src` directory. This ensures it is easier for content editors and the client to manage their application through the CMS.
- Styles which are not managed in the CMS should be handled using CSS modules in `.scss` format.
- The **Preparing Your Environment** section includes the software we use for project development. When all developers use the same applications and configuration, troubleshooting is much easier.
- Run lighthouse tests on every project before completion and resolve any resolvable issues.
- Always resolve any problems in the Visual Studio Code **PROBLEMS** tab. If a problem seems unresolvable, pair with other developers.
- Always resolve warnings in the terminal output if it is possible to resolve them. If a problem seems unresolvable, pair with other developers.
- Documentation is important, but its implementation should not come at the cost of missing project deadlines.

# Preparing Your Environment
These instructions are for macOS 10.15 (Catalina). Other operating systems may need special consideration.

## Required Installations
### Command Line Developer Tools
From a terminal, type `xcode-select --install` and follow the prompts.
### Node.js
[Download](https://nodejs.org/en/download/current/) and install the latest version for Mac.
### Yarn
From a terminal, copy and paste this command then close and reopen your terminal window.
```
cd && touch .zshrc && curl -o- -L https://yarnpkg.com/install.sh | zsh
```
### Gatsby CLI
*This step is only required if you are creating a new project*
From a terminal, run this command.
```
yarn global add gatsby-cli
```
### Visual Studio Code
[Download](https://go.microsoft.com/fwlink/?LinkID=534106) and install the latest version for Mac.

## Visual Studio Code Configuration
Visual Studio code has an overwhelmingly large number of options and plugins. While we're free to choose additional plugins to assist us with coding as long (as they do not conflict with the **Coding Standards** above), the following plugins and configuration are required.

### Install the `code` Command
Press `⌘⇧P`, type **path**, and select **Shell Command: Install 'code' command in PATH**, then restart your terminal.
### Install the StandardJS - JavaScript Standard Style Plugin
Click **Install** [here](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs).
### Install the ES7 React/Redux/GraphQL/React-Native snippets Plugin
Click **Install** [here](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets).
### Set the Base Configuration Settings
From a terminal, run this command.
```
code ~/Library/Application\ Support/Code/User/settings.json
```
Somewhere in this file, ensure these properties are set as follows:
```
{
...
  "standard.autoFixOnSave": true,
  "standard.engine": "standardx",
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "editor.wordWrap": "on"
...
}

```
# Working with the Template
## Clone the Project Locally
In order to start working on a project, it will need to be cloned to your computer. All projects will be under the s8webteam GitHub account and you will use your individual work GitHub account to edit the project. You will automatically be added as a collaborator for each project.
 1. Sign in to your individual work GitHub account.
 2. Find the repository in [s8webteam's repositories](https://github.com/s8webteam?tab=repositories).
 3. On the repository page, click the green **Code** button and copy the URL under **Clone with HTTPS**.
 4. In your terminal, navigate to your development folder (a folder of your choosing) and type: `git clone `, then paste the copied URL and press enter.
## Open the Cloned Project
Navigate to the project in your terminal and type `code .`
## Run the Project
Navigate to the project in your terminal and enter the following commands:
```
yarn
yarn develop
```
 - The `yarn` command only needs to be performed once when the project is first cloned.
 - Frequently, the `yarn develop` command must be preceded by variables. This will be communicated to you when the need arises.
## Where to Start
*These are only suggestions, but may help tackle a complex project efficiently.*
1. Read this entire document before beginning.
2. Ensure the development server is running.
3. Configure the **SETTINGS** section and the **Settings > General** properties of the site.
4. Ensure the necessary blocks exist and are configured for your site.
5. Add additional blocks if necessary.
6. Ensure all pages of the site are present in Forestry.
7. Name each row and each column with the type of block/blocks it contains.
8. Add correct blocks to each page.
   - Fill out content with real data if available.
   - Use Lorem Ipsum text if real data is not available.
9. For each block:
  - Style the block completely including responsive testing before moving on to other blocks.
  - Check each instance of the block to determine if style variations are necessary.
  - Alert backend developer of additional block functionality needed as soon as possible.
  - Move on to the next block.
10. Perform complete browser testing once all block styling has been completed.
## Make Changes to the Visual Studio Project
**Note:** Changes saved in Visual Studio Code will automatically be reflected in your browser as long as the gatsby process (`yarn develop`) is running.
### Editing Styles
 1. Find the file you wish to edit. This can be a bit confusing at first, but when you are viewing the development site in your browser, inspect the element you want to edit to identify it's containing file. Each class name begins with the name of the containing file without the extension and with a hyphen instead of a period, the class name in the file, and a random id - each separated by two hyphens.  All styles are scoped to their block type for blocks to make editing easier.
 2. Locate the class name in the file.
 3. Make changes where appropriate.
#### Applying Unique Styles
You may encounter situations where the same block is used multiple times on the site but not all instances share the same style. To address this:
 1. Add universal block styles to the primary class name in the file that matches this block.
 2. For each variation, navigate to the block on the correct page in Forestry, then add the class name in the Custom Class field under **Developer Settings**.
 3. Add the class name to the same style file and add custom styles to the class. This class will automatically import the primary styles for the block so overriding these properties may be necessary.
### JavaScript Edits
 - The majority of the backend programming has been separated into the custom **s8-forestry-tools** NPM package to make maintenance and upgrades project-independent.
 - Changes should only need to be made to the `*.scss` files in `/src/styles/`, but you are welcome to add custom code.
 - There is an example custom block in `/src/templates/page.tsx` to show how custom blocks can work.
 - To modify the behavior of an existing block, you can also copy or import the block code from `/node_modules/s8-forestry-tools/`.
 - Alternatively, discuss with Backend Developer any extra functionality needed.

*See below for a description of the project structure*
### Project Structure
#### /.cache
Generated by Gatsby. Ignore.
#### /.forestry
Generated by Forestry. Do not modify manually.
#### /node_modules
Generated by `yarn` to store required packages. The only useful thing in here is in `/node_modules/s8-forestry-tools/`, where you can view the code for the plugin to see how it works or test changes. You are in no way obligated to do this at this point.
#### /public
Generated by Gatsby. Ignore.
#### /src
Where all site code and styles are stored.
##### /src/components
Code for the header, footer, and layout of every page.
##### /src/styles
**All styles are stored here.** Feel free to delete any files for components you are not using on the site.
##### /src/templates
Code for generating pages and articles from templates.
#### /static
Files that will be accessible at baseurl.com/[filename]. We probably won't use this for anything but the remote Forestry admin files.
#### /.gitignore
Stores the files and directories git should not index. This has already been configured and shouldn't need to be modified.
#### /gatsby-browser.js
Code that runs in the browser separately from Gatsby. The Backend Developer will configure this initially, but feel free to make changes.
#### /gatsby-config.js
Configuration for the site metadata and Gatsby plugins. You may need to use this if you are adding additional Gatsby plugins.
#### /gatsby-node.js
This tells Gatsby what pages to set up. Modification is dangerous.
#### /package.json
Lists project configuration and NPM packages. Do not modify the dependencies or devDependencies directly as this file is partially generated by Yarn. 
#### /README.md
You're reading this right now. Contributions are welcome, but please do so [here](https://github.com/matt-hunter/gatsby-forestry-template/edit/main/README.md)!
#### /yarn.lock
Yarn automatically generates this file. Do not modify manually.
## Make Changes to Forestry Content
 - If a client will not be managing their own content, or if they have not yet created a [Forestry](https://forestry.io) account, you will log in to Forestry using the webteam@station8branding.com GitHub account.
 - If we have developer credentials for Forestry from the client, you will use those instead.

 1. Log in to Forestry.
 2. Select the appropriate site from the [Dashboard](https://app.forestry.io/dashboard/#/).
 3. Make and save changes.
 4. Wait for the ring next to the Forestry or company logo to turn green.
 5. Return to Visual Studio Code and perform a git pull (click the circular arrows in the status bar).
 
*See below for a description of the various parts of the Forestry interface.*
### CONTENT
The main source of content published to the site.
#### Pages
This is where you'll manage the site pages including the 404 page and blog index. From here, you can create, edit, delete or disable any of the rows, columns or blocks of each page.

**Note:** Please do not modify or link to the page named "Demo". This is a special page that ensures page queries function correctly.
#### Articles
Blog articles are stored here. Each article has numerous options to customize its appearance.
#### Authors
Manage blog article authors here.

### SETTINGS
All site-wide configuration options are here.
#### Site Info
These settings are mainly used for SEO and should be personalized for each site. Contains the site title, description, author, and titlebar divider.
#### Contact Info
Some sites use the contact information here as a source of data for anything contact-related.
#### Header
Manage the appearance and contents of the header for all pages and posts.
#### Footer
Manage the appearance and contents of the footer for all pages and posts.
#### Colors
Site colors should be defined in Forestry and accessed using CSS variables. Global CSS variables can be viewed in the browser console logs.
#### Fonts
Site fonts should be defined in Forestry and accessed using CSS variables. Global CSS variables can be viewed in the browser console logs. Font imports still need to be done manually and should happen at the top of `/src/styles/global.scss`.

### SITE
#### Media
This is like the Wordpress Media Library. You may use this to see if a file is already uploaded or to delete unused assets.
#### Front matter
A developer-only section invisible to content editors. This is where all block configuration is managed. Making changes here may also require updating the site code and the `s8-forestry-tools` package, so please pair with backend developer before modification of anything other than field labels and field descriptions. Most likely, you will not need to access this.
#### Settings
Contains all the settings for configuring the CMS. There are dangerous settings here, so please work with backend developer about changing anything other than the Logo, Site Name, URL and Timezone in the **General** tab.
## Preview Changes
As long as the development server is running, you should automatically see your changes in the browser. If you do not, try the steps below in order and stop after you see your changes.
 1. Refresh your browser window
 2. Terminate the Gatsby process in your terminal by pressing `control + c` twice, then run `yarn develop` again.
 3. Try the previous step again, but before re-running `yarn develop`, run `yarn clean`.
 4. Terminate the Gatsby process, run `rm -rf node_modules`, then `yarn`, then `yarn develop`.
## Commit Changes to a Project
*There are multiple ways to do this, here's what I do. Feel free to use your own process*
 1. Click the **Source Control** button in Visual Studio Code. It looks like three circles connected by two lines.
 2. For each file under **CHANGES**,
    1. Click the filename to review your changes next to the original file to ensure no unintended changes have been made.
    2. Click the **+** symbol to stage the change or the undo arrow to revert your changes.
 3. Add a meaningful but brief commit message above **STAGED CHANGES**.
 4. Click the *checkmark* icon to finalize your commit.
 5. Push your changes by clicking the circular arrows in the status bar.
## Update s8-forestry-tools
In order to make the template work for future projects as new blocks are added, much of the site logic has been moved to a custom NPM package. As features are added to `s8-forestry-tools`, you will need to update this package.
 1. Terminate the Gatsby process in your terminal by pressing `control + c` twice.
 2. Run `yarn add s8-forestry-tools`. This will replace the currently installed package with this new version.
 3. Run `yarn develop` again.
# To-do
- Creating a new project from template section
- Package.json configuration section
- Adding functionality tutorial section
- Managing s8-forestry-tools
- Creating a block tutorial
- SEO considerations section
- Testing section
- External Tutorials section
- CSS best practices section
- Base styles in s8-forestry-tools
- Block explanations with screenshots section
- CMS-managed Styles?
- CSS framework implementation?
