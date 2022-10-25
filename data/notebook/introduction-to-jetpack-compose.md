---
title: 'Introduction to Jetpack Compose'
date: '2022-10-25'
category: 'Android'
description: 'A brief introduction to Jetpack compose'
tags:
  - jetpack compose
---

Jetpack Compose is a declarative UI framework for building native Android apps. The framework lets us build out our UI using composable functions. These functions take in data and emit UI elements that are declared within it.

## Create an app

1. Download [Android Studio](https://developer.android.com/studio)
2. Go to File -> New -> New Project
3. Under the "Phone and Tablet" tab, click on "Empty Compose Activity". Then click on "Next"
4. Name your app something
5. Click on Finish

Wait until all the configuration and building are finished and now you're ready to run your app!

### Running your app in an Emulator

1. Go to Tools -> Device Manager 
2. Click on a phone and click on "Next"
3. Click on the recommended System image (usually the first one) and click on "Next"
4. Give your phone a name or use the default name and click on "Finish"
5. Select your newly added device on the dropdown next to the "Run" arrow and click on "Run"

## Composables

Composable are functions that take data and emit the UI elements declared within it.

```kotlin
@Composable  
fun Greeting(name: String) {  
    Text(text = "Hello, $name!")  
}
```

To make a function a composable (which means telling the Compose compiler that this function will take in data and emit UI elements), you add the `@Composable` annotation.

Notice that this function doesn't return anything. Why? Because they don't actually create UI widgets-- they don't render anything. Rather, they describe how we want the screen to look. 

To create different UI components, you nest your composables:

```kotlin
class MainActivity : ComponentActivity() {  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        setContent {  
            ComposePracticeTheme {  
                // A surface container using the 'background' color from the theme  
                Surface(  
                    modifier = Modifier.fillMaxSize(),  
                    color = MaterialTheme.colorScheme.background  
                ) {  
                    Greeting(name = "World")  
                }  
            }        
		}    
	}  
}
```
    
Here, `ComposePracticeTheme`, `Surface`, and `Greeting` are composables that we define in the app

There are a bunch of built-in composables we can use like `Text`, `Button`, `Column` etc, that we can use while we are building our app.




