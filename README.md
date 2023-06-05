# object-pool-game


# Object Pool Game
This is a TypeScript project that demonstrates the use of object pool design pattern in game development. The project uses a class called GameObjectPool to manage a pool of reusable game objects, such as bullets or enemies. The class has methods to get an object from the pool, clear its state, and return it to the pool. This way, the project avoids creating and destroying game objects every time, which can improve performance and memory efficiency.

# How to run
To run this project, you need to have Node.js  installed on your machine. You also need to install the dependencies using the following command:

#Install dependencies
```
yarn install
```
#To start local server
```
yarn dev
```

## How to use
The game is a simple shooter where you control mouse and try to shoot down the incoming astroids. The game will spawn new astroids from the object pool as needed. When an astroids destroyed or goes out of bounds, it will be returned to the pool for future use.

## How it works
The main logic of the game is in the src/main.ts file. This file imports the Game class from src/Game.ts and creates a instances of it. The GameObject class has properties for position, rotation, scale, and velocity, as well as methods for updating and rendering.

The game loop consists of three steps: update, render, and requestAnimationFrame. In the update step, the game updates the state of all active game objects and checks for collisions and boundary conditions. In the render step, the game clears the canvas and draws all active game objects using their render methods. In the requestAnimationFrame step, the game requests the next animation frame and calls the game loop again.
