---
title: 'Recomposition in Jetpack Compose'
date: '2022-10-26'
category: ''
description: ''
tags:
  - thoughts
  - tools
---

Let's take a look at this composable function:

```kotlin
@Composable
ClickCounter(clicks: Int, onClick: () -> Unit) {    
	Button(onClick = onClick) {       
		Text("I've been clicked $clicks times")    
	}
}
```
