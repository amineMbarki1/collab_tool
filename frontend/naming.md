Use english always (Syntax in programming language is english as well as documentations, incease cohesiveness by writing english)

pick one naming convention and stick with it.

- camelCase
- PascalCase
- snake_case

## SID

a name must be:

- **short** A name must not take too long to type

- **intuitive** must read naturally, as close to common speech as possible.

- **Descriptive** must reflect what it does or possesses

## Avoid contractions

the contribiute nothing anyways (might decrease readability)

```Javascript
/* Bad */
const onItmClk = () => {}

/* Good */
const onItemClick = () => {}
```

## Avoid context dupliction

```Javascript
class MenuItem {
  /* Method name duplicates the context (which is "MenuItem") */
  handleMenuItemClick = (event) => { ... }

  /* Reads nicely as `MenuItem.handleClick()` */
  handleClick = (event) => { ... }
}
```

# Reflect the expected result

```JSX
// Bad isEnabled doesn't reflect disabled
<Button isDisabled={!isEnabled} />


//Good
const isDisabled = itemCount <= 3;
<Button isDisabled={isDisabled} />

```

# Naming functions

pattern :

prefix? + action(A) + highContext(HC) + lowContext(LC)?

example:

getUserMessages

- get: Action
- User: HC
- Messages: LC

handleClickOutside :

- handle: A
- Click: HC
- Outside: LC

shouldDisplayMessage:

- should : prefix
- display: A
- message: HC

## Actions

### get

Access data immediately:

```Javascript
fucntion getFruitCount(){
    return this.fruits.length;
}

// Or async operations
async function getUser(id) {
  const user = await fetch(`/api/user/${id}`)
  return user
}

```

### set

sets a variable in a declarative way with value A to value b

```Javascript
let fruits = 0

function setFruits(nextFruits) {
  fruits = nextFruits
}

setFruits(5)
console.log(fruits) // 5
```

### reset

```Javascript
const initialFruits = 5
let fruits = initialFruits
setFruits(10)
console.log(fruits) // 10

function resetFruits() {
  fruits = initialFruits
}

resetFruits()
console.log(fruits) // 5

```

### remove

use to remove something from somewhere foe example remove a filter from a list of filters

```JS
function removeFilter(filterName, filters) {
  return filters.filter((name) => name !== filterName)
}

const selectedFilters = ['price', 'availability', 'size']
removeFilter('price', selectedFilters)
```

### delete

Completely remove something from existence

```JS
function deletePost(id) {
  return database.find({ id }).delete()
}

```

when choosing between delete and remove think about relations and entities

for example add a member to a team
remove member from a team

delete Team
Create Team

delete post
create post

### compose

Creates new data from existing ones

```JS
function composePageUrl(pageName, pageId) {
  return pageName.toLowerCase() + '-' + pageId
}
```

### handle

handles an action often naming eventHandlers

```JS
function handleLinkClick() {
  console.log('Clicked a link!')
}

link.addEventListener('click', handleLinkClick)
```

## Context

the domain that the function operates on

```JS
/* A pure function operating with primitives */
function filter(list, predicate) {
  return list.filter(predicate)
}

/* Function operating exactly on posts */
function getRecentPosts(posts) {
  return filter(posts, (post) => post.date === Date.now())
}
```

## Prefixes

Describes a charateristic or state of the current context

```JS
const color = 'blue'
const isBlue = color === 'blue' // characteristic
const isPresent = true // state

if (isBlue && isPresent) {
  console.log('Blue is present!')
}

```

### has

Describes whether the current context possesses a certain value

```JS
/* Bad */
const isProductsExist = productsCount > 0
const areProductsPresent = productsCount > 0

/* Good */
const hasProducts = productsCount > 0

```

### should

reflects a positive conditional statement coupled with an action

```JS
function shouldUpdateUrl(url, expectedUrl) {
return url !== expectedUrl
}

```

### min/max

minimum or maximum values.

### prev/next

Indicate the previous and the next state of a variable. describes trasiition between prev and next

```JS
async function getPosts() {
  const prevPosts = this.state.posts

  const latestPosts = await fetch('...')
  const nextPosts = concat(prevPosts, latestPosts)

  this.setState({ posts: nextPosts })
}
```

## variable names can be singular or plural

```JS
/* Bad */
const friends = 'Bob'
const friend = ['Bob', 'Tony', 'Tanya']

/* Good */
const friend = 'Bob'
const friends = ['Bob', 'Tony', 'Tanya']
```
