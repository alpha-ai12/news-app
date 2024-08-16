# video-editor

## installation

### install global dependencies

Install Android Studio:
https://developer.android.com/studio/
Install Xcode:
https://apps.apple.com/us/app/xcode/
Install xcode tools:

```
sudo xcode-select --install
```

Install expo-cli:

```
yarn global add expo-cli
```

Install react-native dependencies (React Native iOS and Android):
https://reactnative.dev/docs/environment-setup

### install local dependencies

```
cd newsApp
yarn
cd ios && pod install
```

Launch ios:

```
yarn ios
```

Launch android:

```
yarn android
```

Launch web:

```
yarn web
```
