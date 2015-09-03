#!/bin/bash

function printHelp() {
	echo "Valid options are:"
	echo "    -src source/folder/relative/path"
	echo "    -type testing|production"
    echo "    -debug \"device-code\""
    echo "    -nobackup"
	exit 1
}

source="./salesforcemarvel"
type="production"
device=""
noBackup = "0"

for ((i=1; i <= "$#" ; i+=2))
do  
  let j=$i+1
  case "${!i}" in
  	'-src')
		source="./${!j}"
		;;
	'-type')
		type="${!j}"
		if [[ "$type" != "testing" && "$type" != "production" ]]; then
			echo "invalid type "$type
			printHelp
		fi
		;;
	'-debug')
		device="${!j}"
		;;
    '-nobackup')
		noBackup="1"
		;;
	*)
		echo "invalid option "${!i}""
		printHelp
  esac
done

dstn="./SFMarvel"
destwww=$dstn"/www"
backupDir="./backup"
sourceFolder="./salesforcemarvel/build/"$type"/salesforcemarvel" 
current_time=$(date "+%Y.%m.%d-%H.%M.%S")
backupwww=$backupDir"/www".$current_time
srcbootconfig=$source"/bootconfig.json"
destbootconfig=$destwww"/bootconfig.json"
srcerrorhtml=$source"/error.html"
desterrorhtml=$destwww"/error.html"

cd $source

echo "sencha "$type" build started..."
sencha app build -c $type

if [ "$?" != "0" ]; then
	echo "Error creating sencha build"
	cd ..
	exit 1
fi

cd ..

if [ ! -d $backupDir ]
	then
	echo "creating "$backupDir
	/bin/mkdir -p $backupDir >/dev/null 2>&1
fi


if [ "$noBackup" != "1" ]; then
    

    echo "creating zip "$backupwww".zip for as "$destwww
    zip -r $backupwww".zip" $destwww
    
    echo "remove "$destwww
    rm -r $destwww"/" 
    

    if [ "$?" != "0" ]; then
        echo "Error creating backup"
        exit 1
    fi
else
    echo "no backup created"
fi

echo "copy "$sourceFolder" folder to "$destwww
cp -R $sourceFolder $destwww

echo "copy "$srcbootconfig" file to "$destbootconfig
cp $srcbootconfig $destbootconfig
echo "copy "$srcerrorhtml" file to "$desterrorhtml
cp $srcerrorhtml $desterrorhtml

if [ "$?" != "0" ]; then
	echo "Error copying build"
	exit 1
fi


 echo "remove  ./salesforcemarvel/build"
    rm -r "./salesforcemarvel/build/" 

cd $dstn 

echo "cordova build started..."
cordova build ios
if [ "$?" != "0" ]; then
	echo "Error creating cordova build"
fi


if [ "$device" != "" ]; then
	cordova emulate ios --target="$device"
fi

cd ..

echo "cordova build ends..."
