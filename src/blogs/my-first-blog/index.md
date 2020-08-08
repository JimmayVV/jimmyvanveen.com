---
date: "2020-05-14"
title: "My first blog post"
description: "In React, props are the lifeblood of an application. PropTypes are an industry standard
way to enforce types within those props. What should you do when a given prop is required in order to
use a sibling prop? Well, conditional Prop Types of course! I'll explain how I solved this problem
at work in this blog post."
---

## TL;DR

I might make this a permanent fixture of my blogs. The TL;DR behind this blog is I came up with a solution (against a possibility of thousands) to create conditional Prop Types.

First, I define a utility function that can be imported into any file that needs it:

```js
/**
 * Conditional Prop Types. This function can be used in place of a
 * proper PropTypes validation function, and when implemented as such,
 * it will compare the component for the use of a sibling prop, and
 * if it is not undefined, will apply the given validation function
 * to this Prop.
 *
 * @param {string} conditionalProp The name of the prop we are
 *   basing the condition on.
 * @param {function} propType The validation function to run on this
 *   Prop, given the conditionalProp being in use
 * 
 * @returns {function} The PropType validation method React can invoke
 */
function conditionalProp(conditionalProp, propType) {
  return (
    props,  // All of the props of the scoped Component
    propName,  // The name of the prop this function is attached to
    componentName,  // The name of the component this is attached to
  ) => {
    if (props[conditionalProp] !== undefined) {
      return PropTypes.checkPropTypes(
        { [propName]: propType },
        props,
        'prop',
        componentName
      );
    }
  }
}
```

You may then invoke it in place of a traditional PropType. This will only validate the `resetRunning`
prop if `running` is also defined on this component. If `running` is undefined (which it's allowed
to be!) then the `resetRunning` will not validate itself at all. This is especially useful for
situations where when one prop is used, you'd like to mandate another prop also be used.

```jsx
import PropTypes from "prop-types"
import { conditionalProp } from "utils"

// ... Your Component Definition

YourComponent.propTypes = {
  // If this component is being externally controlled, this prop controls it.
  running: PropTypes.bool,
  // If you'd like to pass a callback function (perhaps) or some other method
  // for a Component that is externally controlled to reset itself
  resetRunning: conditionalProp("running", PropTypes.func.isRequired),
}
```

## React Props

Prop Types are nothing new for React Applications. In fact, they are so ubiquitous, and so popular
they even spun themselves off as a dedicated npm package, for use in external codebases beyond just
React ones.

Most of the time, props are isolated from each other from a requirement standpoint. Usually each prop is
individually required, or optional, or perhaps the props is an object representing a specific configuration.
In my case, however, I came across a use case where I pretty much had two optional props in a component,
but when the first one was used, I then wanted the second one to become mandatory.

Unfortunately for me, there is no mechanism in place to natively make a prop required based on the state
of a different prop. However fortunately for me (and everyone) the PropTypes library allows you to create
custom functions in place of a given `PropTypes.*` type. So I can use that!

> As an aside, there are some great 3rd party open source types that you can use! One of the best looking
> extensions to PropTypes I've found is [from AirBnB](https://github.com/airbnb/prop-types) (seems like
> they contribute to React open source as much as Facebook does!)

There is no tried and true method to handle this scenario with prop types I am aware of, unless I abstracted
these two related props into a simple object whose keys were relationally mandatory, but whose combined
presence was optional. In my case it was simply a prop that allowed external control over a feature,
and a 2nd prop used as a callback to reset it.

As you can see in my "tl;dr" example above, these are basically a `running` boolean, and a `resetRunning`
callback function. As you can guess, when the `running` boolean is defined, the feature is externally
controlled, and resetting the feature is accomplished with the callback.

So anyhow, as you can see above, the magic happens by using this function in place of a `PropTypes` one:

```js
/**
 * Conditional Prop Types. This function can be used in place of a
 * proper PropTypes validation function, and when implemented as such,
 * it will compare the component for the use of a sibling prop, and
 * if it is not undefined, will apply the given validation function
 * to this Prop.
 *
 * @param {string} conditionalProp The name of the prop we are
 *   basing the condition on.
 * @param {function} propType The validation function to run on this
 *   Prop, given the conditionalProp being in use
 * 
 * @returns {function} The PropType validation method React can invoke
 */
function conditionalProp(conditionalProp, propType) {
  return (
    props,  // All of the props of the scoped Component
    propName,  // The name of the prop this function is attached to
    componentName,  // The name of the component this is attached to
  ) => {
    if (props[conditionalProp] !== undefined) {
      return PropTypes.checkPropTypes(
        { [propName]: propType },
        props,
        'prop',
        componentName
      );
    }
  }
}
```

Looking through this code, you'll see that you pretty much only need a name (a string)
of the Prop that drives the condition, and the PropType function you want to use when
this conditional prop is defined. Then you simply check if the conditional prop is defined,
and if so, run the provided PropType function against this props key (which is known as
part of the PropTypes api).

Nothing earth shattering here once you understand the
[PropTypes API](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes), but still
this might be useful for others in the future, so I wanted to share.

Best of luck out there everyone!