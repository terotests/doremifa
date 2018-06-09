# Doremifa

Reactive view library based on tagged template literals. It is special compared to other similar libraries in that it implements it's own XHTML/HTML parser.

The main features are

- Reactive template literals where only changed parts are re-rendered
- Event handler support
- SVG support
- Has reactive global state, which can be used (not mandatory)
- Router baked in (or you can use your own)

A simple TypeScript example

```javascript
import * as Doremifa from 'doremifa'

const html = Doremifa.html;
const setState = Doremifa.setState

Doremifa.setState({
  time:(new Date).toTimeString(),
})
Doremifa.mount(document.body, state => html`<div>Hello World! ${state.time}</div>`)
setInterval( _ => { setState({time:(new Date).toTimeString()})},1000)
```

[Hello World in CodePen](https://codepen.io/tero_koodia/pen/mKRrXd)
[Router Example in CodePen](https://codepen.io/tero_koodia/pen/mKRrXd)

## Usage and Install

```
npm i doremifa
```

And then 

```typescript
import { mount, router, getState, setState, html, drmfComponent, drmfTemplate } from 'doremifa';
// or
import * as Doremifa from './index';
```

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

## Attributes can be set by value without quotes

```javascript
const style='color:blue;'
html`<div style=${style}/>`
```

## Events

Event handlers get two params:
- `e` the HTML event 
- `tpl` the `drmfTemplate` -object which can old ID or list values

```javascript
html`<button click=${(e, tpl) => {
  // tpl holds the template object
}}>Click me!</button>`
```

## References

References are collected from templates to two colletions:

- `ids` holds elements having "id" attribute set
- `list` holds elements having `list="something"` set

The are also available to event handlers.

```javascript
html`<div>
  <input id="name" />
  <div list="divs" />
  <div list="divs" />
  <button click=${(e, tpl) => {
    alert(tpl.ids.name)           // value of input 
    alert(tpl.list.divs.length)   // 2
}}>Click me!</button>
</div>`
```

## Event after template is assigned

Sometimes you want to manipulate DOM after the template has been rendered

```javascript
html`<div></div>`.onReady( tpl => {
  // tpl.ids
  // tpl.list
})
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

# Other Similar libraries

- hyperHTML
- lit-html
- YallaJS

# License

MIT.



