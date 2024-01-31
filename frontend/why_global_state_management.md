1. State Centralization
Allows us to centralize the applications state in a single location, making it easier to manage and understande.
2. Componet decoupling
Global state allows components to access shared state without needing to pass it explicitly through each level.
3. Avoid prop drilling 
passing props to deeply nested components

4. Improved Code organization
Centralizing state allows for easier debugging 

5. Improved performance
Global state management offer performence optimazations 

## Core concepts
the global state represents the data of our application (The data that is rendered as ui)
to change something in state we dispatch actions (a plain javascript object) that describes what happened.

```JS
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```

Enforcing that every change is described as an action lets us have a clear understanding of what's going on in the app. if something changed, we know why and how.redux sets rules to ensure that state can only be updated in a predictable way.


to tie state to actions we have reducers.

it's just a fucntion that takes the state and action as arguments and returns a new state.

# Redux tools
Redux core is a small standalone JS library.

* React-Redux
Enable react components to iteract with a redux store by reading the state or dispatching actions tp update the store.

* Redux Toolkit
Recommended bu redux team has their best practices and simplified redux tasks, prevent mistakes.

* Redux DevTools Extension
shows a history of the changes to the state in the redux store. "time-travel debugging"

#Concepts
## State management
a self contained components is made up of :
* The state, the source of truth that drives our app;
* The view, a declarative description of the UI based on the current state
* The actions, the events that occur in the app based on user input, and trigger updates in the state.

* State describes the condition of the app at a specific point in time
* The UI is rendered based on that state
* When something happens (such as a user clicking a button), the state is updated based on what occurred
The UI re-renders based on the new state

Components can get very complicated/messy when they need to use the same state.
can be solved by lifting state up to parent components and passing it as props but that doesn't always work well.
one solution is to extract the state into one centralized space and all our components no matter where they are in the components tree they can read and trigger actions.

## Immutability
"Mutuable" means "changeable". if something is "immutable" it can never change.

to update values immutably, we have to make a copy of the value and then modify the copies
 

Redux expects that all state updates are done immutably.

# Terminology

## Actions
plain Js object that has a **type** field. We can think of an action as event that describes that something has happend in our application.

An action have additional information about what happened in the it's **payload** field.

```JS
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```
## An action creater
A function that returns an action.We use these so we don't have to write an action object each time.

## Reducers
a function that receives the state and the action and then will decide how to update the state based on the action.

Reduces must obey specific rules:

* They should only calculate the new state value based on the state and action arguments
* They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the existing state and making changes to the copied values.
* They must not do any asynchronous logic, calculate random values, or cause other "side effects"

Logic insde reducer:

* Check if it cares about the action
 * if so, make copy, update copy return new copy
* Return the state as it is

## Store

Application state Lives inside an object called a store

Created by passing in a reducer, and has a method called getState that returns the current state

## Dispatch
The Redux store has a method called dispatch. the only way to update the store is to call store.dispatch() and pass in an action object.
the store will run the reducer function and save the new state inside.

Action creaters are convenient way to dispatch the right action
```JS
const increment = () => {
  return {
    type: 'counter/increment'
  }
}

store.dispatch(increment())

console.log(store.getState())

```

## Selectors
Selectors are functions that know how to extract specific peices of information from a store.

```JS
const selectCounterState = state => state.value;
const count = selecterCounterState(store.getState());

```

# Redux Application Data flow
### initial setup
1. Redux store in created using root reducer function

2. The store calls root reducer once, and saves the return value as it's initail state

3. When the Ui is first rendered, UI componnets access the current state of the redux store , and use that data to decide what to render 
they also subscribe to any future updates.
### updates
1. Something happens in the app, such as a user clicking a button
2. The app code dispatches an action to the Redux store, like dispatch({type: 'counter/increment'})
3. The store runs the reducer function again with the previous state and the current action, and saves the return value as the new state
4. The store notifies all parts of the UI that are subscribed that the store has been updated
5. Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
6. Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen