# 📊 DF Designer Frontend Vacancy - Coding Challenge Solution

This project is a solution to the DF Designer Frontend Vacancy Coding Challenge. It is a React application written in TypeScript. The application is structured to meet the following requirements:

1. Fetch a list of available graphs from `/api/graphs` via a `GET` request.
2. Fetch the selected graph data from `/api/graphs/:id` via a `GET` request.
3. Organize nodes into columns.
4. "Untangle" the connections between the columns of nodes using the **Sugiyama algorithm**.
5. Render the graph into the DOM using minimal inline styling and SVG for edges.

For more details about the original challenge, read through [this file](https://github.com/mablin7/df_designer_frontend_test).

## Getting started

1. Clone this repository 
```
git clone git@github.com:auroraptor/df_designer_frontend_coding_challenge_solution.git
```
2. Navigate to the cloned directory
```
cd df_designer_frontend_coding_challenge_solution
```
3. Run `npm install`.
4. Run `npm start` to run the dev server.

## Project Structure
The application logic is mainly handled in four custom hooks: `useGraphsList`, `useGraph`, `useCreateColumns` and `useMinimizeCrossing`.

- `useGraphsList` fetches the list of available graphs from `/api/graphs`.

- `useGraph` fetches the selected graph data from `/api/graphs/:id`.

- `useCreateColumns` and `useMinimizeCrossing` are responsible for "untangling" the graph. The former organizes the nodes into columns, and the latter rearranges the nodes within the columns to minimize edge crossing, implementing the **Sugiyama algorithm**.

Minimal inline styles are used for a cleaner look, and the graph edges are rendered using SVG.

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTlzcW8xeTdqNzZkZHNneGxicjZlYzQ0eW85OXhtZXVkZXFmc2R5YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G2z3s4hBJHcCcLdNof/giphy.gif" alt="Gif" style="width: 500px; height: 300px;">
</p>

## Checklist of Submitted Features
  - [x] There is a dropdown to select one graph to show from all the available graphs.
   - [x] The selected graph is immediately rendered.
   - [x] The rendered graph is organized into columns.
   - [x] The nodes in columns are ordered such that their edges cross as little as possible.
   - [x] The graph looks visually pleasing.
   - [x] The solution passes the test suite `npm test`.

**Note**
The extra challenge of making the nodes draggable without a library was not implemented in this solution.

### The Sugiyama Algorithm
The Sugiyama algorithm is a method for drawing directed graphs in a layered style with minimal edge crossings, named after Kozo Sugiyama. It works by assigning nodes to different layers or ranks and then rearranges the nodes to reduce edge crossings.

Unfortunately, a detailed resource or blog that exhaustively explains the Sugiyama algorithm for graph visualization with minimal edge crossings is hard to come by. The information seems quite scattered across various sources, including research papers, textbooks, and forum discussions.

However, a good starting point is the Wikipedia page on [Layered Graph Drawing - Sugiyama's method](https://en.wikipedia.org/wiki/Layered_graph_drawing#Sugiyama's_method). Also, the original paper by Sugiyama et al., [Methods for Visual Understanding of Hierarchical Systems](https://ieeexplore.ieee.org/document/4308636), provides valuable insights into the algorithm. 