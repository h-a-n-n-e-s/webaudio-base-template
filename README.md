# WebAudio Base Template

A basic WebAudio example using TypeScript also for the `AudioWorkletProcessor` code. Using [Vite](https://vitejs.dev/), this setup is convenient for dev mode as well as building. It is done using Vite env variables and build options, for details see `sound.ts` lines 14-16 and `vite.config.ts`. If you know a simpler way to do it, please let me know :)


---

## How to set up a development environment

- Install [Node](https://nodejs.dev/en/download/).

- Install [pnpm](https://pnpm.io/). To do that for Node.js version >= 16.13 just run  
`corepack enable`  

- Clone the repository.

- To install all the dependencies run  
`pnpm up`  
in the project's working directory.

- To start a local server for developing run  
`pnpm dev`

- To build run  
`pnpm build`  

- To preview the build from a local server run  
`pnpm preview`

Note: This project was set up to use [Vite](https://vitejs.dev/) The above `dev`, `build` and `preview` commands will automatically invoke Vite.


This project is licensed under the terms of the MIT license.