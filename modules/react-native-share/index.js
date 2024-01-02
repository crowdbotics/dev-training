import React, { useState } from "react"
import { View, Pressable, Text, StyleSheet } from "react-native"
import Share from "react-native-share"

function ShareMessage() {
  const [result, setResult] = useState("")

  function getErrorString(error, defaultValue) {
    let e = defaultValue || "Something went wrong. Please try again"
    if (typeof error === "string") {
      e = error
    } else if (error && error.message) {
      e = error.message
    } else if (error && error.props) {
      e = error.props
    }
    return e
  }

  /**
   * Basic share with url & message
   */
  const shareUrlWithMessage = async () => {
    const shareOptions = {
      title: "Share file",
      message: "Simple share with message",
      url: "https://google.com"
    }

    try {
      const ShareResponse = await Share.open(shareOptions)
      console.log(ShareResponse)
      setResult(JSON.stringify(ShareResponse, null, 2))
    } catch (error) {
      console.log(error)
      setResult(getErrorString(error))
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={shareUrlWithMessage}>
        <Text style={styles.text}>Share Message</Text>
      </Pressable>
      <Text style={styles.text}>{result}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  text: {
    fontSize: 20,
    color: "blue"
  }
})

export default {
  title: "share",
  navigator: ShareMessage,
  hook: console.log("share module loaded")
}
