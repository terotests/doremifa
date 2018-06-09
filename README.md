# Doremifa

Reactive view library based on tagged template literals. It features:

- no virtual DOM or JSX needed
- reactive template literals 
- fast updates, only changed parts updated
- event handler support
- SVG support
- component and function state is optional
- has built-in optional router and state implementation

A simple example

```javascript
import * as Doremifa from 'doremifa'
Doremifa.setState({
  time:(new Date).toTimeString(),
})
Doremifa.mount(document.body, state => html`<div>Hello World! ${state.time}</div>`)
setInterval( _ => { setState({time:(new Date).toTimeString()})},1000)
```

## Install

```
npm i doremifa
```

Or with browser import `/static/Doremifa.js` or `static/Doremifa-min.js` and example:

[Example in CodePen](https://codepen.io/tero_koodia/pen/RJKogo)

## html -literal

To construct a Template you can write JavaScript template literal

```javascript
  html`<div>${"Hello World"}</div>`
```

## Doremifa.mount

Mount render function to some element

```javascript
Doremifa.mount(document.body, state => html`<div>Hello World!</div>`)
```

## Functions

Any function which returns `drmfTemplate` can be used as a compomnent

```javascript
function message(txt) {
  return html`<div>${txt}</div>`
}
const example = html`<div>${message(txt)}</div>`
```

## Objects

Objects which implement `render()` -function and inherit from `drmfComponent` can be used as part of templates.

```javascript
class Hello extends drmfComponent {
  render() {
    return html`<div>Hello World </div>`
  }
}
const obj = new Hello(); // create and re-use if needed
Doremifa.mount(document.body, state => html`<div>${obj}</div>`)
```

## Custom Tags?

There are no custom tags, just functions or objects.

## State and rendering

The application has a global state which is accessed using

- `getState()`
- `setState({...})`

When state is updated, rendering is triggered and all parts of the application are processed. This should be extremely fast, since templates are cached and only changed parts are updated.

## Promises inside View?

No. Promises are not part of view tree. Just update state and view changes reactively.

## Doremifa.router

Build -in router router uses `window.location.hash` and acceptse links in format

```html
  <a href="#page1/param1/value1/param2/value2">Link to page 1</a>
  <a href="#page2/param1/value1/param2/value2">Link to page 2</a>
```

Then you can define router anywhere in templates like

```javascript
html`<div>  
    ${Doremifa.router({
        page1 : (state) => html`page1`,
        page2 : (state) => html`page2`,
      })
    </div>`
```

The router component gets the `state` having following variables set
```
{
  "page": "page2",
  "params": {
    param1 : value1,
    param2 : value2
  }
}
```

# License

MIT.



