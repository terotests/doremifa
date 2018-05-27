# doremifa

Reactive view library based on tagged template literals. It features:

- no virtual DOM or JSX needed
- reactive template literals to elements from HTML strings
- state manager, which initiates rendering if state has changed
- cached template literals to maintain UI state (with garbage collection)
- `forElem` convenience method for quick and dirty DOM manipulation

The renderin process re-uses the templates, so if you have TEXTAREA or INPUT elements they
behave properly even if the data is inserted to the template.

Simple example with simple state
```javascript

import { start, router, getState, setState, element, forElem, html } from 'doremifa';

start(document.body, async (state) => {
  return forElem( 
    element`
    <div>
        <button id="inc">+1</button>
        <button id="dec">-1</button>
        <div>${state.cnt}</div>   
    </div>
  `, o => {
    o.inc.onclick = () => setState({cnt : state.cnt + 1 })
    o.dec.onclick = () => setState({cnt : state.cnt - 1 })
  })
}, {
  cnt : 0 
})

```

## start( root:Element, renderFn : (state:any) => Promise<Element>, state? :any, options?:DoremifaOptions) 

Starts the rendering of application with 
- `root` element to insert the renderers result
- `renderFn` function returning the element to render
- `state` initial state of the app
- `options`

Currently only option is:
- `updateInterval` render loop delay in milliseconds (default 100)

```javascript
start(document.body, async (state) => {
  return element`<div>...</div>`
}, {}, {})
```

## getState

Returns the application state `{}`. 

State can have any keys except for routing state has three defined keys

- `state.page` which indicates the active page from `location.hash` like `#page`
- `state.params` from the hash like `#page/id/1238`
- `state.phase` the pages lifecycle, `init`, `refresh` or `close`


## setState

Sets the application state for keys given, for example if state is
```javascript
{
  name : "foobar",
  cnt : 3
}
```
Calling `setState({cnt:4})` will set only the `cnt` part of the state to new value.

## creating rendered elements

- `element` for complex layouts
- `html` for short HTML snippets

For example
```javascript
element`<ul>${[1,2,3,4].map( item => html`<li>${item}</li>`)}</ul>`
```

## forEach(element, items:(o) => void) - binding and accessing DOM

After element is created there is convenience method `forEach` to quickly access certain
elements inside the rendered DOM

- `list="items"` collects elements to Array `o.items`
- `id="key"` collects elements to `o.key`

```javascript
forElems(element`
    <ul id="main">
      ${[1,2,3,4].map( item => html`<li list="items">${item}</li>`)}
    </ul>`,
  o => {
    o.main // do something with the <ul> element
    o.items.forEach( el => {
      el.onclick = () => {
        // bind handler
      }
    })
  })
```

## Routing

Routing is derived from the `window.location.hash` and follow format `#list/len/4` where

- `list` results as `state.page == "list"` 
- `len/4` results as `state.params.len == 4`

Additionally the routing function is given `state.phase` which has values
```javascript 
  state.phase == "init"` // when the page is called the first time
  state.phase == "refresh"` // during refresh calls
  state.phase == "close"` // when the element is closed
```

You can create your own router or use the default router like

```javascript
${await router({
  "page1" : (state) => element`<div>page1</div>`,
  "page2" : (state) => element`<div>page2</div>`,
})
```

Example with router.

```javascript
  start(document.body, async (state) => {
    return 
      element`<div>
      <div>
        <a href="#hello">hello</a>
        <a href="#list">list all</a>
        <a href="#list/len/4">list, first 4</a>
      </div>
      ${await router({
        "hello" : _ => element`<div>This is hello from hello route</div>`,
        "list" : _ => {
          const values = _.params.len ? _.list.slice(0, _.params.len | 0) : _.list
          return element`<div>
            <ul>${values.map( _ => html`<li><a href="#hello">${_}</a></li>`)}</ul>
          </div>
          `
        }
      })} 
  </div>
    `
  }, {
    list :[1,2,3,4,5,6,7,8,9,10] 
  })
```

# License

MIT.



