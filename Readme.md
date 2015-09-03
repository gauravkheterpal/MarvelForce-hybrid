Salesforce Marvel Hybrid 


Instruction for running the project - 

Step 1. checkout project.
Step 2. Open terminal and cd projectDir/SFMarvel
Step 3. Run following command - 

1. cordova build -- To compile project
2. To run - > cordova emulate ios --target="device-name" or run via Xcode inside platforms/ios/SFMarvel.xcodeproj 


Folder structure - 
salesforcemarvel - Source code for development. 
Build.sh - Build script, this script will copy minified version of source into SFMarve/www and then compile it. 
SFMarvel - SalesforceMobileSDK 3.3 Cordova based project 