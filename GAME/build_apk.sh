#!/bin/bash
echo "📦 شروع ساخت APK..."
pkg install nodejs git openjdk-17 -y
npm install
npm install @capacitor/core @capacitor/cli @capacitor/android
echo '{"appId":"com.noor.quran","appName":"Noor Quran","webDir":"dist"}' > capacitor.config.json
npm run build
npx cap add android
npx cap copy
npx cap sync
cd android && ./gradlew assembleDebug
echo "✅ APK ساخته شد!"
find . -name "*.apk" -type f
