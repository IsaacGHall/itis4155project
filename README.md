# itis4155project
E-reader concept for ITIS 4155
Insturtions for installing a chrome extension are found below.
https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/

First Click on the puzzle piece icon in the top right of a chrome browser and click magage extensions from the menu that apears.

Then turn on developer mode with the toggle in the top right corner.

Next from the menu that just apreaded select Load unpacked.

Then select the file ChromeExtensionProject 

For testing -
1. Install Node.js and npm (Node Package Manager) on your machine if they are not already installed. You can download them from the official Node.js website: https://nodejs.org/en/download/
2. Move to the itis4155project/ChromeExtensionProject/test directory.
3. type "npm install --save-dev mocha chai sinon sinon-chai jsdom sinon-chrome chai-as-promised".
4. Our main tests require you to run the following command: "mocha <testfilename>.test.js"
5. Test output will print to the console. Some tests may throw assertion errors but still pass.
