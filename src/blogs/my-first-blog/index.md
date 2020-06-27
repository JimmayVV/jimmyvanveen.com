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

Props in React applications were a revelation when they were introduced. They 

Prop Types are nothing new for React Applications. In fact, they are so ubiquitous, and so popular
they even spun themselves off as a dedicated npm package, for use in external codebases beyond just
React ones. 